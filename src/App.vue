<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    links: [
      {
        title: "About this project",
        url:
          "https://medium.com/@raphaelaleixo/creating-codewords-a-real-time-multiplayer-boardgame-on-the-web-ca051071e75"
      },
      {
        title: "How to play",
        url:
          "https://medium.com/@raphaelaleixo/creating-codewords-a-real-time-multiplayer-boardgame-on-the-web-ca051071e75"
      }
    ]
  })
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
