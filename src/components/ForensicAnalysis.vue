<template>
  <v-row style="height:100%" align="center" justify="center">
    <v-col
      cols="12"
      lg="6"
      style="margin-top:auto;"
      :style="[!game.murdererChoice && 'margin-bottom:auto']"
    >
      <h2 class="display-2 mb-4">{{ player.name }}</h2>
      <div class="display-1" v-if="game.murdererChoice">
        {{ murderer.name }} {{ t("used") }}
        <span class="blue--text"
          >&nbsp;&nbsp;{{ game.murdererChoice.mean }}</span
        >
        {{ t("to kill, and left behind") }}
        <span class="red--text">&nbsp;&nbsp;{{ game.murdererChoice.key }}</span>
        {{ t("as a key evidence.") }}
      </div>
      <v-card v-else>
        <v-card-title style="word-break: inherit"
          >{{ murderer.name }}
          {{
            t("is the murderer. Wait for means of murder and key evidence.")
          }}</v-card-title
        >
        <v-card-text>
          {{
            t(
              "Ask all the players, but the murderer to close their eyes. As soon as you receive the murderer clues, you can ask them to open their eyes again."
            )
          }}
        </v-card-text>
      </v-card>
      <v-progress-linear
        v-if="!game.murdererChoice"
        indeterminate
        absolute
        bottom
        rounded
        color="accent"
      ></v-progress-linear>
    </v-col>
    <v-col cols="12" style="margin-bottom:auto;" v-if="game.murdererChoice">
      <v-row>
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
            x-large
            :disabled="
              analysis.length < availableClues.length ||
                (game.forensicAnalysis &&
                  game.forensicAnalysis.length === availableClues.length)
            "
            >Send analysis</v-btn
          >
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    analysis: []
  }),
  locales: {
    pt_br: {
      "is the murderer. Wait for means of murder and key evidence.":
        "cometeu o crime. Aguarde a causa e evidência principal.",
      used: "usou",
      "to kill, and left behind": "para matar, e deixou pra trás",
      "as a key evidence.": "como evidência principal.",
      "Ask all the players, but the murderer to close their eyes. As soon as you receive the murderer clues, you can ask them to open their eyes again.":
        "Peça para todos os jogadores, menos o assassino, para fecharem os olhos. Assim que receber as pistas do assassino, você pode pedir que eles abram os olhos novamente."
    }
  },
  props: {
    game: {
      type: Object,
      required: true
    },
    player: {
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
      this.analysis = [...this.game.forensicAnalysis];
    }
  }
};
</script>

<style lang="scss" scoped></style>
