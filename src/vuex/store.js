import Vue from 'vue'
import Vuex from 'vuex';
import * as types from './mutation-types'
import * as actions from './action/action'
import {cookie} from '../utils/cookie'

Vue.use(Vuex)

//存储数据
const state = {
  user:{
    token: localStorage.getItem('token')||'',//用户秘钥token
    LoginName:localStorage.getItem('name') ||'',//用户名
    orgName:localStorage.getItem('orgName') ||'',//店名
  },
  bool:false,
}

const mutations = {
  [types.LOGIN_LOCAL_STORAGE](state,datas){//更新用户token
    state.token = datas.token;
    state.LoginName = datas.LoginName;
    state.orgName = datas.orgName;
    localStorage.setItem('orgName',datas.orgName);//存储用户token
    localStorage.setItem('token',datas.token);//存储用户token
    localStorage.setItem('name',datas.trueName);//存储用户名字
  },
  [types.CLEAR_LOCAL_STORAGE](state){//退出清除
    state.token = '';
    state.LoginName = '';
    state.orgName = '';
    localStorage.removeItem('orgName');//存储用户token
    localStorage.removeItem('token');//存储用户token
    localStorage.removeItem('name');//存储用户名字
  }
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