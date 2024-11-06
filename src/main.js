import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadingComponent from "@/components/LoadingComponent.vue"
import ErrorComponent from "@/components/ErrorComponent.vue"

Vue.config.productionTip = false

Vue.component('LoadingPage', LoadingComponent)
Vue.component('ErrorComponent', ErrorComponent)

Vue.filter('priceFormat', priceFormat => {
  priceFormat = Number(priceFormat);
  if (!isNaN(priceFormat)) {
    return priceFormat.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP'
    });
  } else {
    return ""
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
