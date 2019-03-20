import Vue from 'vue'
import App from './App.vue'
import router from './router'
// plugins
import BootstrapVue from './plugins/bootstrap-vue'
import Vuelidate from './plugins/vuelidate'
import formLoading from './plugins/vue2-form-loading'

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
