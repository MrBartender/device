import Vue from 'vue'
import Router from './router'
import App from './App.vue'

// Start app
new Vue({
  el: '#app',
  router: Router,
  render: (h) => h(App)
})
