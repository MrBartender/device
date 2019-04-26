<template>
  <transition name="fade">
    <p v-if="code" class="display">{{ code }}</p>
    <div v-else class="spinner" key="spinner"></div>
  </transition>
</template>

<script>
export default {
  name: 'pourCode',
  props: {
    order: String
  },
  data () {
    return {
      code: false
    }
  },
  methods: {
    __postAction: async (code) => {
      const response = await fetch('/code',  {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
      })
      return await response.json()
    }
  },
  mounted(){
    let digits = 4
    let num = Math.floor(((Math.random() * (Math.pow(10, digits))) + 1)).toString()
      let code = num.padStart(digits, '0')
      this.__postAction(code).then((response) => {
        console.log(response)
        this.$data.code = response.code
      })
  }
}
</script>

<style lang="scss">
  .display {
    text-align: center;
    font-size: -webkit-xxx-large;
    font-family: sans-serif;
    font-weight: bold;
    color: #FFFFFF;
  }
</style>
