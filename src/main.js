import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'



import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
  router,
  components: {
  },
  render: h => h(App)
}).$mount('#app')
