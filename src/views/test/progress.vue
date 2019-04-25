<template>
  <div class="circleContainer">
    <vue-circle ref="pourProgress"
        :progress="0"
        :size="200"
        :reverse="false"
        line-cap="round"
        :fill="fill"
        empty-fill="rgba(0, 0, 0, .1)"
        :animation="anim"
        :animation-start-value="0.0"
        :start-angle="0"
        insert-mode="append"
        :show-percent="false">
      </vue-circle>
  </div>
</template>

<script>
import VueCircle from 'vue2-circle-progress'

export default {
  name: 'progress-test',
  components: {
    VueCircle
  },
  props: {
    pour_time: Number
  },
  data(){
    return{
      start: Date.now(),
      fill : { gradient: ["cyan", "blue"] },
      anim: { duration: 100 , easing: "circleProgressEasing" },
    }
  },
  methods: {
    update(value, step){
      // console.log(value)
      let progress = value + step
      this.$refs.pourProgress.updateProgress(Math.floor(progress))
      if ((progress) >= 100){
        console.log("Circle progress end", Date.now() - this.$data.start)
        this.$router.push('/test/listener')
      } else {
        setTimeout(this.update, 100, progress, step);
      }
    }
  },
  mounted(){
    let step = (100.0 / this.pour_time) * 100
    this.update(0, step)
  }
}
</script>

<style lang="scss">
  .circleContainer {
    margin-top: 150px;
    margin-bottom: 150px;
    margin-left: 300px;
  }
</style>