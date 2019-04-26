<template>
  <div>
    <img class="logo" src="images/logo-400.png" alt="MrBartender Logo">
    <transition name="fade">
      <div>
        <pour-button v-if="order_data" :timings="order_data[2]" ></pour-button>
        <div v-else class="spinner" key="spinner"></div>
        <p v-if="order_data" class='info'><span> {{ order_data[0] }}</span> <span class="pipe">  |  </span><span> {{ order_data[1] }}</span> </p>
      </div>
    </transition>
  </div>
</template>

<script>
import PourOrderButton from '@/components/PourOrderButton';

export default {
  name: 'pour-test',
  components: {
    'pour-button': PourOrderButton
  },
  props: {
    order_id: String
  },
  data () {
    return {
      order_data: false,
    }
  },
  methods: {
    __getAction: async function(id) {
      const response = await fetch(
        'https://db9cqhrxrk.execute-api.us-east-1.amazonaws.com/dev/pour/getOrder?orderID='+this.order_id, 
        {
          method: 'GET',
        })
      return await response.json()
    },
  },
  mounted(){
    this.__getAction(this.order_id).then((response) => {
      console.log(response)
      this.$data.order_data = response
      // this.$data.order_data = ['Woodhouse', 'Gin and Tonic', {'1':4000, '2':4000}]
    })
  },
}
</script>

<style lang="scss">
  .info {
    width: 100%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    font-family: sans-serif;
    font-size: xx-large;
    color: #FFFFFF;
  }

  .pipe {
    color: rgb(145, 137, 175);
  }
</style>