import '@babel/polyfill'
import 'mutationobserver-shim'
import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
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
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0, //Get rid of this once everything is set up

  },
  mutations: {
    increment (state) {
      state.count++
    },
    setUser (state, user) {
      state.user = user;
    }
  }
})


new Vue({
  router,
  components: {
  },
  store: store,
  render: h => h(App)
}).$mount('#app')
