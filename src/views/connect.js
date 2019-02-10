const Connect = {
  created () {
    fetch('/scan', { method: 'get' })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  methods: {
    reload() {
      this.$router.go()
    }
  },
  template: `<div>Hello from Connect!</div><p></p><button v-touch:tap="reload">Refresh</button>`
}

module.exports = Connect
