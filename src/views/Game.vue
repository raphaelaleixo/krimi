<template>
  <div>
    <lobby v-if="game && !game.started" />
    <board v-else-if="game && game.started" />
  </div>
</template>

<script>
import Lobby from "@/components/Lobby";
import Board from "@/components/Board";
export default {
  name: "Game",
  components: { Lobby, Board },
  computed: {
    game() {
      return this.$store.state.game;
    },
  },
  mounted() {
    this.$store.dispatch("loadGame", this.$route.params.id);
  },
};
</script>
<style lang="scss" scoped>
canvas {
  max-width: 100%;
}
</style>
