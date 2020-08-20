<template>
  <div>
    <Navbar />
    <div class="container">
        <div class="columns mx-3" v-if="posts.length > 0">
            <MessageBox />
            <PostCard
                    v-for="post of posts"
                    :key="post.id"
                    :post="post"
            />
            <Pagination
                    :total=+paginateInfo.totalPages
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
import Navbar from '@/components/Shared/Navbar'
import PostCard from '@/components/Posts/PostCard'
import MessageBox from '@/components/Shared/MessageBox'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Shared/Pagination'
export default {
  name: 'Posts',
  components: {
    Navbar,
    MessageBox,
    PostCard,
    Pagination
  },
  computed: {
    ...mapGetters(['posts', 'paginateInfo'])
  }
}
</script>

<style scoped>
    .columns {
        flex-direction: column;
    }
</style>
