import DbService  from "@/services/DbService";
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import './assets/global-styles.css';
import Fetcher from "@/services/Fetcher";
import CalculatorService from "@/services/CalculatorService";

Vue.config.productionTip = false;

window.$http = new Fetcher();
window.$db = new DbService(url => `/db/${url}`)
window.$service = new CalculatorService();

window.$vm = new Vue({
  router,
  render: h => h(App)
});
window.$vm.$mount('#app');


