import Vue from 'vue'
import Vuex from 'vuex';
import * as types from './mutation-types'
import * as actions from './action/action'
import {cookie} from '../utils/cookie'

Vue.use(Vuex)

//存储数据
const state = {
  // count:10086,
  token: localStorage.getItem('token')||'',//用户秘钥token
  bool:false
}

const mutations = {
  // [types.CHANGE_STATE](state){
  //   state.count++
  // },
  [types.LOGIN_LOCAL_STORAGE](state,datas){//更新用户token
    state.token = datas;
    localStorage.setItem('token',state.token);//存储用户token
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