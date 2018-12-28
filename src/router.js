// Get views
const Queue = require('./views/queue')
const Connect = require('./views/connect')

// Setup Router
const Router = new VueRouter({
  routes: [
    { path: '/queue', component: Queue },
    { path: '/connect', component: Connect }
  ]
})

module.exports = Router
