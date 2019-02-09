<template>
  <div>
    <recipe :recipe="selected" class="full-width"></recipe>
    <select v-model="selected">
      <option selected disabled>Choose</option>
      <option v-for="recipe in recipes" :key="recipe[0]" :value="recipe">
          {{ recipe[0] }}
      </option>
    </select>
  </div>
</template>

<script>
import recipes from '@/data/recipes.js'
import recipe from '@/components/recipe.vue'

export default {
  name: 'recipes-test',
  data: () => {
    return { recipes, selected: recipes[1] }
  },
  components: { recipe }
}
</script>

<style lang="scss">
.full-width {
  width: 100vw;
  margin-bottom: 20px;
}
</style>

