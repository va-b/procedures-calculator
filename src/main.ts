import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import './assets/global-styles.css';
import Fetcher from "@/services/Fetcher";
import CalculatorService from "@/services/CalculatorService";
import ICalculatorService from "@/services/ICalculatorService";

Vue.config.productionTip = false;

declare global {
  interface Window {
    $service: ICalculatorService;
    $http: IHttpClient;
    $vm: Vue;
  }

  interface IHttpClient
  {
    get<T>( url: string ): Promise<T>;

    post<T>( url: string, data: string | FormData ): Promise<T>;

    put<T>( url: string, data: string ): Promise<T>;

    patch<T>( url: string, data: string ): Promise<T>;

    delete<T>( url: string ): Promise<T>;
  }
}


window.$http = new Fetcher();//'http://localhost:5000');
window.$service = new CalculatorService(url => '/api/' + url);
window.$vm = new Vue({
  router,
  render: h => h(App)
});
window.$vm.$mount('#app');


