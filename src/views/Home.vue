<template>
  <div>
    <Navbar />
    <div class="container">
        <div class="columns mx-3" v-if="posts.length > 0">
            <PostCard
                    v-for="post of posts"
                    :key="post.id"
                    :post="post"
            />
        </div>
        <b-notification
                type="is-info"
                has-icon
                v-else
        >
            Постов пока что нету
        </b-notification>

    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Shared/Navbar'
import PostCard from '@/components/Posts/PostCard'
export default {
  name: 'Home',
  components: {
    Navbar,
    PostCard
  },
  async mounted () {
    await this.$http.get('/posts').then((response) => {
      localStorage.setItem('posts', JSON.stringify(response.data))
      this.$store.dispatch('fetchPosts', response.data)
    })
  },
  computed: {
    posts() {
      return this.$store.getters.posts
    }
  }
}
</script>

<style scoped>
    .columns {
        flex-direction: column;
    }
</style>
