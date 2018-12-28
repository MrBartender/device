(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./router":2}],2:[function(require,module,exports){
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

},{"./views/connect":3,"./views/queue":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
const Queue = {
  template: `<div>Hello from Queue!</div>`
}

module.exports = Queue

},{}]},{},[1]);
