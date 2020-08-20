<template>
    <b-navbar type="is-info">
        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons" v-if="!this.isAuthorization">
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
                    <router-link
                            to="/posts/create"
                            exact
                            tag="a"
                            class="button is-dark"
                    >
                        Создать новую запись
                    </router-link>
                    <a class="button is-info" @click.prevent="this.logout()">
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
