import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store';
Vue.use(Router)


const router = new Router({
    routes: [
        // 一级路由跟路由重定向到login
        {
            path: '/',
            redirect: '/login',
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
                children: [{
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
                        component: resolve => require(['../components/Retail/RetailIndex/retail-index.vue'], resolve)
                    },
                    // 商品库存首页
                    {
                        path: 'stocksIndex',
                        name: 'stocks-index',
                        component: resolve => require(['../components/CommodityStocks/stocks-index.vue'], resolve)
                    },
                    //统计报表首页
                    {
                        path: 'statistical',
                        name: 'statistical',
                        component: resolve => require(['../components/Statistical/statistical-index.vue'], resolve)
                    },
                    //文件管理
                    {
                        path: 'fileAdmin',
                        name: 'file-admin',
                        component: resolve => require(['../components/FileAdmin/fileAdmin.vue'], resolve)
                    }
                ]
            }]
        },
        // 三级路由只拥有layout
        {
            path: '/bills',
            component: resolve => require(['../components/Layout/Layout.vue'], resolve),
            children: [{
                    path: 'billing',
                    name: 'billing',
                    component: resolve => require(['../components/Bills/billing/billing.vue'], resolve),
                    // meta: { keepAlive: true }
                }, {
                    path: 'timeoutBill',
                    name: 'timeoutBill',
                    component: resolve => require(['../components/Bills/timeoutBill/timeout-bill.vue'], resolve)
                },
                {
                    path: 'aboutExpireClBill',
                    name: 'about-expireCl-bill',
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
                    component: resolve => require(['../components/Bills/optometryOrder/optometryOrderList/optometry-order-list.vue'], resolve),
                    // meta:{keepAlive:true}
                },
                {
                    path: 'optometryOrderCu/:data',
                    name: 'optometryOrderCu',
                    component: resolve => require(['../components/Bills/optometryOrder/optometryOrderCu/optometry-order-cu.vue'], resolve)
                }
            ]
        },
        // 三级路由只拥有layout
        {
            path: '/cashier',
            component: resolve => require(['../components/Layout/Layout.vue'], resolve),
            children: [{
                    path: 'cashierList',
                    name: 'cashierList',
                    component: resolve => require(['../components/Retail/Cashier/CashierList/cashier-list.vue'], resolve),
                    // meta:{keepAlive:true}
                },
                {
                    path: 'cashierCu',
                    name: 'cashierCu',
                    component: resolve => require(['../components/Retail/Cashier/CashierCu/cashier-cu.vue'], resolve)
                },
                {
                    path: 'orderDetail',
                    name: 'orderDetail',
                    component: resolve => require(['../components/Retail/orderDetail/orderDetail.vue'], resolve)
                }
            ]
        },
        // 三级路由只拥有layout
        {
            path: '/receive',
            component: resolve => require(['../components/Layout/Layout.vue'], resolve),
            children: [{
                    path: 'receiveList',
                    name: 'receiveList',
                    component: resolve => require(['../components/Retail/Receive/ReceiveList/receive-list.vue'], resolve)
                },
                {
                    path: 'receiveModal',
                    name: 'receiveModal',
                    component: resolve => require(['../components/Retail/Receive/ReceiveModal/receive-modal.vue'], resolve)
                }
            ]
        },
        // 三级路由只拥有layout
        {
            path: '/pickup',
            component: resolve => require(['../components/Layout/Layout.vue'], resolve),
            children: [{
                path: 'pickuplist',
                name: 'pickuplist',
                component: resolve => require(['../components/Retail/PickUp/PickUpList/pick-up-list.vue'], resolve)
            }]
        },
        // 三级路由只拥有layout
        {
            path: '/serviceafter',
            component: resolve => require(['../components/Layout/Layout.vue'], resolve),
            children: [{
                path: 'serviceafterlist',
                name: 'serviceafterlist',
                component: resolve => require(['../components/Retail/ServiceAfter/ServiceAfterList/service-after-list.vue'], resolve)
            }]
        },
        // 三级路由:会员管理
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
                    component: resolve => require(['../components/MemberManage/MemberInquiry/member-detail.vue'], resolve),
                    meta:{keepAlive:true}
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
        },
        //统计报表
        {
            path: '/statistical',
            component: resolve => require(['../components/Layout/Layout.vue'], resolve),
            children: [
                //营业日报表
                {
                    path: '/doBusiness',
                    name: 'do-business',
                    component: resolve => require(['../components/Statistical/Business/do-Business.vue'], resolve)
                },
                {
                    path: '/staffSale',
                    name: 'staffSale',
                    component: resolve => require(['../components/Statistical/staffSale/staffSale.vue'], resolve)
                }
            ]
        },
        // 商品库存
        {
            path: '/commodity',
            component: resolve => require(['../components/Layout/Layout.vue'], resolve),
            children: [
                // 库存查询
                {
                    path: 'stocksInquiry',
                    name: 'stocks-inquiry',
                    component: resolve => require(['../components/CommodityStocks/stocks-inquiry/stocks-inquiry'], resolve)
                },
                // 库存盘点
                {
                    path: 'inventory-check',
                    name: 'inventory-check-index',
                    component: resolve => require(['../components/CommodityStocks/inventory-check/inventory-check-index'], resolve)
                },
                // 开始盘点
                {
                    path: 'checkInventory',
                    name: 'check-inventory',
                    component: resolve => require(['../components/CommodityStocks/inventory-check/check-inventory'], resolve)
                },
                // 临时盘点
                {
                    path: 'inventory-temporary',
                    name: 'inventory-check-temporary',
                    component: resolve => require(['../components/CommodityStocks/inventory-temporary/inventory-check-temporary'], resolve)
                },
                // 添加临时盘点单
                {
                    path: 'add-temporary',
                    name: 'add-temporary-inventory',
                    component: resolve => require(['../components/CommodityStocks/inventory-temporary/add-temporary-inventory'], resolve)
                },
                // 调拨单
                {
                    path: 'transfer-order',
                    name: 'transfer-order-index',
                    component: resolve => require(['../components/CommodityStocks/transfer-order/transfer-order-index'], resolve)
                },
                // 新增调拨单
                {
                    path: 'transfer-order-add',
                    name: 'transfer-order-add',
                    component: resolve => require(['../components/CommodityStocks/transfer-order/transfer-order-add'], resolve)
                },
                // 调拨单详情
                {
                    path: 'transfer-order-detail',
                    name: 'transfer-order-detail',
                    component: resolve => require(['../components/CommodityStocks/transfer-order/transfer-order-detail'], resolve)
                },
                // 申调单
                {
                    path: 'application-order',
                    name: 'application-order-index',
                    component: resolve => require(['../components/CommodityStocks/application-order/application-order-index'], resolve)
                }
            ]
        }
    ]
})


// router.afterEach((to, from) => {
//     console.log(store.state)
// })
// 重新刷新页面拦截器
// const reloadInterceptor = (to, from) =>{
//     if(from.name == 'cashierList' && to.name == 'orderDetail'){
//         let isRefresh = sessionStorage.getItem('isRefresh');
//         console.log('isRefresh:'+isRefresh);
//         if(isRefresh == '0'){
//             sessionStorage.setItem('isRefresh',null)
//             window.location.reload();
//         }else {
//             sessionStorage.setItem('isRefresh',0)
//         }
//     }else if(from.name == 'cashierList' && to.name =='orderDetail'){
//         sessionStorage.setItem('isRefresh',0)
//     }
// }
export default router
// router.beforeEach((transition) => {
//   if (transition.to.auth) {
//        //判断是否登录，（可以通过接口，Vuex状态 token）
//        //没有登录走下面逻辑
//        let redirect = encodeURIComponent(transition.to.path);
//        transition.redirect('/logon?redirect=' + redirect);
//        //redirect 作为参数，登录之后跳转回来
//   } else {
//       transition.next();
//   }
// });
