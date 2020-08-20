<template>
    <div>
        <section class="hero is-light is-fullwidth">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{ post.title }}
                    </h1>
                    <h2 class="subtitle">
                        {{ new Date(post.createdAt).toLocaleDateString() }}
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
