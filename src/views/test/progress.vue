<template>
  <!-- <transition name="fade"> -->
    <div>
      <img class="splash-logo" src="images/logo-400.png" alt="MrBartender Logo">
      <transition name="fade">
        <div class="progress_container">
          <vue-circle ref="pourProgress"
            :progress="0"
            :size="400"
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
      </transition>
    </div>
  <!-- </transition> -->
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
      fill : {color: "#535BFE"},
      anim: { duration: 100 , easing: "circleProgressEasing" },
    }
  },
  methods: {
    update(value, step){
      // console.log(value)
      let progress = value + step
      this.$refs.pourProgress.updateProgress((progress))
      if ((progress) >= 100){
        // console.log('Progress took', Date.now() - this.$data.start, 'ms')
        setTimeout(this.redirect, 500) //pause after completion to look less sudden
      } else {
        setTimeout(this.update, 100, progress, step);
      }
    },
    redirect(){
      this.$router.push('/test/success')
    }
  },
  mounted(){
    let step = (100.0 / this.pour_time) * 100
    this.update(0, step)
  }
}
</script>

<style lang="scss">
  .progress_container {
    margin-left: 200px;
    margin-top: 40px;
  }
</style>