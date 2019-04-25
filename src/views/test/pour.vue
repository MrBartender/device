<template>
  <div>
    <pour-button :timings="timings" ></pour-button>
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
      timings: null,
    }
  },
  methods: {
    __getAction: async function(id) {
      const response = await fetch(
        'https://cye04n3769.execute-api.us-east-1.amazonaws.com/dev/pour/getorder?orderID='+this.order_id, 
        {
          method: 'GET',
        })
      return await response.json()
    },
  },
  mounted(){
    this.__getAction(this.order_id).then((response) => {
      console.log(response)
      // this.$data.timings = response
      this.$data.timings = {'1':4000, '2':4000}
    })
  },
}
</script>

<style lang="scss">
</style>