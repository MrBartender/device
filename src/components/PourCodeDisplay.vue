<template>
  <h1 class="display">Pour Code: {{ code }}</h1>
</template>

<script>
export default {
  name: 'pourCode',
  props: {
    order: String
  },
  data () {
    return {
      code: this.generateCode(4)
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
    generateCode (digits) {
      let num = Math.floor(((Math.random() * (Math.pow(10, digits))) + 1)).toString()
      let code = num.padStart(digits, '0')
      return this.__postAction(code).then(response)
    }
  },
}
</script>

<style lang="scss">
.display {
  margin: 10px;
  text-align: center;
}
</style>
