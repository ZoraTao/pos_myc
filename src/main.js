// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
import VueBus from 'vue-bus'
import store from './vuex/store'
import VueAreaLinkage from 'vue-area-linkage'
// import VueContextMenuComponent from './VueContextMenu.vue'
// const VueContextMenu = {
//   install: function (Vue) {
//     Vue.component('VueContextMenu', VueContextMenuComponent)
//   }
// }
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueBus)
// 地区联动
Vue.use(VueAreaLinkage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // VueContextMenu,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
