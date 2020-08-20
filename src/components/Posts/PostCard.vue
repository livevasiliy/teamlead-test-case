<template>
    <div class="card column is-mobile is-multiline is-centered my-5">
        <div class="card-content">
            <router-link
                    :to="`/posts/${+post.id}`"
                    tag="h2"
                    exact
                    class="title"
            >
                {{ post.title }}
            </router-link>
            <div class="content">
                {{ post.description }}
            </div>
            <span class="card-time mt-5">{{ new Date(post.createdAt).toLocaleDateString() }}</span>
            <button
                    class="button is-light is-pulled-right"
                    v-if="isReader"
                    @click.prevent="makeClaps(post.id)"
            >
                <i class="icon fas fa-sign-language has-text-info"></i>
                <span class="px-2">{{ post.claps }}</span>
            </button>
            <div class="buttons is-pulled-right" v-if="isWriter">
                <router-link
                        :to="`/posts/${+post.id}/edit`"
                        exact
                        tag="button"
                        class="button is-light"
                >
                    <i class="icon fas fa-edit has-text-info"></i>
                    <span class="px-2">Изменить</span>
                </router-link>
                <button
                        class="button is-light"
                        @click.prevent="deletePost(post.id)"
                >
                    <i class="icon fas fa-trash-alt has-text-info"></i>
                    <span class="px-2">Удалить</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'PostCard',
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
    methods: {
      ...mapActions(['deletePost']),
      makeClaps(postId) {
        this.$store.dispatch('makeClaps', postId)
      }
    },
    computed: {
      isReader () {
        return this.$store.getters.isReader
      },
      isWriter () {
        return this.$store.getters.isWriter
      },
    },
  }
</script>

<style lang="scss">
    .title {
        font-weight: 400;
        &:hover {
            color: hsl(204, 86%, 53%);
            cursor: pointer;
        }
    }
</style>
