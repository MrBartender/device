<template>
  <div class="timer">
    <span>{{ time }}</span>
    <button v-on:click="reset">Reset Timer</button>
  </div>
</template>

<script>

export default {
  name: 'pourTimer',
  data () {
    return {
      start: Date.now(),
      current: Date.now(),
      interval: null
    }
  }, 
  computed: {
    elapsed: function () {
      return this.current - this.$data.start
    },
    milliseconds: function () {
      let time = this.elapsed
      return Math.ceil(time % 1000).toString().padStart(3, '0')
    },
    seconds: function () {
      let time = this.elapsed
      return Math.floor((time / 1000) % 60).toString().padStart(2, '0')
    },
    minutes: function () {
      let time = this.elapsed
      return Math.floor((time / 1000 / 60) % 60).toString().padStart(2, '0')
    },
    time: function () {
      return this.minutes + ':' + this.seconds + ':' + this.milliseconds
    },
  },
  methods: {
    tick () {
      this.current = Date.now()
    },
    reset () {
      if (this.interval){
        clearInterval(this.interval)
      }
      let now = Date.now()
      this.$data.current = now
      this.$data.start = now
    }
  },
  mounted() {
    this.$root.$on('timer-start', () => {
      this.$data.start = Date.now()
      this.interval = setInterval(this.tick, 1)
    }) 
    this.$root.$on('timer-stop', () => {
      clearInterval(this.interval)
    }) 
  }
}
</script>

<style lang="scss">
.timer {
  margin: 10px;
}
</style>
