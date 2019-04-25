import vue from 'vue'
import vueRouter from 'vue-router'

// Get views
import test from './views/test/layout.vue'
import pumps from './views/test/pumps.vue'
import recipes from './views/test/recipes.vue'
import pour from './views/test/pour.vue'
import listener from './views/test/listener.vue'
import progress from './views/test/progress.vue'
import Connect from './views/connect'

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
        { path: 'listener', component: listener },
        { path: 'pour', name: 'pour', component: pour, props: true },
        { path: 'progress', name: 'progress', component: progress, props: true },
      ]
    },
    { path: '/connect', component: Connect }
  ]
})

export default router
