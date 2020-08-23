import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import posts from './posts'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    posts,
    user
  },
})
