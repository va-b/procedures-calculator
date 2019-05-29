//import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/global-styles.scss';
import IServiceFactory from "@/services/IServiceFactory";
import ServiceFactory from "@/services/ServiceFactory";
import Fetcher from "@/services/Fetcher";

Vue.config.productionTip = false;

declare global {
  interface Window {
    $services: IServiceFactory;
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
window.$services = new ServiceFactory();
window.vm = new Vue({
  router,
  store,
  render: h => h(App)
});
window.vm.$mount('#app');


