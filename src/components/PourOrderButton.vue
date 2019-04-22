<template>

  <button v-touch:tap="pourOrder">Pour Order</button>
</template>

<script>
// import router from '@/router'

export default {
  name: 'pumpTester',
  props: {},
  methods: {
    pourOrder(){
      //call pouring logic
      console.log('order poured. returning to listener screen')
      this.$router.push('/test/listener')
    }
  }
}
</script>
