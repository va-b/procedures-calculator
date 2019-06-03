//import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/global-styles.css';
import Fetcher from "@/services/Fetcher";
import CalculatorService from "@/services/CalculatorService";
import ICalculatorService from "@/services/ICalculatorService";

Vue.config.productionTip = false;

declare global {
  interface Window {
    $service: ICalculatorService;
    $http: IHttpClient;
    vm: Vue;
  }

  interface IHttpClient
  {
    get<T>( url: string ): Promise<T>;

    post<T>( url: string, data: BodyInit ): Promise<T>;

    put<T>( url: string, data: BodyInit ): Promise<T>;

    patch<T>( url: string, data: BodyInit ): Promise<T>;

    delete<T>( url: string ): Promise<T>;
  }
}


window.$http = new Fetcher();
window.$service = new CalculatorService(url => 'http://37.235.251.79:5000/api/' + url)
window.vm = new Vue({
  router,
  store,
  render: h => h(App)
});
window.vm.$mount('#app');


