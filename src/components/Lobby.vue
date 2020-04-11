<template>
  <v-container>
    <v-row class="mt-6" v-if="game">
      <v-col cols="12" md="6">
        <h2 class="display-1">Lobby for room {{ $route.params.id }}</h2>
        <p class="subtitle-1 mb-4">Waiting for players. {{ playerCount }}</p>
        <lobby-players v-if="players" :game="game" :players="players" />
        <v-btn
          class="mt-4"
          color="primary"
          :disabled="!players || players.length < 5"
          @click="startGame"
          >Start game</v-btn
        >
      </v-col>
      <v-spacer />
      <v-col cols="12" md="3">
        <qrcode
          :options="{
            size: 1000,
            background: '#fff',
            foreground: '#091619',
          }"
          :value="`http://criminalmind.ludoratory.com/join?room=${game.gameId}`"
        >
        </qrcode>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LobbyPlayers from "./LobbyPlayers";
export default {
  name: "Home",
  components: { LobbyPlayers },
  computed: {
    game() {
      return this.$store.state.game;
    },
    players() {
      if (!this.game || !this.game.players) return false;
      return Object.keys(this.game.players).map(
        (item) => this.game.players[item]
      );
    },
    playerCount() {
      if (!this.game || !this.game.players) return "No players joined yet.";
      else if (!this.game || !this.game.players)
        return `${this.players.length} player joined.`;
      else return `${this.players.length} players joined.`;
    },
  },
  methods: {
    async startGame() {
      await this.$store.dispatch("startGame", {
        game: this.game.gamekey,
        players: this.players,
        detective: this.active,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
canvas {
  max-width: 100%;
}
</style>
