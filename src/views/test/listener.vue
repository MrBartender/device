<template>
    <div>
      <img class="logo" src="images/logo-400.png" alt="MrBartender Logo">
      <pour-code-display></pour-code-display>
    </div>
</template>

<script>

import PourCodeDisplay from '@/components/PourCodeDisplay';

export default {
  name: 'listener-test',
  components: {
    'pour-code-display': PourCodeDisplay
  },
  methods: {
     __getAction: async function () {
       const response = await fetch('/queue/next', {method:'get'})
       return await response.json()
    },
    watchQueue: function () {
      console.log('polling...')
      this.__getAction().then((response) => {
        if(response){
          console.log('...found order', response.order_id)
          this.$router.push({name: 'pour', params: {order_id: response.order_id}})
        } else {
          console.log('...no orders found')
          this.watchQueue()
        }
      })
    }
  },
  mounted () {
    this.watchQueue()
  },
}
</script>

<style lang="scss">
</style>