<template>
  <button class="pour-button" v-touch:tap="pourOrder">Pour Order</button>
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
    pour_time(){
      var max_time = 0
      for (var pump in this.timings){
        max_time = Math.max(max_time, this.timings[pump])
      }
      return max_time
    },
    pourOrder(){
      
      console.log('pouring order')
      this.$router.push({name: 'progress', params: {pour_time: this.pour_time()}})
      this.__postAction(this.timings).then((response) => {
        console.log('done pouring')
        //this.$router.push('/test/listener')
      })
    }
  }
}
</script>

<style lang="scss">
  .pour-button {
    width: 50vw;
    height: 80px;
    box-shadow: 0px 2px 8px 1px rgb(83, 91, 254);
    margin: 25vw;
    border-style: none;
    border-radius: 40px;
    background-color: #535BFE;
    color: #FFFFFF;
    font-size: xx-large;
  }
  .pour-button:hover{
    background-color:#9353fe
  }
  .pour-button:active{
    background-color:#9353fe
  }

</style>
