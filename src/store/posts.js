import axios from 'axios'

export default {
  state: {
    posts: JSON.parse(localStorage.getItem('posts')) || [],
    totalPages: null
  },
  mutations: {
    addPost (state, payload) {
      state.posts.push(payload)
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
    makeClaps (state, payload) {
      state.posts = payload
    },
    setTotalPages (state, payload) {
      state.totalPages = payload
    },
  },
  actions: {
    async addPost ({ commit }, payload) {
      await axios
      .post('/posts', payload)
      .then((response) => {
        commit('addPost', response.data)
        commit('setMessage', {
          type: 'success',
          text: 'Статья успешно добавились',
        })
      }).catch((error) => {
        commit('setMessage', {
          type: 'danger',
          text: 'Что-то пошло не так',
        })
        throw error
      })
    },
    async updatePost ({ commit }, payload) {
      await axios
      .patch(`/posts/${payload.id}`, {
        ...payload
      })
      .then(() => {
        commit('setMessage', {
          type: 'success',
          text: 'Статья успешно обновилась',
        })
      .catch(() => {
          commit('setMessage', {
            type: 'danger',
            text: 'Произошла ошибка при обновление',
          })
        })
      })
      await axios
      .get('/posts').then((response) => {
        localStorage.setItem('posts', JSON.stringify(response.data))
        commit('updatePost', response.data)
      })
    },
    async deletePost ({ commit, getters }, payload) {
      await axios
      .delete(`/posts/${payload}`)
      .then(() => {
        const posts = getters.posts.filter(p => p.id !== payload)
        commit('deletePost', posts)
        commit('setMessage', {
          type: 'success',
          text: 'Статья успешно удалилась',
        })
      })
      .catch(() => {
        commit('setMessage', {
          type: 'danger',
          text: 'Произошла ошибка при удаление',
        })
      })
    },
    async fetchPosts ({ commit }, payload) {
      await axios
      .get(`/posts?_page=${payload}&_limit=10&_sort=id&_order=asc`)
      .then((response) => {
          const totalPages = response.headers['x-total-count']
          localStorage.setItem('posts', JSON.stringify(response.data))
          commit('fetchPosts', response.data)
          commit('setTotalPages', totalPages)
        })
    },
    async makeClaps ({ commit, getters }, payload) {
      let post = getters.post(payload)
      await axios
      .patch(`/posts/${post.id}`, {
        'claps': post.claps + 1,
      })
      .then(response => response.data)
      .catch((error) => {
        throw error
      })
      await axios
      .get(`/posts?_page=1&_limit=10&_sort=id&_order=asc`)
      .then((response) => {
        localStorage.setItem('posts', JSON.stringify(response.data))
        commit('makeClaps', response.data)
      })
    },
  },
  getters: {
    posts: s => s.posts,
    post: s => id => s.posts.find(p => p.id === id),
    totalPages: s => +s.totalPages,
  }
}
