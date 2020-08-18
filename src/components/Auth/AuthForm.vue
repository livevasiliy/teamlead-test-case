<template>
    <div class="column is-6 box">
        <form>
            <b-field label="Email"
                     :type="emailErrors.length > 0 ? 'is-danger' : ''"
                     :message="emailErrors"
            >
                <b-input placeholder="Email"
                         type="email"
                         icon-pack="fas"
                         icon="envelope"
                         v-model.trim="email"
                         @input="$v.email.$touch()"
                         @blur="$v.email.$touch()"
                         required
                >
                </b-input>
            </b-field>

            <b-field label="Пароль"
                     :type="passwordErrors.length > 0 ? 'is-danger' : ''"
                     :message="passwordErrors"
            >
                <b-input placeholder="Password"
                         type="password"
                         icon-pack="fas"
                         icon="lock"
                         maxlength="10"
                         v-model.trim="password"
                         @input="$v.password.$touch()"
                         @blur="$v.password.$touch()"
                         required
                >
                </b-input>
            </b-field>

            <div class="field is-grouped is-pulled-right">
                <div class="control">
                    <button
                            class="button is-info"
                            type="submit"
                            @click.prevent="submit"
                    >Войти</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
  export default {
    name: 'AuthForm',
    mixins: [validationMixin],
    validations: {
      email: { required, email },
      password: { required, minLength: minLength(6), maxLength: maxLength(10) },
    },
    data: () => ({
      email: '',
      password: '',
    }),
    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.required && errors.push('Email обязателен')
        !this.$v.email.email && errors.push('Email должен быть валидным')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Пароль должен быть не менее чем 6 символов')
        !this.$v.password.maxLength && errors.push('Пароль не должен превышать чем 10 символов')
        !this.$v.password.required && errors.push('Пароль обязателен.')
        return errors
      }
    },
    methods: {
      async submit () {
        this.$v.$touch()
        const user = await this.getUserByAuthCredentials(this.$v.email.$model)
        console.log(user)
        if (user.length > 0) {
          if (user[0].password === this.$v.password.$model) {
            await this.$store.dispatch('login', user[0])
            await this.$router.push('/')
          } else {
            await this.$store.dispatch('setError', 'Не правильный email или пароль')
          }
        }
        if (user.length === 0) {
          await this.$store.dispatch('setError', 'Пользователь с таким email не найден')
        }
      },
      async getUserByAuthCredentials (email) {
        return await this.$http.get(`/users?login=${email}`).
          then((response) => {
            return response.data
          }).
          catch((error) => {
            return error.response.data
          })
      },
    }
  }
</script>

<style scoped>

</style>
