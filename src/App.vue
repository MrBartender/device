<template>
  <div>
    <transition name="fade">
      <router-view v-if="loaded" key="view"></router-view>
      <div v-else class="spinner" key="spinner"></div>
    </transition>
  </div>
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
        this.$router.push(response.online ? 'home' : 'connect')
        this.loaded = true
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
</script>