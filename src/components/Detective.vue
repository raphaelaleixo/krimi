<template>
  <v-row>
    <v-col cols="12">
      <v-card>
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
            >{{ mean }}</v-chip>
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
            >{{ mean }}</v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="sheet = !sheet" text>View role</v-btn>
          <v-btn @click="passTurn" :disabled="disableActions" text>Pass turn</v-btn>
          <v-btn
            @click="solve = !solve"
            color="primary"
            :disabled="disableActions"
            text
          >Solve the crime</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-bottom-sheet inset v-model="sheet">
      <v-sheet class="text-center" height="500px">
        <v-container>
          <v-btn class="mt-6" dark @click="sheet = !sheet">close</v-btn>
          <p class="headline mt-4">Your are {{ playerRole }}</p>
          <murderer-choice v-if="player.index === game.murderer" :game="game" :player="player" />
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
    <v-bottom-sheet inset v-model="solve">
      <v-sheet class="text-center" height="500px">
        <v-container>
          <v-btn class="mt-6" dark @click="solve = !solve">close</v-btn>
          <p class="headline mt-4">Solve the crime</p>
          <v-col cols="12">
            <v-card>
              <v-card-text>
                <v-select
                  class="mt-2"
                  :items="players"
                  v-model="guess.player"
                  label="Who is the murderer?"
                  item-text="name"
                  item-value="index"
                  solo
                ></v-select>
                <v-row v-if="selectedPlayer">
                  <v-col cols="12" md="6">
                    <div class="text-left">
                      Select the mean of murder:
                      <v-chip-group column>
                        <v-chip
                          small
                          style="opacity: 1"
                          :class="{'v-chip--active':guess.mean === mean}"
                          @click="guess.mean = mean"
                          color="blue lighten-4"
                          v-for="(mean, index) in [...game.means].slice(
                      selectedPlayer.index * 4,
                      selectedPlayer.index * 4 + 4
                    )"
                          :key="index"
                        >
                          <v-icon class="mr-1" small v-if="guess.mean === mean">mdi-check</v-icon>
                          {{ mean }}
                        </v-chip>
                      </v-chip-group>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div class="text-left">
                      Select the key evidence:
                      <v-chip-group column>
                        <v-chip
                          small
                          style="opacity: 1"
                          :class="{'v-chip--active':guess.key === clue}"
                          @click="guess.key = clue"
                          color="red lighten-4"
                          v-for="(clue, index) in [...game.clues].slice(
                      selectedPlayer.index * 4,
                      selectedPlayer.index * 4 + 4
                    )"
                          :key="index"
                        >
                          <v-icon class="mr-1" small v-if="guess.key === clue">mdi-check</v-icon>
                          {{ clue }}
                        </v-chip>
                      </v-chip-group>
                    </div>
                  </v-col>
                </v-row>
                <v-card-text>
                  <v-btn @click="sendGuess">Send guess</v-btn>
                </v-card-text>
              </v-card-text>
            </v-card>
          </v-col>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </v-row>
</template>

<script>
import MurdererChoice from "@/components/MurdererChoice";
export default {
  components: { MurdererChoice },
  data: () => ({
    sheet: true,
    solve: false,
    guess: {
      player: null,
      mean: null,
      key: null
    }
  }),
  props: {
    game: {
      type: Object,
      required: true
    },
    player: {
      type: Object,
      required: true
    }
  },
  computed: {
    disableActions() {
      return (
        (this.game.passedTurns && this.game.passedTurns[this.player.index]) ||
        (this.game.guesses && !!this.game.guesses[this.player.index])
      );
    },
    playerRole() {
      if (this.player.index === this.game.murderer) {
        return "the murderer";
      } else {
        return "a detective";
      }
    },
    players() {
      return Object.keys(this.game.players)
        .map(item => this.game.players[item])
        .filter(
          item =>
            item.index !== this.game.detective &&
            item.index !== this.player.index
        );
    },
    selectedPlayer() {
      return this.players.find(item => item.index === this.guess.player);
    }
  },
  methods: {
    async passTurn() {
      await this.$store.dispatch("passTurn", {
        game: this.game.gamekey,
        player: this.player
      });
    },
    async sendGuess() {
      await this.$store.dispatch("makeGuess", {
        game: this.game.gamekey,
        player: this.player,
        guess: this.guess
      });
      this.solve = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>