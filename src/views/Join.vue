<template>
  <v-container>
    <v-row justify="center" class="mt-10">
      <v-col cols="12" md="7">
        <v-alert type="error" dismissible v-model="error">
          {{ errorText }}
        </v-alert>
      </v-col>
      <v-col class="mt-6" cols="12" md="6">
        <h2 class="display-2">Join game</h2>
        <p class="subtitle-1 my-4">
          Enter a game code and a nickname to join a game:
        </p>
        <form @submit.prevent="joinGame">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                width="100%"
                v-model="gameId"
                label="Game code"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                width="100%"
                v-model="nickname"
                label="Your nickname"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn type="submit" x-large color="accent">Enter game</v-btn>
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
  data: () => ({
    nickname: "",
    gameId: "",
    error: false,
    errorText: null
  }),
  methods: {
    async joinGame() {
      this.errorText = null;
      this.error = false;
      const errorText = await this.$store.dispatch("addPlayer", {
        nickname: this.nickname,
        slug: this.nickname.replace(/\s+/g, "-").toLowerCase(),
        gameId: this.gameId
      });
      if (errorText) {
        this.error = true;
        this.errorText = errorText;
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
