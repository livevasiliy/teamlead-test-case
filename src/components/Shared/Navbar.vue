<template>
    <b-navbar type="is-info">
        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons" v-if="!isAuthorization">
                    <router-link
                            tag="a"
                            exact
                            to="/login"
                            class="button is-info"
                    >
                        Логин
                    </router-link>
                </div>
                <div class="buttons" v-else>
                    <a class="button is-info" @click.prevent="logout()">
                        Выйти
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
  export default {
    name: 'Navbar',
    computed: {
      isAuthorization() {
        return this.$store.getters.isAuthorization
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style scoped>

</style>
