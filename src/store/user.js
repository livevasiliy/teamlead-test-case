export default {
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    login (state, payload) {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    },
    logout (state) {
      state.user = null
      localStorage.removeItem('user')
    },
  },
  actions: {
    login ({ commit }, payload) {
      commit('login', payload)
    },
    logout ({ commit }) {
      commit('logout')
    },
  },
  getters: {
    user: s => s.user,
    isReader: s => !!s.user && s.user.role === 'reader',
    isWriter: s => !!s.user && s.user.role === 'writer',
    isAuthorization: s => !!s.user,
  }
}
