<template>
  <div>
    <Navbar />
    <div class="hero is-fullheight is-light">
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="columns is-centered">
            <PostEditForm />
          </div>
        </div>
      </div>
    </div>
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
