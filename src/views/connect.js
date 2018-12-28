const Connect = {
  created () {
    axios.get('/scan')
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  template: `<div>Hello from Connect!</div>`
}

module.exports = Connect
