<template>
    <div class="card column is-mobile is-multiline is-centered my-5">
        <div class="card-content">
            <h2 class="title">{{ post.title }}</h2>

            <div class="content">
               {{ post.description }}
            </div>
            <span class="card-time mt-5">{{ new Date(post.createdAt).toLocaleDateString() }}</span>
            <button class="button is-info is-pulled-right">
                <i class="icon fas fa-sign-language"></i>
                <span class="px-2">{{ post.claps }}</span>
            </button>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'PostCard',
    props: {
      post: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
    .title {
        font-weight: 400;
    }
</style>
