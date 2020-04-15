<template>
  <v-container style="height:100%">
    <v-row style="height:100%" align="center">
      <v-col class="offset-xl-4" cols="12" lg="6" xl="4">
        <img src="~@/assets/logo.svg" max-width="136" class="mb-4" contain />
        <h2 class="display-2">A game of deduction and deception.</h2>
        <p class="subtitle-1 my-8">
          In the game, players take on the roles of investigators attempting to
          solve a murder case – but there's a twist. The killer is one of the
          investigators! Find out who among you can cut through deception to
          find the truth and who is capable of getting away with murder!
        </p>
        <div class="d-lg-flex">
          <v-btn
            class="mr-4 mb-4 mb-lg-0"
            type="submit"
            color="grey lighten-5"
            large
            to="/join"
            >Join game</v-btn
          >
          <v-btn
            class="mr-4 mb-4 mb-lg-0"
            @click.prevent="createNewGame"
            type="submit"
            large
            color="accent"
            >Create new game</v-btn
          >
        </div>
        <img
          src="~@/assets/ludoratory.svg"
          max-width="136"
          class="mt-10"
          contain
        />
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
    }
  }
};
</script>
