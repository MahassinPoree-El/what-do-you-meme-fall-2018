import Vue from 'vue';
import App from './App.vue';
import router from './router';
import PictureTaker from "@components/PictureTaker";//error here

Vue.config.productionTip = false
Vue.component('PictureTaker', PictureTaker);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')