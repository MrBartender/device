'use strict'

const helpers = {
  checkValidInternetConnection() {
    return new Promise((resolve, reject) => {
      require('dns').lookup('google.com', (err) => {
          if (err && err.code == "ENOTFOUND") reject(err)
          else resolve(true)
      })
    })
  },
}

module.exports = helpers
