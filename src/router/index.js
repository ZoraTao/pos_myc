import Vue from 'vue'
import Router from 'vue-router'
import LayoutTop from '@/components/LayoutTop'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LayoutTop',
      component: LayoutTop
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
