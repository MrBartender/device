<template>
  <div class="middle">
    <pour-code-display></pour-code-display>
  </div>
</template>

<script>
import PourCodeDisplay from '@/components/PourCodeDisplay';
// import  router  from '@/router'

var order

export default {
  name: 'test',
  components: {
    'pour-code-display': PourCodeDisplay
  },
  methods: {
    watchQueue: function () {
      console.log('polling...')
      this.__getAction().then((response) => {
        if(response){
          console.log('order found')
          this.$router.push({name: 'pour', params: {order: response}})
        } else {
          console.log('no orders found during poll')
          this.watchQueue()
        }
      })
    },
    __getAction: async function() {
      const result = await fetch('/queue/next', { method: 'get'})
      return await result.json() 
    }
  },
  mounted(){
    setTimeout(this.watchQueue, 1500)
    // this.watchQueue()
  }
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