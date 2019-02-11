<template>
  <div>
    <div v-for="in_this_iteration of pumps" :key="in_this_iteration">
      <ingredient-selector
        :pump="in_this_iteration"
        :initial_assignment="ingredient_assigned_to_pump(in_this_iteration)"
        class="full-width"></ingredient-selector>
    </div>
  </div>
</template>

<script>
import { pumps, } from '@/data/pumps'
import { ingredients, ingredient_assigned_to_pump } from '@/data/ingredients'
import ingredientSelector from '@/components/ingredientSelector.vue'

export default {
  name: 'ingredients-assignment-test',
  data: () => ({ 
    pumps,
    ingredients
  }),
  methods: { ingredient_assigned_to_pump },
  components: { ingredientSelector }
}
</script>

<style lang="scss">
.full-width {
  width: 100vw;
  margin-bottom: 20px;
}
</style>
