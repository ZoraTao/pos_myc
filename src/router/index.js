import Vue from 'vue'
import Router from 'vue-router'
import LayoutTop from '@/components/LayoutTop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LayoutTop',
      component: LayoutTop
    }
  ]
})
