<template>
  <div class="middle">
    <pour-button :order="timings" ></pour-button>
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
    __postAction: async function(id) {
      return fetch('/order', {
        method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ order_id: id })
      }).then(response => response.json())
    },
  },
  mounted(){
    this.__postAction(this.order_id).then((response) => {
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