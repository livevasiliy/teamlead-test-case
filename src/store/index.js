import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: JSON.parse(localStorage.getItem('posts') || '[]'),
    user: JSON.parse(localStorage.getItem('user') || null),
    paginateInfo: {
      totalPages: '',
      firstPage: '',
      prevPage: '',
      nextPage: '',
    },
    error: '',
  },
  mutations: {
    addPost (state, payload) {
      state.posts.concat(payload)
    },
    fetchPosts (state, payload) {
      state.posts = payload
    },
    setPaginateInfo (state, payload) {
      state.paginateInfo = payload
    },
    makeClaps (state, payload) {
      state.posts = payload
    },
    login (state, payload) {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
    },
    logout (state) {
      state.user = null
      localStorage.removeItem('user')
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = ''
    },
  },
  actions: {
    addPost ({ commit }, payload) {
      commit('addPost', payload)
    },
    fetchPosts ({ commit }) {
      axios
      .get('/posts?_page=1&_limit=10')
      .then((response) => {
        const totalPages = response.headers['x-total-count']
        const links = response.headers.link.split(',')
        const firstPage = links.find(link => link.search('first'))
        const prevPage = links.find(link => link.search('prev'))
        const nextPage = links.find(link => link.search('next'))

        const paginateInfo = {
          totalPages,
          firstPage,
          prevPage,
          nextPage,
        }
        localStorage.setItem('posts', JSON.stringify(response.data))
        commit('fetchPosts', response.data)
        commit('setPaginateInfo', paginateInfo)
      })
    },
    async makeClaps ({ commit }, payload) {
      let post = this.getters.post(payload)
      await axios.patch(`/posts/${post.id}`, {
        'claps': post.claps + 1,
      }).then(response => response.data)

      await axios.get('/posts').then((response) => {
        localStorage.setItem('posts', JSON.stringify(response.data))
        commit('makeClaps', response.data)

      })
    },
    login ({ commit }, payload) {
      commit('login', payload)
    },
    logout ({ commit }) {
      commit('logout')
    },
    setError ({ commit }, payload) {
      commit('setError', payload)
    },
    clearError ({ commit }) {
      commit('clearError')
    },
  },
  getters: {
    posts: s => s.posts,
    post: s => id => s.posts.find(p => p.id === id),
    user: s => s.user,
    isReader: s => !!s.user && s.user.role === 'reader',
    isWriter: s => !!s.user && s.user.role === 'writer',
    isAuthorization: s => !!s.user,
  },
  modules: {},
})
