import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/plumas',
      name: 'plumas',
      // route level code-splitting
      // this generates a separate chunk (invoice.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "invoice" */ './views/plumas.vue')
    },
    {
      path: '/invoice',
      name: 'invoice',
      // route level code-splitting
      // this generates a separate chunk (invoice.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "invoice" */ './views/Invoice.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }, {
      path: '/configuration',
      name: 'configuration',
      // route level code-splitting
      // this generates a separate chunk (configuration.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "configuration" */ './views/Configuration.vue')
    }
  ]
})
