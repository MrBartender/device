<template>
  <button v-touch:start="startPump" v-touch:end="stopPump">{{ number }}</button>
</template>

<script>

import { pumps } from '@/data/pumps'

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
          console.log('Start on ' + this.number + ', response: ' + JSON.stringify(response))
        })
    },
    stopPump() {
      this._postAction('/stopPump', this.number)
        .then((response) => {
          console.log('Stop on ' + this.number + ', response: ' + JSON.stringify(response))
        })
    }
  }
}
</script>
