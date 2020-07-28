import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token')
      ? sessionStorage.getItem('token')
      : '',
  },
  mutations: {
    changeLogin(state, user) {
      state.token = user.token
      sessionStorage.setItem('token', user.token)
    },
    deleToken(state) {
      state.token = ''
      sessionStorage.setItem('token', '')
    },
  },
})

export default store
