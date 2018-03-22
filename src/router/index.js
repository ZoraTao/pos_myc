import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 一级路由跟路由重定向到login
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['../components/Login.vue'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['../components/Layout/Layout.vue'], resolve),
      // 二级路由拥有layout与layoutcontent
      children: [{
        path: 'base',
        component: resolve => require(['../components/Layout/LayoutContent.vue'], resolve),
        children: [
          { path: 'homeIndex', component: resolve => require(['../components/Home/HomeIndex/home-index.vue'], resolve) },
          { path: 'memberIndex', component: resolve => require(['../components/MemberManage/memberIndex/member-index.vue'], resolve) }
        ]
      }]
    },
    // 三级路由只拥有layout
    {
      path: '/bills',
      component: resolve => require(['../components/Layout/Layout.vue'], resolve),
      children: [{
        path: 'timeoutBill',
        component: resolve => require(['../components/Bills/timeoutBill/timeout-bill.vue'], resolve)
      },
      {
        path: 'aboutExpireClBill',
        component: resolve => require(['../components/Bills/aboutExpireClBill/about-expireCl-bill.vue'], resolve)
      },
      {
        path: 'optometryAppointmentBill',
        component: resolve => require(['../components/Bills/optometryAppointmentBill/optometry-appointment-bill.vue'], resolve)
      },
      {
        path: 'aptitudeDue',
        component: resolve => require(['../components/Bills/aptitudeDue/aptitudeDue.vue'], resolve)
      }]
    },
    // 三级路由只拥有layout
    {
      path: '/member',
      component: resolve => require(['../components/Layout/Layout.vue'], resolve),
      children: [{
        path: 'memberAdd',
        component: resolve => require(['../components/MemberManage/MemberAdd/member-add.vue'], resolve)
      },
      {
        path: 'memberInquiry',
        component: resolve => require(['../components/MemberManage/MemberInquiry/member-inquiry.vue'], resolve)
      },
      {
        path: 'memberDetail',
        component: resolve => require(['../components/MemberManage/MemberInquiry/member-detail.vue'], resolve)
      },
      {
        path: 'memberComplaints',
        component: resolve => require(['../components/MemberManage/MemberComplaints/member-complaints.vue'], resolve)
      },
      {
        path: 'memberReturnVisit',
        component: resolve => require(['../components/MemberManage/MemberReturnVisit/member-return-visit.vue'], resolve)
      },
      {
        path: 'memberRights',
        component: resolve => require(['../components/MemberManage/MemberRights/member-rights.vue'], resolve)
      }
      ]
    }
  ]
})
