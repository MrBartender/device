import vue from 'vue'
import router from './router'
import app from './app.vue'
import touchEvents from 'vue2-touch-events'

vue.use(touchEvents)

// Start app
new vue({
  el: '#app',
  router,
  render: (h) => h(app)
})
