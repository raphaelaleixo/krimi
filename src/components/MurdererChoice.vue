<template>
  <v-row class="text-left">
    <v-col cols="12" md="6">
      <v-card height="100%">
        <v-card-text>
          {{ t("Select your means of murder:") }}
          <v-chip-group column>
            <v-chip
              small
              color="blue lighten-4"
              style="opacity: 1"
              :class="{ 'v-chip--active': murdererChoice.mean === mean }"
              @click="murdererChoice.mean = mean"
              :disabled="!!game.murdererChoice"
              v-for="(mean, index) in [...game.means].slice(
                player.index * 4,
                player.index * 4 + 4
              )"
              :key="index"
            >
              <v-icon class="mr-1" small v-if="murdererChoice.mean === mean"
                >mdi-check</v-icon
              >
              {{ mean }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card height="100%">
        <v-card-text>
          {{ t("Select your key evidence:") }}
          <v-chip-group column>
            <v-chip
              small
              style="opacity: 1"
              :class="{ 'v-chip--active': murdererChoice.key === clue }"
              @click="murdererChoice.key = clue"
              color="red lighten-4"
              :disabled="!!game.murdererChoice"
              v-for="(clue, index) in [...game.clues].slice(
                player.index * 4,
                player.index * 4 + 4
              )"
              :key="index"
            >
              <v-icon class="mr-1" small v-if="murdererChoice.key === clue"
                >mdi-check</v-icon
              >
              {{ clue }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col class="mt-2" cols="12" v-if="!game.murdererChoice">
      <v-btn
        @click="sendChoice"
        :disabled="!murdererChoice.mean || !murdererChoice.key"
        >{{ t("Send choice") }}</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    murdererChoice: {
      mean: null,
      key: null
    }
  }),
  locales: {
    pt_br: {
      "Select your means of murder:": "Selecione a causa da morte:",
      "Select your key evidence:": "Selecione a evidência principal:",
      "Send choice": "Enviar escolha"
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
  methods: {
    async sendChoice() {
      await this.$store.dispatch("setMurdererChoice", {
        game: this.game.gamekey,
        choice: this.murdererChoice
      });
      this.$emit("choice");
    }
  },
  mounted() {
    if (this.game.murdererChoice) {
      this.murdererChoice.mean = this.game.murdererChoice.mean;
      this.murdererChoice.key = this.game.murdererChoice.key;
    }
  }
};
</script>

<style lang="scss" scoped></style>
