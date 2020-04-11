import database from "@/database";
import rules from "@/api/rules";
import means from "@/data/means";
import clues from "@/data/clues";
import analysis from "@/data/analysis";

import router from "@/router";

export default {
  createGame: async context => {
    const gameList = database.ref("/");
    const game = await gameList.push();
    const gamekey = game.getKey();
    const gameData = {
      gameId: rules.createRandomId(),
      players: {},
      detective: 0,
      gamekey,
      availableClues: 6,
      round: 1
    };
    await game.set(gameData);
    context.commit("setGame", gameData);
    return {
      gameId: gameData.gameId,
      gamekey
    };
  },

  loadGame: async (context, payload) => {
    const loadedGame = database
      .ref("/")
      .orderByChild("gameId")
      .equalTo(payload);
    await loadedGame.on("child_added", snapshot => {
      context.commit("setGame", snapshot.val());
    });
    loadedGame.on("child_changed", snapshot => {
      context.commit("setGame", snapshot.val());
    });
  },

  async startGame(context, payload) {
    const gameMeans = rules.getRandom(means, payload.players.length * 4);
    const gameClues = rules.getRandom(clues, payload.players.length * 4);
    const analysisCause = analysis.filter(item => item.type === 0);
    const analysisLocation = rules.getRandom(
      analysis.filter(item => item.type === 1),
      1
    );
    const analysisOther = rules.getRandom(
      analysis.filter(item => item.type === 2),
      6
    );
    await database.ref("/" + payload.game).update({
      started: true,
      means: gameMeans,
      clues: gameClues,
      analysis: [...analysisCause, ...analysisLocation, ...analysisOther],
      murderer: rules.chooseRandomMurderer(payload.players, payload.detective)
    });
  },

  async setDetective(context, payload) {
    await database.ref("/" + payload.game).update({
      detective: payload.player
    });
  },

  async setAnalysis(context, payload) {
    await database.ref("/" + payload.game).update({
      forensicAnalysis: payload.analysis
    });
  },

  async setMurdererChoice(context, payload) {
    await database.ref("/" + payload.game).update({
      murdererChoice: payload.choice
    });
  },

  async passTurn(context, payload) {
    const game = context.state.game;
    const players = Object.keys(game.players).length;
    const validGuesses =
      (game.guesses && game.guesses.filter(item => item.key)) || [];
    const turnsArray = game.passedTurns || new Array(players).fill(false);

    if (
      turnsArray.filter(item => item === true).length + validGuesses.length <
      players - 2
    ) {
      turnsArray[payload.player.index] = true;
      await database.ref(`/${payload.game}`).update({
        passedTurns: turnsArray
      });
    } else {
      if (game.round <= 3) {
        await database.ref(`/${payload.game}`).update({
          passedTurns: new Array(players).fill(false),
          availableClues: game.availableClues + 1,
          round: game.round + 1
        });
      } else {
        await database.ref(`/${payload.game}`).update({
          finished: true,
          winner: "murderer"
        });
      }
    }
  },

  async makeGuess(context, payload) {
    const game = context.state.game;
    const players = Object.keys(game.players).length;
    const guessesArray = game.guesses || new Array(players).fill(false);
    guessesArray[payload.player.index] = payload.guess;
    await database.ref(`/${payload.game}`).update({
      guesses: guessesArray
    });
    context.dispatch("checkEndGame", payload);
  },

  async checkEndGame(context, payload) {
    const game = context.state.game;
    const players = Object.keys(game.players).length;
    const validGuesses = game.guesses.filter(item => item.key);
    const playersPassed =
      (game.passedTurns && game.passedTurns.filter(item => item === true)) ||
      [];

    console.log(validGuesses.length, playersPassed.length, players);
    if (
      game.guesses.filter(
        item =>
          item.mean === game.murdererChoice.mean &&
          item.key === game.murdererChoice.key
      ).length > 0
    ) {
      await database.ref(`/${payload.game}`).update({
        finished: true,
        winner: "detective"
      });
    } else if (validGuesses.length === players - 1) {
      await database.ref(`/${payload.game}`).update({
        finished: true,
        winner: "murderer"
      });
    } else if (
      game.round === 3 &&
      validGuesses.length + playersPassed.length === players.length - 1
    ) {
      await database.ref(`/${payload.game}`).update({
        finished: true,
        winner: "murderer"
      });
    }
  },

  async addPlayer(context, payload) {
    const loadedGame = await database
      .ref("/")
      .orderByChild("gameId")
      .equalTo(payload.gameId)
      .once("child_added")
      .then(snaphot => snaphot.val());

    const gamePlayers = await database.ref(`/${loadedGame.gamekey}/players`);

    const oldPlayer = await gamePlayers
      .orderByChild("slug")
      .equalTo(payload.slug)
      .once("value")
      .then(snapshot => {
        return snapshot.val();
      });

    if (oldPlayer && loadedGame.started) {
      router.push(`/game/${payload.gameId}/player/${payload.slug}`);
      return false;
    } else if (loadedGame.started) {
      return "Game has alredy started and no new players can join";
    }

    const player = gamePlayers.push();
    const playerkey = player.getKey();

    const playerData = {
      name: payload.nickname,
      slug: payload.slug,
      index:
        (loadedGame.players && Object.keys(loadedGame.players).length) || 0,
      playerkey
    };

    await player.set(playerData);
    await player.on("value", snapshot => {
      if (snapshot.val() === false) {
        return;
      }
      player
        .onDisconnect()
        .update({
          status: "offline"
        })
        .then(() => {
          if (snapshot.val()) {
            player.update({
              status: "online"
            });
          }
        });
    });
    context.commit("setPlayer", playerData);
    router.push(`/game/${payload.gameId}/player/${payload.slug}`);
  },

  async loadPlayer(context, payload) {
    const loadedGame = await database
      .ref("/")
      .orderByChild("gameId")
      .equalTo(payload.game)
      .once("child_added")
      .then(snapshot => {
        return snapshot.val();
      });
    context.dispatch("loadGame", payload.game);
    const target = await database
      .ref(`/${loadedGame.gamekey}/players/`)
      .orderByChild("slug")
      .equalTo(payload.player)
      .once("child_added")
      .then(snapshot => snapshot.val());
    context.commit("setPlayer", target);
  },

  removePlayer: async (context, payload) => {
    const game = payload.game;
    const target = database
      .ref(`/${game}/players`)
      .orderByChild("slug")
      .equalTo(payload.player)
      .once("value");
    target.off("value");
    await target.remove();
  }
};
