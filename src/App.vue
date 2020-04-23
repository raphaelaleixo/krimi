<template>
  <v-app>
    <v-content>
      <transition name="page">
        <router-view />
      </transition>
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
  code {
    letter-spacing: 1px;
    font-family: "kingthings_trypewriter_2Rg";
  }
  &.theme--light {
    background: url("~@/assets/bg.png") no-repeat fixed top center !important;
    background-size: cover;
    color: $black;
    .v-btn {
      font-weight: bolder;
    }
  }
  .display-2.display-2 {
    color: $darkblue;
    letter-spacing: -2px !important;
    word-spacing: -10px;
  }
  .display-1.display-1 {
    letter-spacing: -2px !important;
    word-spacing: -10px;
  }
  .v-app-bar--is-scrolled {
    background-color: white !important;
  }
  .page-enter-active {
    overflow: hidden;
    transition: opacity 0.3s cubic-bezier(0.4, 0.1, 0.7, 0.95);
  }

  .page-enter {
    opacity: 0;
  }

  .page-leave-active {
    display: block;
  }
  .v-card {
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
  }
  .v-card__text {
    &:before,
    &:after {
      content: "";
      height: 2px;
      position: absolute;
      left: 0;
      right: 0;
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
      -webkit-clip-path: polygon(
        0% 0%,
        5% 100%,
        10% 0%,
        15% 100%,
        20% 0%,
        25% 100%,
        30% 0%,
        35% 100%,
        40% 0%,
        45% 100%,
        50% 0%,
        55% 100%,
        60% 0%,
        65% 100%,
        70% 0%,
        75% 100%,
        80% 0%,
        85% 100%,
        90% 0%,
        95% 100%,
        100% 0%
      );
    }
    &:before {
      background-color: #fff;
      top: 0;
    }
    &:after {
      height: 4px;
      background-color: #fff;
      bottom: -3px;
    }
  }
}
</style>
