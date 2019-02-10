import vue from 'vue'
import vueRouter from 'vue-router'

// Get views
import test from './views/test/layout.vue'
import pumps from './views/test/pumps.vue'
import recipes from './views/test/recipes.vue'
import ingredients from './views/test/ingredients.vue'
// import Connect from './views/connect'

// Init Plugin
vue.use(vueRouter)

// Setup Router
const router = new vueRouter({
  routes: [
    { 
      path: '/test',
      component: test,
      children: [
        { path: 'pumps', component: pumps },
        { path: 'recipes', component: recipes },
        { path: 'ingredients', component: ingredients }
      ]
    },
    // { path: '/connect', component: Connect }
  ]
})

export default router
