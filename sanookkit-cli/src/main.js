import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AsyncComputed from "vue-async-computed"
import vuetify from './plugins/vuetify'
import { BootstrapVue } from 'bootstrap-vue'
import VueNumber from 'vue-number-animation'

Vue.use(VueNumber)
Vue.use(BootstrapVue)
Vue.use(AsyncComputed)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
