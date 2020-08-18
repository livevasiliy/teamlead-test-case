<template>
  <div>
    <Navbar />
    <div class="container">
        Главная
      <router-link to="/posts">Go posts</router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Shared/Navbar'
export default {
  name: 'Home',
  components: {
    Navbar,
  },
}
</script>

<style scoped>
</style>
