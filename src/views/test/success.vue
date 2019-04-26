<template>
    <div>
      <img class="splash-logo" src="images/logo-400.png" alt="MrBartender Logo">
      <transition name="fade">
        <p class="message">Enjoy</p>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'success',
  methods: {
    redirect(){
      this.$router.push('/test/listener')
    }
  },
  mounted () {
    setTimeout(this.redirect, 1200)
  },
}
</script>

<style lang="scss">
  .message {
    position: absolute;
    top: 69%;
    left: 42%;
    font-family: sans-serif;
    font-size: -webkit-xxx-large;
    color: #FFFFFF;
  }
</style>