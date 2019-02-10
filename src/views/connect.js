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
  template: `<div>Hello from Connect!</div>`
}

module.exports = Connect
