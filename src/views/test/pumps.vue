<template>
  <div class="middle">
    <div class="row">
      <pump-button :number="1"></pump-button>
      <pump-button :number="2"></pump-button>
      <pump-button :number="3"></pump-button>
      <pump-button :number="4"></pump-button>
      <pump-button :number="5"></pump-button>
      <pump-button :number="6"></pump-button>
    </div>
    <div class="row">
      <pump-button :number="7"></pump-button>
      <pump-button :number="8"></pump-button>
      <pump-button :number="9"></pump-button>
      <pump-button :number="10"></pump-button>
      <pump-button :number="11"></pump-button>
      <pump-button :number="12"></pump-button>
    </div>
    <pump-timer></pump-timer>
  </div>
</template>

<script>
import PumpTestButton from '@/components/PumpTestButton.vue'
import PumpTestTimer from '@/components/PumpTestTimer.vue'

export default {
  name: 'pumps-test',
  components: {
    'pump-button': PumpTestButton,
    'pump-timer': PumpTestTimer
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