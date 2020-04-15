<template>
  <v-container v-if="player && game">
    <v-row class="mt-10">
      <v-col cols="12" lg="6">
        <h2 class="display-2">{{ player.name }}</h2>
        <div v-if="!game.started">
          <p class="subtitle-1 my-4">
            You are in room
            <code class="accent--text text-uppercase">{{ game.gameId }}</code
            >. Waiting for the game start.
          </p>
          <v-progress-linear
            indeterminate
            rounded
            color="accent"
          ></v-progress-linear>
        </div>
      </v-col>
    </v-row>
    <forensic-analysis
      v-if="game.started && player.index === game.detective"
      :game="game"
    />
    <detective v-else-if="game.started" :game="game" :player="player" />
  </v-container>
</template>

<script>
import ForensicAnalysis from "@/components/ForensicAnalysis";
import Detective from "@/components/Detective";
export default {
  name: "Player",
  components: { ForensicAnalysis, Detective },
  computed: {
    game() {
      return this.$store.state.game;
    },
    player() {
      return this.$store.state.player;
    }
  },
  methods: {},
  async mounted() {
    await this.$store.dispatch("loadPlayer", {
      game: this.$route.params.id,
      player: this.$route.params.slug
    });
  }
};
</script>
