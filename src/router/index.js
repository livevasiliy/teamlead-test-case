import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Auth.vue'),
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/Posts.vue'),
  },
  {
    path: '/posts/:id',
    name: 'postShow',
    props: true,
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue'),
  },
  {
    path: '/posts/create',
    name: 'postCreate',
    props: true,
    component: () => import(/* webpackChunkName: "post-create" */ '../views/PostCreate.vue'),
    meta: {
      title: 'Страница создания'
    }
  },
  {
    path: '/posts/:id/edit',
    name: 'postEdit',
    props: true,
    component: () => import(/* webpackChunkName: "post-edit" */ '../views/PostEdit.vue'),
    meta: {
      title: 'Страница редактирования'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
