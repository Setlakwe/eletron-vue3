import Vue from 'vue'
import App from './App.vue'
import router from './router'
// plugins
import BootstrapVue from './plugins/bootstrap-vue'
import Vue2Filters from './plugins/vue2-filters'

Vue.config.productionTip = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
