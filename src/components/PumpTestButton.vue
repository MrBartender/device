<template>
  <button v-touch:start="startPump" v-touch:end="stopPump">{{ number }}</button>
</template>

<script>

export default {
  name: 'pumpTester',
  props: {
    number: Number
  },
  methods: {
    _postAction: async (route, id) => {
      const result = await fetch(route, {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        })
      return await result.json()
    },
    startPump() {
      this._postAction('/startPump', this.number)
        .then((response) => {
          this.$root.$emit('timer-start')
          console.log('Start pump ' + this.number)
        })
    },
    stopPump() {
      this._postAction('/stopPump', this.number)
        .then((response) => {
          this.$root.$emit('timer-stop')
          console.log('Stop pump ' + this.number)
        })
    }
  }
}
</script>
