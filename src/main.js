import Vue from 'vue'
import App from './App.vue'
import router from './router'
// plugins
import BootstrapVue from './plugins/bootstrap-vue'
import Vue2Filters from './plugins/vue2-filters'

import vueDebounce from 'vue-debounce'
Vue.use(vueDebounce)

// Or if you want to pass in the lock option
Vue.use(vueDebounce, {
  lock: true
})

// Setting a different event to listen to
Vue.use(vueDebounce, {
  listenTo: 'oninput'
})

Vue.config.productionTip = true;



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
