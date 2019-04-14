import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/Main.vue'
import StartPage from './components/StartPage.vue';
import Result from './components/Result.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/main',
      component: Main
    },
    {
        path: '/',
        component: StartPage
    },
    {
        path: '/result',
        component: Result
    },

  ]
})
