import Vue from 'vue'
import Router from './router'
import App from './App.vue'
import TouchEvents from 'vue2-touch-events'

Vue.use(TouchEvents)

// Start app
new Vue({
  el: '#app',
  router: Router,
  render: (h) => h(App)
})
