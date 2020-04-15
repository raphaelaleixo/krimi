import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueQrcode from "@xkeshi/vue-qrcode";

import VuePageTransition from "vue-page-transition";

Vue.config.productionTip = false;
Vue.component(VueQrcode.name, VueQrcode);

Vue.use(VuePageTransition);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
