<template>
  <div>
    <section class="hero is-light is-fullwidth">
      <div class="hero-body">
        <router-link tag="button" to="/" exact class="button is-info has-text-white">
          <i class="icon fas fa-arrow-left has-text-white"></i>
          <span>Назад к постам</span>
        </router-link>
        <div class="container">
          <h1 class="title">
            {{ post.title }}
          </h1>
          <h2 class="subtitle" v-date-ago>
            {{ post.createdAt }}
          </h2>
        </div>
      </div>
    </section>
    <div class="hero-body is-fullheight">
      <div class="container">
        <p class="subtitle">
          {{ post.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PostDetail',
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style scoped>

</style>
