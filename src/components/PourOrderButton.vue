<template>
  <button v-touch:tap="pourOrder">Pour Order</button>
</template>

<script>
import {pour} from '@/data/pumps'

export default {
  name: 'orderPourer',
  props: {
    order: Object
  },
  methods: {
    pourOrder(){
      //call pouring logic
      pour (this.order).then(() => {
        console.log('order poured')
        // TODO: update order status
        this.$router.push('/test/listener')
      })
    }
  }
}
</script>
