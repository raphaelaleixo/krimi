<template>
  <v-container style="height:100%">
    <v-row style="height:100%">
      <v-col cols="12">
        <v-alert type="error" v-model="game.finished"
          >The game is finshed. The {{ game.winner }} won!</v-alert
        >
      </v-col>
      <v-col md="9">
        <v-row>
          <v-col cols="12">
            <div class="display-2">
              Game
              <code class="accent--text text-uppercase">{{ game.gameId }}</code>
            </div>
            <p class="subtitle-1 my-4">
              Suspects of the crime:
            </p>
          </v-col>
          <v-col
            v-for="player in suspects"
            :key="player.playerkey"
            md="6"
            xl="3"
          >
            <v-card height="100%">
              <v-card-text>
                <div class="title">{{ player.name }}</div>
                <div v-if="game.passedTurns && game.passedTurns[player.index]">
                  Passed this turn
                </div>
                <div v-if="game.guesses && game.guesses[player.index]">
                  Guessed that the murderer was
                  {{ players[game.guesses[player.index].player].name }}, the
                  mean was {{ game.guesses[player.index].mean }} and the key
                  evidence was {{ game.guesses[player.index].key }}
                </div>
                <v-divider class="my-2" />
                <v-chip-group column>
                  <v-chip
                    small
                    color="blue lighten-4"
                    v-for="(mean, index) in [...game.means].slice(
                      player.index * 4,
                      player.index * 4 + 4
                    )"
                    :key="index"
                    >{{ mean }}</v-chip
                  >
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
                    >{{ mean }}</v-chip
                  >
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div style="color:#5f6c7b" class="display-1">
              Round {{ game.round }} of 3
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="3">
        <v-card>
          <v-card-text>
            <div class="display-1">
              Forensic Analysis:
            </div>
            <div class="subtitle-1">
              {{ players[game.detective].name }}
            </div>
          </v-card-text>
          <v-list-item
            two-line
            v-for="(item, index) in game.forensicAnalysis"
            :key="'fa' + index"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ game.analysis[index].title }}
              </v-list-item-title>
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
        item => this.game.players[item]
      );
    },
    suspects() {
      return this.players.filter(item => item.index !== this.game.detective);
    }
  }
};
</script>
