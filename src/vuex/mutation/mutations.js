import * as types from "../mutation-types";

const mutations = {
  add (state, n) {
    state.count -= n
  },
  increment (state) {
    // mutate state
    state.count++
  },
  // 方法
  [types.SET_MSGTIP]( state, msgObj ) {
      // console.log(msgObj)
      state.text = msgObj.text || 'tips'
      state.type = msgObj.type || 'error'
  },
  // BOOL显示
  [types.SET_BOOL_TRUE](state){
      state.bool=true
  },
  // BOOL隐藏
  [types.SET_BOOL_FALSE](state){
      state.bool=false
  }
}

export default {mutations}