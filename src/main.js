import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { mapActions } from 'vuex'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.responseType = 'json'
axios.defaults.headers.accept = 'application/json'

Vue.prototype.$http = axios
Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    ...mapActions(['fetchPosts'])
  },
  async mounted() {
    await this.fetchPosts
  }
}).$mount('#app')
