<template>
  <div>
    <Navbar />
    <div class="hero is-fullheight is-light">
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="columns is-centered">
            <PostCreateForm />
          </div>
        </div>
      </div>
    </div>
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
