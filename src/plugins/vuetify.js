import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      light: {
        primary: "#094067",
        base: "#094067",
        secondary: "#3da9fc",
        accent: "#ef4565",
        anchor: "#8c9eff"
      }
    }
  }
});
