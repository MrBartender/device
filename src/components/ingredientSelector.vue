<template>
  <div>
    <h2>{{ id_of(pump) }}</h2>
    <select v-model="assigned_ingredient">
      <option v-for="ingredient in ingredients" :key="name_of(ingredient)" :value="ingredient">
          {{ name_of(ingredient) }}
      </option>
    </select>
  </div>
</template>

<script>
import { ingredients, ingredient_assigned_to_pump, name_of } from '@/data/ingredients'
import { id_of } from '@/data/pumps'

export default {
  name: 'ingredient-selector',
  props: [ 'pump', 'initial_assignment' ],
  data: () => ({
    ingredients, 
    pump: this.pump, 
    assigned_ingredient: this.initial_assignment
  }),
  methods: { id_of, name_of },
  watch: {
    assigned_ingredient (ingredient_to_assign, old_assignment) {
      fetch('/assign_pump/' + this.id_of(this.pump)
        + '/to_ingredient/' + this.name_of(this.assigned_ingredient), {
          method: 'post',
          body: JSON.stringify({
            
          })
        }).then((t) => t)
    }
  }
}
</script>