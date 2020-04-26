import database from "@/database";
import rules from "@/api/rules";
import means from "@/data/means";
import clues from "@/data/clues";
import analysis from "@/data/analysis";
import meanspt_br from "@/data/means-ptbr";
import cluespt_br from "@/data/clues-ptbr";
import analysispt_br from "@/data/analysis-ptbr";

import router from "@/router";

export default {
  createGame: async (context, payload) => {
    const gameList = database.ref("/");
    const game = await gameList.push();
    const gamekey = game.getKey();
    const gameData = {
      gameId: rules.createRandomId(),
      players: {},
      detective: 0,
      gamekey,
      finished: false,
      availableClues: 6,
      round: 1,
      lang: payload
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
    const gameclues = {
      en: {
        clues,
        means,
        analysis
      },
      pt_br: {
        clues: cluespt_br,
        means: meanspt_br,
        analysis: analysispt_br
      }
    };
    const lang = payload.lang || "en";
    const gameMeans = rules.getRandom(
      gameclues[lang].means,
      payload.players.length * 4
    );
    const gameClues = rules.getRandom(
      gameclues[lang].clues,
      payload.players.length * 4
    );
    const analysisCause = gameclues[lang].analysis.filter(
      item => item.type === 0
    );
    const analysisLocation = rules.getRandom(
      gameclues[lang].analysis.filter(item => item.type === 1),
      1
    );
    const analysisOther = rules.getRandom(
      gameclues[lang].analysis.filter(item => item.type === 2),
      6
    );

    const players = payload.playersObj;
    let iterate = 0;
    for (let player in players) {
      players[player] = {
        index: iterate,
        ...players[player]
      };
      iterate++;
    }
    const startedGame = {
      started: true,
      means: gameMeans,
      clues: gameClues,
      players,
      analysis: [...analysisCause, ...analysisLocation, ...analysisOther],
      murderer: rules.chooseRandomMurderer(payload.players, payload.detective)
    }
    await database.ref("/" + payload.game).update(startedGame);
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
    if (
      game.guesses.filter(
        item =>
          item.mean === game.murdererChoice.mean &&
          item.key === game.murdererChoice.key
      ).length > 0
    ) {
      await database.ref(`/${payload.game}`).update({
        finished: true,
        winner: "detectives"
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
    } else {
      const newRound = validGuesses.length + playersPassed.length === players.length - 1 ? game.round + 1 : game.round;
      const newClues = validGuesses.length + playersPassed.length === players.length - 1 ? game.availableClues + 1 : game.availableClues;
      console.log(validGuesses, playersPassed, players)
      await database.ref(`/${payload.game}`).update({
        passedTurns: new Array(players).fill(false),
        availableClues: newClues,
        round: newRound
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
      playerkey
    };
    await player.set(playerData);
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
};
