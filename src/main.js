import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import "./vee-validate";
import sweetalert from 'sweetalert2'
import { ValidationProvider, ValidationObserver } from "vee-validate";
Vue.prototype.$swal = sweetalert
Vue.config.productionTip = false
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
