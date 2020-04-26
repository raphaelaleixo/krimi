<template>
  <v-container style="height:100%">
    <v-row style="height:100%" align="center" justify="center">
      <v-alert type="error" dismissible v-model="error">
        {{ errorText }}
      </v-alert>
      <v-col class="mt-6" cols="12" md="6">
        <h2 class="display-2">{{ t("Join game") }}</h2>
        <p class="subtitle-1 my-4">
          {{ t("Enter a game code and a nickname to join a game:") }}
        </p>
        <form @submit.prevent="joinGame">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                width="100%"
                v-model="gameId"
                :label="t('Game code')"
                filled
                hide-details="auto"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                width="100%"
                v-model="nickname"
                :label="t('Your nickname')"
                hide-details="auto"
                filled
                required
              ></v-text-field>
            </v-col>
            <v-col class="d-lg-flex" cols="12" md="6">
              <v-btn class="mr-4 mb-4 mb-lg-0" x-large to="/">
                <v-icon class="accent--text">mdi-arrow-left</v-icon>
              </v-btn>
              <v-btn
                class="mb-4"
                :disabled="disabled"
                type="submit"
                x-large
                color="accent"
                >{{ t("Enter game") }}</v-btn
              >
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  locales: {
    pt_br: {
      "Enter a game code and a nickname to join a game:":
        "Digite o código do jogo e um apelido para entrar:",
      "Your nickname": "Seu apelido",
      "Game code": "Código do jogo",
      "Join game": "Entrar em um jogo",
      "Enter game": "Entrar no jogo"
    }
  },
  data: () => ({
    nickname: "",
    gameId: "",
    error: false,
    disabled: false,
    errorText: null
  }),
  methods: {
    async joinGame() {
      this.disabled = true;
      this.errorText = null;
      this.error = false;
      const errorText = await this.$store.dispatch("addPlayer", {
        nickname: this.nickname,
        slug: this.nickname.replace(/\s+/g, "-").toLowerCase(),
        gameId: this.gameId.toLowerCase()
      });
      if (errorText) {
        this.error = true;
        this.errorText = errorText;
        this.disabled = false;
      }
    }
  },
  mounted() {
    if (this.$route.query.room) {
      this.gameId = this.$route.query.room;
    }
  }
};
</script>
