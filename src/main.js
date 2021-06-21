// import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import axios from 'axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'

import "@aws-amplify/ui-vue";
import Amplify from "aws-amplify"
import awsconfig from "./aws-exports"

Amplify.configure(awsconfig);

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
