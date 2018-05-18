import * as types from '../mutation-types'

export const PUSH_ITEM_FN = ({ commit, state }, dataObj) => {
  commit(types.PUSH_ITEM, dataObj)
}

export const increment = (context) => {
  context.commit('increment')
}

// export const incrementA = ({ commit, state }, products) => {
//   commit([types.CHANGE_STATE])
// }