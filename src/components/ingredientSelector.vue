<template>
  <div>
    <h2>{{ pump.id }}</h2>
    <select v-model="assigned_ingredient">
      <option v-for="ingredient in ingredients" :key="name_of(ingredient)" :value="ingredient">
          {{ name_of(ingredient) }}
      </option>
    </select>
  </div>
</template>

<script>
import { ingredients, name_of } from '@/data/ingredients'

export default {
  name: 'ingredient-selector',
  props: [ 'pump', 'initial_assignment' ],
  data: () => ({
    ingredients,
    pump: this.pump,
    assigned_ingredient: this.initial_assignment
  }),
  methods: { name_of },
  watch: {
    assigned_ingredient (ingredient_to_assign, old_assignment) {
      this.pump.assign_to(this.assigned_ingredient)
      fetch('/assign_pump/' + this.pump.id + '/to_ingredient/' + this.name_of(this.assigned_ingredient), {
          method: 'post',
          body: JSON.stringify({
            pump: this.pump.id,
            ingredient: this.assigned_ingredient.id
          })
        }).then((t) => t)
    }
  }
}
</script>