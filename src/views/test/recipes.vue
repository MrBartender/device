<template>
  <div class="recipes">
    <recipe-view :recipe="selected" class="full-width"></recipe-view>
    <select v-model="selected">
      <option v-for="recipe in recipes" :key="recipe[name]" :value="recipe">
          {{ recipe[name] }}
      </option>
    </select>
  </div>
</template>

<script>
import { recipes, name, first } from '@/data/recipes.js'
import recipeView from '@/components/recipe.vue'

export default {
  name: 'recipes-test',
  data () {
    return { recipes, selected: recipes[first], name, first }
  },
  components: { recipeView }
}
</script>

<style lang="scss">
.full-width {
  width: 100vw;
  margin-bottom: 20px;
}
.recipes {
  margin: 10px
}
</style>

