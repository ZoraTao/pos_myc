import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import LayoutTop from '@/components/LayoutTop'
import LayoutNav from '@/components/LayoutNav'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
