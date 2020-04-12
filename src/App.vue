<template>
  <v-app>
    <v-app-bar elevate-on-scroll app color="rgba(0,0,0,0)">
      <img
        src="~@/assets/logo.svg"
        max-width="136"
        class="mt-4 mb-2"
        height="38"
        contain
      />
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
.v-application {
  &.theme--light {
    background: url("~@/assets/bg.png") no-repeat fixed top center !important;
    background-size: cover;
    color: $black;
    .v-btn {
      font-weight: bolder;
    }
  }
  .display-2 {
    color: $darkblue;
  }
  .v-app-bar--is-scrolled {
    background-color: white !important;
  }
}
</style>
