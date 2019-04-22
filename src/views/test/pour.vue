<template>
  <div class="middle">
    <pour-button></pour-button>
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
    order: Object
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