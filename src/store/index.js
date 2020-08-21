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
    message: {
      type: '',
      text: '',
    },
  },
  mutations: {
    addPost (state, payload) {
      state.posts.concat(payload)
    },
    updatePost (state, payload) {
      state.posts = payload
    },
    deletePost (state, payload) {
      state.posts = payload
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
    addPost ({ commit }, payload) {
      axios.post('/posts', payload).then((response) => {
        commit('addPost', response.data)
        commit('setMessage', {
          type: 'success',
          text: 'Статья успешно добавились',
        })
      }).catch(() => {
        commit('setMessage', {
          type: 'error',
          text: 'Что-то пошло не так',
        })
      })
    },
    updatePost ({ commit }, payload) {
      axios.patch(`/posts/${payload.id}`, {
        ...payload
      }).then(() => {
        commit('setMessage', {
          type: 'success',
          text: 'Статья успешно обновилась',
        })
      })

      axios.get('/posts').then((response) => {
        localStorage.setItem('posts', JSON.stringify(response.data))
        commit('updatePost', response.data)

      })
    },
    deletePost ({ commit }, payload) {
      axios.delete(`/posts/${payload}`).then(() => {
        const posts = this.state.posts.filter(p => p.id !== payload)
        commit('deletePost', posts)
        commit('setMessage', {
          type: 'success',
          text: 'Статья успешно удалилась',
        })
      }).catch(() => {
        commit('setMessage', {
          type: 'danger',
          text: 'Произошла ошибка при удаление',
        })
      })
    },
    fetchPosts ({ commit }) {
      axios.get('/posts?_page=1&_limit=10&_sort=id&_order=asc').
        then((response) => {
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
    makeClaps ({ commit }, payload) {
      let post = this.getters.post(payload)
      axios.patch(`/posts/${post.id}`, {
        'claps': post.claps + 1,
      }).then(response => response.data)

      axios.get('/posts').then((response) => {
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
    setMessage ({ commit }, payload) {
      commit('setMessage', payload)
    },
    clearMessage ({ commit }) {
      commit('clearMessage')
    },
  },
  getters: {
    posts: s => s.posts,
    post: s => id => s.posts.find(p => p.id === id),
    user: s => s.user,
    isReader: s => !!s.user && s.user.role === 'reader',
    isWriter: s => !!s.user && s.user.role === 'writer',
    isAuthorization: s => !!s.user,
    message: s => s.message,
    paginateInfo: s => s.paginateInfo,
  },
  modules: {},
})
