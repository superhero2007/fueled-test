import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

// import the styles
import "@/assets/scss/global.scss";
import "@/assets/fonts/SFPro/SFPro.css";
import * as lodash from "lodash";

window._ = lodash;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
