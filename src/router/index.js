import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Login from '@/components/Login'
import MemberIndex from '@/components/MemberManage/MemberIndex/member-index'

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
    },
    //会员管理
    {
      path: '/member/', component: MemberIndex,
      children: [
        //会员首页
        {
          path: 'memberIndex',
          component: MemberIndex
        }
      ]
    }
  ]
})
