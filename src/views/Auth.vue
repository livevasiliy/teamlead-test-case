<template>
    <div id="auth" class="hero is-fullheight is-light">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <AuthForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import AuthForm from '@/components/Auth/AuthForm'
  export default {
    name: 'Auth',
    components: { AuthForm },
  }
</script>

<style scoped>
    #auth {
        display: flex;
        margin-top: auto;
    }
</style>
