import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Plans from '@/components/Plans'
import About from '@/components/About'
import NewPlan from '@/components/NewPlan'
import ShowPlan from '@/components/ShowPlan'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/plans',
      name: 'Plans',
      component: Plans
    },
    ,
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/newplan',
      name: 'NewPlan',
      component: NewPlan
    },
    {
      path: '/showplan/:id',
      name: 'ShowPlan',
      component: ShowPlan
    },
  ]
})
