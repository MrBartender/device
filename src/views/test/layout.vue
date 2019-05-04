<template>
  <div>
    <router-view></router-view>

    <!-- Page refresh helper button -->
    <nav class="menu">
      <!-- <button v-touch:tap="reload">Refresh</button> -->
      <router-link to="/test/pumps">Pumps</router-link>
      <router-link to="/test/recipes">Recipes</router-link>
      <router-link to="/test/listener">Bartender</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'splash',
  methods: {
    reload() {
      this.$router.go()
    }
  },
  mounted(){
    this.$router.push('/test/listener')
  }
}
</script>

<style lang="scss">body {
  background-color: #252D4A;
}

.menu {
  z-index: 1000;
  margin: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.splash-logo {
  left: 35.5%;
  top: 20%;
  position: absolute;
  width: 25%;
  display: block;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
}
.logo {
  width: 15%;
  display: block;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
}

a {
  color: #FFFFFF;
  text-decoration: none;
  font-family: sans-serif;
  margin-right: 10px;
}
</style>
