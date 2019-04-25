<template>
  <button v-touch:tap="pourOrder">Pour Order</button>
</template>

<script>

export default {
  name: 'orderPourer',
  props: {
    timings: Object
  },
  methods: {
    __postAction: async (timings) => {
      const response = await fetch('/order/pour', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timings: timings })
      })
      return await response.json()
    },
    pourOrder(){
      this.__postAction(this.timings).then((response) => {
        console.log('order poured')
        this.$router.push('/test/listener')
      })
    }
  }
}
</script>
