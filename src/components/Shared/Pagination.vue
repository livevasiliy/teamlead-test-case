<template>
  <b-pagination
          :total="total"
          v-model="currentPage"
          :range-before="rangeBefore"
          :range-after="rangeAfter"
          :order="order"
          :size="size"
          :simple="isSimple"
          :rounded="isRounded"
          :per-page="perPage"
          :icon-prev="prevIcon"
          :icon-next="nextIcon"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          @change="changeHandle($event)"
  />
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      total: {
        required: true,
        type: Number,
      },
      rangeBefore: {
        required: true,
        type: Number,
      },
      rangeAfter: {
        required: true,
        type: Number,
      },
      perPage: {
        type: Number,
        required: true,
      },
      current: {
        type: Number,
        required: true,
      },
      prevIcon: {
        type: String,
        required: true,
      },
      nextIcon: {
        type: String,
        required: true,
      },
      order: {
        type: String,
        required: false,
        default: '',
      },
      size: {
        type: String,
        required: false,
        default: '',
      },
      isSimple: {
        type: Boolean,
        required: false,
        default: false,
      },
      isRounded: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    methods: {
      changeHandle (e) {
        this.$store.dispatch('fetchPosts', e)
      },
    },
    data: function () {
      return {
        currentPage: this.current,
      }
    },
  }
</script>

<style scoped>

</style>
