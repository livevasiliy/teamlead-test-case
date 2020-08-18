import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: JSON.parse(localStorage.getItem('posts') || '[]'),
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    error: ''
  },
  mutations: {
    addPost(state, payload) {
      state.posts.concat(payload)
    },
    fetchPosts(state, payload) {
      state.posts = payload
    },
    login(state, payload) {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    },
    logout(state) {
      state.user = {}
      localStorage.removeItem('user')
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = ''
    }
  },
  actions: {
    addPost({commit}, payload) {
      commit('addPost', payload)
    },
    fetchPosts({commit}, payload) {
      commit('fetchPosts', payload)
    },
    login({commit}, payload) {
      commit('login', payload)
    },
    logout({commit}) {
      commit('logout')
    },
    setError({commit}, payload) {
      commit('setError', payload)
    },
    clearError({commit}) {
      commit('clearError')
    }
  },
  getters: {
    posts: s => s.posts,
    post: s => id => s.posts.find(p => p.id === id),
    isAuthorization: s => !!s.user,
    isReader: s => s.user.role === 'reader',
    isWriter: s => s.user.role === 'writer'
  },
  modules: {
  }
})
