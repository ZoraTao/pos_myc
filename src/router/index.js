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
          {
            path: 'homeIndex',
            name: 'Home',
            component: resolve => require(['../components/Home/HomeIndex/home-index.vue'], resolve)
          },
          {
            path: 'memberIndex',
            name: 'memberIndex',
            component: resolve => require(['../components/MemberManage/memberIndex/member-index.vue'], resolve)
          },
          {
            path: 'retailIndex',
            name: 'retailIndex',
            component: resolve => require(['../components/Retail/RetailIndex/retail-index.vue'], resolve) }
        ]
      }]
    },
    // 三级路由只拥有layout
    {
      path: '/bills',
      component: resolve => require(['../components/Layout/Layout.vue'], resolve),
      children: [{
        path: 'timeoutBill',
        name: 'timeoutBill',
        component: resolve => require(['../components/Bills/timeoutBill/timeout-bill.vue'], resolve)
      },
      {
        path: 'aboutExpireClBill',
        name: 'timeoutBill',
        component: resolve => require(['../components/Bills/aboutExpireClBill/about-expireCl-bill.vue'], resolve)
      },
      {
        path: 'optometryAppointmentBill',
        name: 'optometryAppointmentBill',
        component: resolve => require(['../components/Bills/optometryAppointmentBill/optometry-appointment-bill.vue'], resolve)
      },
      {
        path: 'aptitudeDue',
        name: 'aptitudeDue',
        component: resolve => require(['../components/Bills/aptitudeDue/aptitudeDue.vue'], resolve)
      },
      {
        path: 'optometryOrderList',
        name: 'optometryOrderList',
        component: resolve => require(['../components/Bills/optometryOrder/optometryOrderList/optometry-order-list.vue'], resolve)
      },
      {
        path: 'optometryOrderCu',
        name: 'optometryOrderCu',
        component: resolve => require(['../components/Bills/optometryOrder/optometryOrderCu/optometry-order-cu.vue'], resolve)
      }]
    },
    // 三级路由只拥有layout
    {
      path: '/cashier',
      component: resolve => require(['../components/Layout/Layout.vue'], resolve),
      children: [{
        path: 'cashierList',
        name: 'cashierList',
        component: resolve => require(['../components/Retail/Cashier/CashierList/cashier-list.vue'], resolve)
      }]
    },
    // 三级路由只拥有layout
    {
      path: '/member',
      component: resolve => require(['../components/Layout/Layout.vue'], resolve),
      children: [{
        path: 'memberAdd',
        name: 'member-add',
        component: resolve => require(['../components/MemberManage/MemberAdd/member-add.vue'], resolve)
      },
      {
        path: 'memberInquiry',
        name: 'member-inquiry',
        component: resolve => require(['../components/MemberManage/MemberInquiry/member-inquiry.vue'], resolve)
      },
      {
        path: 'memberDetail',
        name: 'member-detail',
        component: resolve => require(['../components/MemberManage/MemberInquiry/member-detail.vue'], resolve)
      },
      {
        path: 'memberComplaints',
        name: 'member-complaints',
        component: resolve => require(['../components/MemberManage/MemberComplaints/member-complaints.vue'], resolve)
      },
      {
        path: 'memberReturnVisit',
        name: 'member-return-visit',
        component: resolve => require(['../components/MemberManage/MemberReturnVisit/member-return-visit.vue'], resolve)
      },
      {
        path: 'memberRights',
        name: 'member-rights',
        component: resolve => require(['../components/MemberManage/MemberRights/member-rights.vue'], resolve)
      }
      ]
    }
  ]
})
