// mutations.js
import * as types from './mutation-types' // <---- 引入类型常量

const mutations = {
	[types.SET_LOGINSTATUS] (state, loginStatus) {
		state.loginStatus = loginStatus
  },
  [types.SET_USERINFO] (state, userInfo) {
		state.userInfo = userInfo
  }

}
export default mutations
