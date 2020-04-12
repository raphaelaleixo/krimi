<template>
  <div>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card v-if="game.murdererChoice">
          <v-card-title>
            {{ murderer.name }} used
            <span class="blue--text mx-2"
              >&nbsp;&nbsp;{{ game.murdererChoice.mean }}</span
            >
            to kill, and left behind
            <span class="red--text mx-2"
              >&nbsp;&nbsp;{{ game.murdererChoice.key }}</span
            >
            as a key evidence.
          </v-card-title>
        </v-card>
        <v-card v-else>
          <v-card-title style="word-break: inherit"
            >{{ murderer.name }} is the murderer. Wait for means of murder and
            key evidence.</v-card-title
          >
          <v-progress-linear
            indeterminate
            rounded
            color="accent"
          ></v-progress-linear>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="game.murdererChoice">
      <v-col
        cols="12"
        md="6"
        lg="3"
        v-for="(item, index) in availableClues"
        :key="index"
      >
        <v-card>
          <v-card-text>
            {{ item.title }}
            <v-select
              class="mt-2"
              :disabled="
                game.forensicAnalysis && !!game.forensicAnalysis[index]
              "
              :items="item.options"
              v-model="analysis[index]"
              :label="item.title"
              solo
            ></v-select>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="mt-6" cols="12" v-if="game.murdererChoice">
        <v-btn
          @click="sendAnalysis"
          :disabled="
            analysis.length < availableClues.length ||
              (game.forensicAnalysis &&
                game.forensicAnalysis.length === availableClues.length)
          "
          >Send analysis</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    analysis: []
  }),
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  computed: {
    availableClues() {
      return this.game.analysis.filter(
        (item, index) => index < this.game.availableClues
      );
    },
    murderer() {
      const key = Object.keys(this.game.players).find(
        item => this.game.players[item].index === this.game.murderer
      );
      return this.game.players[key];
    }
  },
  methods: {
    async sendAnalysis() {
      await this.$store.dispatch("setAnalysis", {
        game: this.game.gamekey,
        analysis: this.analysis
      });
    }
  },
  mounted() {
    if (this.game.forensicAnalysis) {
      this.analysis = this.game.forensicAnalysis;
    }
  }
};
</script>

<style lang="scss" scoped></style>
