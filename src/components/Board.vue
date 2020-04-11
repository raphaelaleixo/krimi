<template>
  <v-container>
    <v-row>
      <v-col md="9">
        <v-row>
          <v-col
            v-for="player in suspects"
            :key="player.playerkey"
            md="6"
            xl="3"
          >
            <v-card height="100%">
              <v-card-title> {{ player.name }}</v-card-title>
              <v-card-text>
                <v-chip-group column>
                  <v-chip
                    small
                    color="blue lighten-4"
                    v-for="(mean, index) in [...game.means].slice(
                      player.index * 4,
                      player.index * 4 + 4
                    )"
                    :key="index"
                  >
                    {{ mean }}
                  </v-chip>
                </v-chip-group>
                <v-chip-group column>
                  <v-chip
                    small
                    color="red lighten-4"
                    v-for="(mean, index) in [...game.clues].slice(
                      player.index * 4,
                      player.index * 4 + 4
                    )"
                    :key="'clue' + index"
                  >
                    {{ mean }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="3">
        <v-card>
          <v-card-title>Forensic Analysis</v-card-title>
          <v-list-item
            two-line
            v-for="(item, index) in game.forensicAnalysis"
            :key="'fa' + index"
          >
            <v-list-item-content>
              <v-list-item-title>{{
                game.analysis[index].title
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Board",
  computed: {
    game() {
      return this.$store.state.game;
    },
    players() {
      if (!this.game || !this.game.players) return false;
      return Object.keys(this.game.players).map(
        (item) => this.game.players[item]
      );
    },
    suspects() {
      return this.players.filter((item) => item.index !== this.game.detective);
    },
  },
};
</script>
<style lang="scss" scoped>
canvas {
  max-width: 100%;
}
</style>
