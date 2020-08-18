<template>
  <div>
    <Navbar />
    <div class="container">
        <div class="columns mx-3">
            <PostCard :post="post" />
            />
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Shared/Navbar'
import PostCard from '@/components/Posts/PostCard'
export default {
  name: 'Post',
  components: {
    Navbar,
    PostCard
  },
  data: () => ({
    post: {}
  }),
  async mounted () {
    await this.$http
    .get(`/posts/${this.$route.params}`)
    .then((response) => {
      this.post = response.data
    })
  }
}
</script>

<style scoped>
    .columns {
        flex-direction: column;
    }
</style>
