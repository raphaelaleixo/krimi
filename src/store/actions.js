import database from "@/database";
import rules from "@/api/rules";
import means from "@/data/means";
import clues from "@/data/clues";
import analysis from "@/data/analysis";

export default {
  createGame: async (context) => {
    const gameList = database.ref("/");
    const game = await gameList.push();
    const gamekey = game.getKey();
    const gameData = {
      gameId: rules.createRandomId(),
      players: {},
      detective: 0,
      gamekey,
    };
    await game.set(gameData);
    context.commit("setGame", gameData);
    return {
      gameId: gameData.gameId,
      gamekey,
    };
  },

  loadGame: async (context, payload) => {
    const loadedGame = database
      .ref("/")
      .orderByChild("gameId")
      .equalTo(payload);
    await loadedGame.on("child_added", (snapshot) => {
      context.commit("setGame", snapshot.val());
    });
    loadedGame.on("child_changed", (snapshot) => {
      context.commit("setGame", snapshot.val());
    });
  },

  async startGame(context, payload) {
    const gameMeans = rules.getRandom(means, payload.players.length * 4);
    const gameClues = rules.getRandom(clues, payload.players.length * 4);
    const analysisCause = analysis.filter((item) => item.type === 0);
    const analysisLocation = rules.getRandom(
      analysis.filter((item) => item.type === 1),
      1
    );
    const analysisOther = rules.getRandom(
      analysis.filter((item) => item.type === 2),
      6
    );
    await database.ref("/" + payload.game).update({
      started: true,
      means: gameMeans,
      clues: gameClues,
      analysis: [...analysisCause, ...analysisLocation, ...analysisOther],
      murderer: rules.chooseRandomMurderer(payload.players, payload.detective),
    });
  },

  async setDetective(context, payload) {
    await database.ref("/" + payload.game).update({
      detective: payload.player,
    });
  },

  async setAnalysis(context, payload) {
    await database.ref("/" + payload.game).update({
      forensicAnalysis: payload.analysis,
    });
  },

  async addPlayer(context, payload) {
    const loadedGame = await database
      .ref("/")
      .orderByChild("gameId")
      .equalTo(payload.gameId)
      .once("child_added")
      .then((snaphot) => snaphot.val());

    if (loadedGame.started) {
      return "This game has already started";
    }

    const gamePlayers = await database.ref(`/${loadedGame.gamekey}/players`);

    const oldPlayer = await gamePlayers
      .orderByChild("slug")
      .equalTo(payload.slug)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      });

    if (oldPlayer) {
      return "This player name already exists";
    }

    const player = gamePlayers.push();
    const playerkey = player.getKey();

    const playerData = {
      name: payload.nickname,
      slug: payload.slug,
      index:
        (loadedGame.players && Object.keys(loadedGame.players).length) || 0,
      playerkey,
    };
    console.log(playerData);

    await player.set(playerData);
    await player.on("value", (snapshot) => {
      if (snapshot.val() === false) {
        return;
      }
      player
        .onDisconnect()
        .update({
          status: "offline",
        })
        .then(() => {
          if (snapshot.val()) {
            player.update({
              status: "online",
            });
          }
        });
    });
    context.commit("setPlayer", playerData);
  },

  async loadPlayer(context, payload) {
    const gameData = context.state;
    const target = await database
      .ref(`/${gameData.game.gamekey}/players/`)
      .orderByChild("slug")
      .equalTo(payload)
      .once("value")
      .then((snapshot) => snapshot.val());
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
  },
};
