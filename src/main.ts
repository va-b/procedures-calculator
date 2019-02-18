import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/global-styles.scss'
import IServiceFactory from "@/services/IServiceFactory";
import ServiceFactory from "@/services/ServiceFactory";

Vue.config.productionTip = false;

declare global {
  interface Window {
    serviceFactory: IServiceFactory;
    vm: Vue;
  }
}

window.vm = new Vue({
  router,
  store,
  render: h => h(App)
});
window.serviceFactory = new ServiceFactory();

window.vm.$mount('#app');


