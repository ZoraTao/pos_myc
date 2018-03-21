import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Login from '@/components/Login'
import MemberIndex from '@/components/MemberManage/MemberIndex/member-index'
import MemberAdd from '@/components/MemberManage/MemberAdd/member-add'
import MemberInquiry from '@/components/MemberManage/MemberInquiry/member-inquiry'
import MemberDetail from '@/components/MemberManage/MemberInquiry/member-detail'
import MemberComplaints from '@/components/MemberManage/MemberComplaints/member-complaints'
import MemberReturnVisit from '@/components/MemberManage/MemberReturnVisit/member-return-visit'
import MemberRights from '@/components/MemberManage/MemberRights/member-rights'

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
      path: '/member', component: MemberIndex,
      children: [
        //会员首页
        {
          path: 'memberIndex',
          component: MemberIndex
        },
        //会员查询
        {
          path: 'memberInquiry',
          component: MemberInquiry
        },
        //会员详情
        // {
        //   path: 'memberInquiry/MemberDetail',
        //   component: MemberDetail
        // },
        //新增会员
        {
          path: 'memberAdd',
          component: MemberAdd
        },
        //会员投诉
        {
          path: 'MemberComplaints',
          component: MemberComplaints
        },
        //会员回访
        {
          path: 'MemberReturnVisit',
          component: MemberReturnVisit
        },
        //会员权益
        {
          path: 'MemberRights',
          component: MemberRights
        }
      ]
    }
  ]
})
