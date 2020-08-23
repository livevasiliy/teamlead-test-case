<template>
  <div>
    <Navbar/>
    <div class="container">
      <div class="columns mx-3" v-if="posts.length > 0">
        <MessageBox/>
        <PostCard
                v-for="post of posts"
                :key="post.id"
                :post="post"
        />
        <Pagination
                :total=totalPages
                :rangeBefore="3"
                :rangeAfter="4"
                :perPage="10"
                :current="1"
                prevIcon="arrow-left"
                nextIcon="arrow-right"
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
  import { mapGetters } from 'vuex'
  import Navbar from '@/components/Shared/Navbar'
  import PostCard from '@/components/Posts/PostCard'
  import MessageBox from '@/components/Shared/MessageBox'
  import Pagination from '@/components/Shared/Pagination'

  export default {
    name: 'Posts',
    components: {
      Navbar,
      MessageBox,
      Pagination,
      PostCard,
    },
    data: () => ({
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 1,
      order: '',
      size: '',
      isSimple: false,
      isRounded: false,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
    }),
    computed: {
      ...mapGetters(['posts', 'totalPages']),
    },
  }
</script>

<style scoped>
  .columns {
    flex-direction: column;
  }
</style>
