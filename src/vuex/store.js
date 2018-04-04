import Vue from 'vue'
import Vuex from 'vuex';
import * as types from './mutation-types'
// import mutations from './mutation/mutations'
import * as actions from './action/action'
// import * as getters from './getter/getters'
import {cookie} from '../utils/cookie'

Vue.use(Vuex)

//存储数据
const state = {
  //顶部NAVtop导航
  // item: [
  //   {
  //     text: "首页",
  //     name: "Home",
  //     url: "/base/homeIndex",
  //     isActive: true
  //   }
  // ],
  num:10086,
  accessKey: cookie.getCookie('accessKey')||'',
  bool:false
}

const mutations = {
  [types.CHANGE_STATE](state){
    state.count++
  },
  // [types.PUSH_ITEM](state, dataObj){
  //   state.item.push({
  //       text: data.text,
  //       name: data.name,
  //       url: data.link,
  //       isActive: data.line
  //   })
  // },
  add(state){
    state.num +=1;
  },
  increment(state){  
    state.num += 2;  
}, 
}

const getters ={
  add: (state, getter) => {  
    state.count = getter.add;  
    return state.count;  
  }, 
}
export default new Vuex.Store({
  state,
  mutations,
	actions,
	getters,
  modules: {
  }
})