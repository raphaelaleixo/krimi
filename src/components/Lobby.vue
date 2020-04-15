<template>
  <v-container style="height:100%">
    <v-row style="height:100%" align="center" v-if="game">
      <v-col class="mt-10 offset-xl-3" cols="12" md="6" xl="4">
        <h2 class="display-2">
          Lobby for room
          <code class="accent--text text-uppercase">{{
            $route.params.id
          }}</code>
        </h2>
        <p class="subtitle-1 my-4">Waiting for players. {{ playerCount }}</p>
        <v-progress-linear
          indeterminate
          absolute
          bottom
          rounded
          color="accent"
        ></v-progress-linear>
        <lobby-players v-if="players" :game="game" :players="players" />
        <v-btn
          class="mt-4"
          x-large
          color="accent"
          :disabled="!players || players.length < 5"
          @click="startGame"
          >Start game</v-btn
        >
      </v-col>
      <v-col cols="12" md="3" xl="2">
        <v-card>
          <v-card-text>
            <qrcode
              :options="{
                size: 1000,
                background: '#fff',
                foreground: '#091619'
              }"
              :value="`${location}/join?room=${game.gameId}`"
            ></qrcode>
            <v-btn
              @click="copyText(location)"
              block
              class="mt-4 accent--text"
              text
              >Copy join url</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" top :timeout="3000">
      URL Copied
      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.style.position = "fixed";
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = "2em";
  textArea.style.height = "2em";
  textArea.style.padding = 0;
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";
  textArea.style.background = "transparent";
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }
  document.body.removeChild(textArea);
}
import LobbyPlayers from "./LobbyPlayers";
export default {
  name: "Home",
  components: { LobbyPlayers },
  data: () => ({
    snackbar: false
  }),
  computed: {
    game() {
      return this.$store.state.game;
    },
    location() {
      return `${window.location.origin}/join?room=${this.game.gameId}`;
    },
    players() {
      if (!this.game || !this.game.players) return false;
      return Object.keys(this.game.players).map(
        item => this.game.players[item]
      );
    },
    playerCount() {
      if (!this.game || !this.game.players) return "No players joined yet.";
      else if (!this.game || !this.game.players)
        return `${this.players.length} player joined.`;
      else return `${this.players.length} players joined.`;
    }
  },
  methods: {
    async startGame() {
      await this.$store.dispatch("startGame", {
        game: this.game.gamekey,
        players: this.players,
        detective: this.active
      });
    },
    copyText(text) {
      copyTextToClipboard(text);
      this.snackbar = true;
    }
  }
};
</script>
<style lang="scss" scoped>
canvas {
  max-width: 100%;
}
</style>
