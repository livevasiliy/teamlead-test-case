export default {
  state: {
    message: {
      type: '',
      text: '',
    },
  },
  mutations: {
    setMessage (state, payload) {
      state.message = payload
    },
    clearMessage (state) {
      state.message = {
        type: '',
        text: '',
      }
    },
  },
  actions: {
    setMessage ({ commit }, payload) {
      commit('setMessage', payload)
    },
    clearMessage ({ commit }) {
      commit('clearMessage')
    },
  },
  getters: {
    message: s => s.message,
  }
}
