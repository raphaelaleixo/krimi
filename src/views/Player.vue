<template>
  <v-container>
    <v-row v-if="player">
      <v-col class="offset-md-3 mt-6" cols="12" md="6">
        <h2 class="display-1">Hello, {{ player.name }}!</h2>
        <p class="subtitle-1 mb-4">Your are {{ playerRole }}</p>
      </v-col>
      <v-col
        class="offset-md-3"
        cols="12"
        md="6"
        v-for="(item, index) in availableClues"
        :key="index"
      >
        <v-card>
          <v-card-text>{{ item.title }}</v-card-text>
          <v-card-text>
            <v-select
              :items="item.options"
              v-model="analysis[index]"
              :label="item.title"
              solo
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="offset-md-3 mt-6" cols="12" md="6">
        <v-btn
          @click="sendAnalysis"
          :disabled="analysis.length < availableClues.length"
          >Send analysis</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    analysis: [],
  }),
  computed: {
    game() {
      if (!this.$store.state.game) {
        this.$store.dispatch("loadGame", this.$route.params.id);
      }
      return this.$store.state.game;
    },
    player() {
      if (!this.$store.state.player && this.game) {
        this.$store.dispatch("loadPlayer", this.$route.params.slug);
      }
      return (
        this.$store.state.player &&
        this.$store.state.player[Object.keys(this.$store.state.player)[0]]
      );
    },
    playerRole() {
      if (this.player.index === this.game.detective) {
        return "the forensic expert";
      } else if (this.player.index === this.game.murderer) {
        return "the murderer";
      } else {
        return "a detective";
      }
    },
    availableClues() {
      return this.game.analysis.filter((item, index) => index < 6);
    },
  },
  methods: {
    async sendAnalysis() {
      console.log("aqui");
      await this.$store.dispatch("setAnalysis", {
        game: this.game.gamekey,
        analysis: this.analysis,
      });
    },
  },
};
</script>
