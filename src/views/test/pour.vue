<template>
  <div class="middle">
    <pour-button :timings="timings" ></pour-button>
  </div>
</template>

<script>
import PourOrderButton from '@/components/PourOrderButton';

export default {
  name: 'test',
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
      this.$data.timings = response
    })
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