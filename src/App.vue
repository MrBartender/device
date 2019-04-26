<template>
  <transition name="fade">
    <router-view v-if="loaded" key="view"></router-view>
    <div v-else class="spinner" key="spinner"></div>
  </transition>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    loaded: false
  }),
  created () {
    fetch('/check-online', {
      method: 'get'
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.online) {
          this.$router.replace('/connect')
        } else {
          this.$router.replace('/test')
        }
        this.loaded = true
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
  background-color: #252D4A;
}

#app {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes spinner {
  to {transform: rotate(360deg);}
}

.spinner:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  margin-top: -25px;
  margin-left: -25px;
  border-radius: 50%;
  border: 6px solid transparent;
  border-top-color: #EE5525;
  border-bottom-color: #EE5525;
  animation: spinner 1.2s ease infinite;
}
</style>
