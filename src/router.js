import Vue from 'vue'
import VueRouter from 'vue-router'

// Get views
import TestPumps from './views/TestPumps.vue'
// import Queue from './views/queue'
// import Connect from './views/connect'

// Init Plugin
Vue.use(VueRouter)

// Setup Router
const Router = new VueRouter({
  routes: [
    { path: '/home', component: TestPumps },
    // { path: '/queue', component: Queue },
    // { path: '/connect', component: Connect }
  ]
})

export default Router
