import Vue from 'vue'
import Vuex from 'vuex';
import * as types from './mutation-types'
import * as actions from './action/action'
import { cookie } from '../utils/cookie'
Vue.use(Vuex)

//存储数据
const state = {
    user: '',
    bool: false,
}
const mutations = {
    [types.LOGIN_LOCAL_STORAGE](state, datas) { 
        state.user = datas;
        sessionStorage.setItem("userData", JSON.stringify(datas));
    },
    [types.LOGIN_GET](state){
        state.user = JSON.parse(sessionStorage.getItem("userData"));
    },
    [types.CLEAR_LOCAL_STORAGE](state) { //退出清除
        state.user = '';
        sessionStorage.removeItem('userData'); 
        sessionStorage.removeItem('items'); 
    }
}

const getters = {
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
    modules: {}
})