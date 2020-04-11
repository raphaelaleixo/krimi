<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="7">
        <v-alert type="error" dismissible v-model="error">
          {{ errorText }}
        </v-alert>
      </v-col>
      <v-col class="mt-6" cols="12" md="6">
        <h2 class="display-1">Join game</h2>
        <p class="subtitle-1 mb-4">
          Select the number of players, the size of your game board and start
          playing now!
        </p>
        <form @submit.prevent="joinGame">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                width="100%"
                v-model="gameId"
                label="Game code"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                width="100%"
                v-model="nickname"
                label="Your nickname"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn type="submit" large color="primary">Enter game</v-btn>
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
    errorText: null,
  }),
  methods: {
    async joinGame() {
      this.errorText = null;
      this.error = false;
      const errorText = await this.$store.dispatch("addPlayer", {
        nickname: this.nickname,
        slug: this.nickname.replace(/\s+/g, "-").toLowerCase(),
        gameId: this.gameId,
      });
      if (errorText) {
        this.error = true;
        this.errorText = errorText;
      }
    },
  },
  mounted() {
    if (this.$route.query.room) {
      this.gameId = this.$route.query.room;
    }
  },
};
</script>
