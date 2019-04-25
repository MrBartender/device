<template>
  <div class="middle">
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
.middle {
  top: 40vh;
}

.row {
  width: 110vw;
  position: relative;

  button {
    width: 15vw;
    height: 50px;
    margin: 0;
    margin-right: 1.6vw;
    margin-bottom: 10px;
  }
}
</style>