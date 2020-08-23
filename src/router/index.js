import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Auth.vue'),
  },
  {
    path: '/',
    name: 'posts',
    component: () => import(/* webpackChunkName: "posts" */ '../views/Posts.vue'),
  },
  {
    path: '/create',
    name: 'postCreate',
    props: true,
    component: () => import(/* webpackChunkName: "post-create" */ '../views/PostCreate.vue'),
  },
  {
    path: '/:id',
    name: 'postShow',
    props: true,
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue'),
  },
  {
    path: '/:id/edit',
    name: 'postEdit',
    props: true,
    component: () => import(/* webpackChunkName: "post-edit" */ '../views/PostEdit.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
