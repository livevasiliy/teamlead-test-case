<template>
  <b-notification
          v-if="message.type !== ''"
          :type="`is-${message.type}`"
          aria-close-label="Close notification"
          @close="clearMessage"
  >
    {{ message.text }}
  </b-notification>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'MessageBox',
    computed: {
      ...mapGetters(['message']),
    },
    methods: {
      ...mapActions(['clearMessage']),
    },
  }
</script>

<style scoped>

</style>
