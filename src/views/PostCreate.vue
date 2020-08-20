<template>
  <div>
    <Navbar />
    <PostCreateForm />
  </div>
</template>

<script>
import Navbar from '@/components/Shared/Navbar'
import PostCreateForm from '@/components/Posts/PostCreateForm'
export default {
  name: 'PostCreate',
  components: {
    PostCreateForm,
    Navbar,
  }
}
</script>

<style scoped>
</style>
