<template>
    <b-pagination
            class="is-info"
            :total="total"
            v-model="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            aria-next-label="Следующая страница"
            aria-previous-label="Предыдущая страница"
            aria-page-label="Страница"
            aria-current-label="Текущая страница"
            @change="current+1"
    />
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      total: {
        required: true,
        type: Number
      },
      rangeBefore: {
        required: true,
        type: Number
      },
      rangeAfter: {
        required: true,
        type: Number
      },
      perPage: {
        type: Number,
        required: true,
      },
      current: {
        type: Number,
        required: true
      },
      prevIcon: {
        type: String,
        required: true,
      },
      nextIcon: {
        type: String,
        required: true
      },
      order: {
        type: String,
        required: false,
        default: ''
      },
      size: {
        type: String,
        required: false,
        default: ''
      },
      isSimple: {
        type: Boolean,
        required: false,
        default: false
      },
      isRounded: {
        type: Boolean,
        required: false,
        default: false
      },
    }
  }
</script>

<style scoped>

</style>
