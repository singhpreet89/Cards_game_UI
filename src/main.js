import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue } from "bootstrap-vue";
import Toasted from "vue-toasted";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

axios.defaults.baseURL = 'http://localhost:8000/api';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

Vue.use(Toasted, {
  duration: 3000,
  position: "top-center",
  theme: "bubble",
  action: {
    text: "X",
    onClick: (e, toastObject) => {
      toastObject.goAway(3000);
    },
  },
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");

