<template>
  <div class="full-width">

    <h2>Recipe: {{ name }}</h2>

    <ul>
      <li v-for="[ ingredient, ratio ] in ingredients" :key="ingredient">
        {{ `${ingredient} : ${ratio}` }}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'recipe',
  props: { recipe: Array },
  computed: {
    name() {
      const [ name, ] = this.recipe
      return name
    },
    ingredients() {
      const [ , ...ingredients ] = this.recipe
      return ingredients
    }
  }
}
</script>

<style lang="scss">
.recipes {
  margin: 10px;
}
</style>

