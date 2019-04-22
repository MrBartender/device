<template>
  <div>
    <router-view></router-view>
    <!-- Page refresh helper button -->
    <nav class="menu">
      <button v-touch:tap="reload">Refresh</button>
      <router-link to="/test/pumps">Pumps</router-link>
      <router-link to="/test/recipes">Recipes</router-link>
      <router-link to="/test/listener">Listener</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'test-layout',
  methods: {
    reload() {
      this.$router.go()
    }
  }
}
</script>

<style lang="scss">
.menu {
  z-index: 1000;
  margin: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
