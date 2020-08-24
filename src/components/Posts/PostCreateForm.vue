<template>
  <div>
    <MessageBox/>
    <section class="hero is-light is-fullwidth">
      <div class="hero-body">
        <router-link tag="button" to="/" exact class="button is-info has-text-white">
          <i class="icon fas fa-arrow-left has-text-white"></i>
          <span>Назад к постам</span>
        </router-link>
        <div class="container">
          <div class="title">
            <b-field
                    label="Заголовок"
                    :type="titleErrors.length > 0 ? 'is-danger' : ''"
                    :message="titleErrors"
            >
              <b-input
                      placeholder="Введите заголовок, например, Как я круто провёл своё лето"
                      type="text"
                      v-model.trim="post.title"
                      @input="$v.post.title.$touch()"
                      @blur="$v.post.title.$touch()"
                      maxlength="120"
                      required
              ></b-input>
            </b-field>
          </div>
        </div>
      </div>
    </section>
    <div class="hero-body is-fullheight">
      <div class="container">
        <p class="subtitle">
          <b-field
                  label="Описание"
                  :type="descriptionErrors.length > 0 ? 'is-danger' : ''"
                  :message="descriptionErrors"
          >
            <b-input
                    type="textarea"
                    placeholder="Начните свой первые строки своей истории"
                    v-model.trim="post.description"
                    @input="$v.post.description.$touch()"
                    @blur="$v.post.description.$touch()"
            ></b-input>
          </b-field>
        </p>
        <div class="field is-grouped is-pulled-right">
          <div class="control">
            <button
                    class="button is-success"
                    type="submit"
                    @click.prevent="submit"
                    :disabled="$v.$invalid"
            >
              <span>Создать</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { maxLength, minLength, required } from 'vuelidate/lib/validators'
  import dayjs from 'dayjs'
  import MessageBox from '../Shared/MessageBox'

  export default {
    name: 'PostCreateForm',
    components: { MessageBox },
    mixins: [validationMixin],
    validations: {
      post: {
        title: { required, minLength: minLength(10), maxLength: maxLength(120) },
        description: { required },
      },
    },
    data: () => ({
      id: null,
      post: {
        id: '',
        title: '',
        description: '',
        claps: null,
        createdAt: '',
        updateAt: '',
        userId: null,
      },
    }),
    computed: {      
      message () {
        return this.$store.getters.message
      },
      titleErrors () {
        const errors = []
        if (!this.$v.post.title.$dirty) return errors
        !this.$v.post.title.required && errors.push('Заголовок обязателен')
        !this.$v.post.title.minLength && errors.push('Заголовок должен быть не менее чем 10 символов')
        !this.$v.post.title.maxLength && errors.push('Заголовок не должен превышать чем 120 символов')
        return errors
      },
      descriptionErrors () {
        const errors = []
        if (!this.$v.post.description.$dirty) return errors
        !this.$v.post.description.required && errors.push('Описание обязателен.')
        return errors
      },
    },
    methods: {
      ...mapActions(['addPost']),
      async submit () {
        this.$v.$touch()

        const post = {
          title: this.$v.post.title.$model,
          description: this.$v.post.description.$model,
          claps: 0,
          createdAt: dayjs().format(),
          updateAt: null,
          userId: this.$store.getters.user.id,
        }
        await this.$store.dispatch('addPost', post)
        setTimeout(() => {
          this.$store.dispatch('clearMessage')
          this.$router.push('/posts')
        }, 2000)
      },
    },
  }
</script>

<style scoped>

</style>
