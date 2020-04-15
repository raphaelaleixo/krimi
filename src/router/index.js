import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Join from "../views/Join.vue";
import Game from "../views/Game.vue";
import Player from "../views/Player.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/join",
    name: "Join",
    component: Join
  },
  {
    path: "/game/:id",
    name: "game",
    component: Game
  },
  {
    path: "/game/:id/player/:slug",
    name: "player",
    component: Player
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
