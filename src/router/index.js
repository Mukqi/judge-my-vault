import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/vault/:id',
    name: 'Vault',
    component: () => import('../views/Vault_Vote.vue'),
  },
  {
    path: '/vault',
    name: 'Create',
    component: () => import('../views/Vault.vue')
  }
]

// let user = await Auth.currentAuthenticatedUser();

// const { attributes } = user;

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  props: {
  }
})

export default router
