<template>
  <v-container>
    <v-row justify="center">
      <!-- <v-col cols="12" md="7">
        <v-alert type="error" dismissible v-if="hasError">
          {{ errorText }}
        </v-alert>
      </v-col>-->
      <v-col class="mt-6" cols="12" md="6">
        <h2 class="display-1">A Realtime, Multiplayer Boardgame!</h2>
        <p class="subtitle-1 mb-4">
          Select the number of players, the size of your game board and start
          playing now!
        </p>
        <v-row align="center">
          <v-col cols="12" md="5">
            <v-btn type="submit" width="100%" large to="/join">Join game</v-btn>
          </v-col>
          <v-col cols="12" md="5">
            <v-btn
              @click.prevent="createNewGame"
              width="100%"
              type="submit"
              large
              color="primary"
              >Create new game</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    async createNewGame() {
      const game = await this.$store.dispatch("createGame");
      this.$router.push("/game/" + game.gameId);
    },
  },
};
</script>
