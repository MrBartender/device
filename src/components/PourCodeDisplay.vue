<template>
  <p class="display">Pour Code: {{ code }}</p>
</template>

<script>
export default {
  name: 'pourCode',
  props: {
    order: String
  },
  data () {
    return {
      code: null
      // code: this.generateCode(4)
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
      

    },
    // generateCode (digits) {
    //   let num = Math.floor(((Math.random() * (Math.pow(10, digits))) + 1)).toString()
    //   let code = num.padStart(digits, '0')
    //   this.__postAction(code).then((response) => {
    //     console.log(response)
    //     return response.code
    //   })
    // }
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
  margin: 10px;
  text-align: center;
  font-size: xx-large;
}
</style>
