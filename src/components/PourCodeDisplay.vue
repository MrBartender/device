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
    generateCode (digits) {
        let num = Math.floor(((Math.random() * (Math.pow(10, digits))) + 1)).toString()
        let code = num.padStart(digits, '0')
        // TODO: update pour code in DB
        return code
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
