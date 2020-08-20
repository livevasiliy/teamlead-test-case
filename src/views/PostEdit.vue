<template>
  <div>
    <Navbar />
    <PostEditForm />
  </div>
</template>

<script>
import Navbar from '@/components/Shared/Navbar'
import PostEditForm from '@/components/Posts/PostEditForm'
export default {
  name: 'PostEdit',
  components: {
    PostEditForm,
    Navbar,
  }
}
</script>

<style scoped>
</style>
