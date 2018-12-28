const Router = require('./router')

// Start app
const app = new Vue({
  router: Router,
  data: {
    loaded: false,
  },
  created () {
    axios.get('/check-online')
      .then((response) => {
        this.$router.push(response.data.online ? 'queue' : 'connect')
        this.loaded = true
      })
      .catch((err) => {
        console.error(err)
      })
  }
}).$mount('#app')
