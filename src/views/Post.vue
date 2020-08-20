<template>
    <div>
        <Navbar/>
        <PostDetail :post="post"/>
    </div>
</template>

<script>
  import Navbar from '@/components/Shared/Navbar'
  import PostDetail from '@/components/Posts/PostDetail'

  export default {
    name: 'Post',
    components: {
      Navbar,
      PostDetail,
    },
    data: () => ({
      post: {},
    }),
    async mounted () {
      await this.$http.get(`/posts/${this.$route.params.id}`).then((response) => {
        this.post = response.data
      })
    },
  }
</script>

<style scoped>
    .columns {
        flex-direction: column;
    }
</style>
