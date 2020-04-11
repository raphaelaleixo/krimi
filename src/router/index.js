import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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
    component: () => import("../views/Join.vue")
  },
  {
    path: "/game/:id",
    name: "game",
    component: () => import("../views/Game.vue")
  },
  {
    path: "/game/:id/player/:slug",
    name: "player",
    component: () => import("../views/Player.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
