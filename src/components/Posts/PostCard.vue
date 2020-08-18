<template>
    <div class="card column is-mobile is-multiline is-centered my-5">
        <div class="card-content">
            <h2 class="title">{{ post.title }}</h2>

            <div class="content">
               {{ post.description }}
            </div>
            <span class="card-time mt-5">{{ new Date(post.createdAt).toLocaleDateString() }}</span>
            <button class="button is-info is-pulled-right" v-if="isReader">
                <i class="icon fas fa-sign-language"></i>
                <span class="px-2">{{ post.claps }}</span>
            </button>
            <div class="buttons is-pulled-right" v-if="isWriter">
            <router-link
                    :to="`/posts/${+post.id}/edit`"
                    exact
                    tag="button"
                    class="button is-info"
            >
                <i class="icon fas fa-edit"></i>
                <span class="px-2">Изменить</span>
            </router-link>
            <button class="button is-info">
                <i class="icon fas fa-trash-alt"></i>
                <span class="px-2">Удалить</span>
            </button>
            </div>
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
    },
    computed: {
      isReader() {
        return this.$store.getters.isReader
      },
      isWriter() {
        return this.$store.getters.isWriter
      }
    }
  }
</script>

<style scoped>
    .title {
        font-weight: 400;
    }
</style>
