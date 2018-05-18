import Vue from 'vue'
import Vuex from 'vuex';
import * as types from './mutation-types'
import * as actions from './action/action'
import { cookie } from '../utils/cookie'
Vue.use(Vuex)

//存储数据
const state = {
    user: '',
    // ,{
        // token: '', //用户秘钥token
        // trueName: '', //用户名
        // orgName: '', //公司名
        // telphone: '', //手机号
        // orgId: '', //门店id
        // orgType: '', //门店类型 1商户 4店铺 6代运营
        // sex: '', //性别
        // timestamp: '', //时间戳
        // userId: '', //用户id
        // userName: '', //用户名
        // roleId: '', //角色
        // headPicpath: '', //头像路径
        // birthday: '', //出生日期
        // email: '', //邮箱
    // },,
    bool: false,
}
const mutations = {
    [types.LOGIN_LOCAL_STORAGE](state, datas) { //更新用户token
        state.user = datas;
        localStorage.setItem("userData", JSON.stringify(datas));
        // localStorage.setItem('token', datas.token); //存储用户token
        // localStorage.setItem('name', datas.trueName); //存储用户名字
    },
    [types.LOGIN_GET](state){
        state.user = JSON.parse(localStorage.getItem("userData"));
    },
    [types.CLEAR_LOCAL_STORAGE](state) { //退出清除
        state.user = '';
        // localStorage.removeItem('orgName'); //存储用户token
        // localStorage.removeItem('token'); //存储用户token
        // localStorage.removeItem('name'); //存储用户名字
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