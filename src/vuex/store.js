import Vue from 'vue'
import Vuex from 'vuex';
// import mutations from './mutation/mutations'
// import * as actions from './action/action'
// import * as getters from './getter/getters'
import * as types from './mutation-types'
import {cookie} from '../utils/cookie'

Vue.use(Vuex)

//存储数据
const state = {
  count : 1,
  num:10086,
  accessKey: cookie.getCookie('accessKey')||'',
  bool:false
}


const mutations = {
  [types.CHANGE_STATE](state){
    state.count++
  },
  add(state){
    state.num +=1;
  },
  increment(state){  
    state.num += 2;  
}, 
}
const actions = {
  increment (context) {
    context.commit('increment')
  },
  incrementA ({ commit , state } , products ) {
    commit([types.CHANGE_STATE])
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