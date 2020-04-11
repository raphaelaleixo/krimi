<template>
  <v-container v-if="player">
    <v-row>
      <v-col class="mt-6" cols="12">
        <h2 class="display-1">Hello, {{ player.name }}!</h2>
      </v-col>
    </v-row>
    <forensic-analysis v-if="player.index === game.detective" :game="game" />
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
