import Vue from 'vue'
import Vuex from 'vuex';
// import mutations from './mutation/mutations'
// import * as actions from './action/action'
// import * as getters from './getter/getters'
import {cookie} from '../utils/cookie'

Vue.use(Vuex)

//存储数据
const state = {
  count : 1,
  num:10086,
  accessKey: cookie.getCookie('accessKey')||'',
  bool:false
}

const SOME_MUTATION = 'some_mutation'

const mutations = {
  [SOME_MUTATION](state){
    state.count++
  },
  increment(state,){  
    state.count += 2;  
}, 
}
const actions = {
  actionA({ dispatch, commit }) {  
    return commit('add');  
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