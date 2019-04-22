<template>
  <h1>Pour Code: {{ code }}</h1>
</template>

<script>

export default {
  name: 'pourCode',
  props: {
    code: String
  },
  methods: {
    generateCode(digits){
        let num = Math.floor(((Math.random() * (Math.pow(10, digits))) + 1)).toString()
        return num.padStart(digits, '0')
    }
  },
  mounted(){
    this.code = this.generateCode(4)
  }
}
</script>
