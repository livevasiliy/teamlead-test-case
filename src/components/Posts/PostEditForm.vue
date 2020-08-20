<template>
    <div>
        <MessageBox />
        <section class="hero is-light is-fullwidth">
            <div class="hero-body">
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
                        >
                            <span>Обновить</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { maxLength, minLength, required } from 'vuelidate/lib/validators'
  import { mapActions, mapGetters } from 'vuex'
  import MessageBox from '@/components/Shared/MessageBox'
  import dayjs from 'dayjs'

  export default {
    name: 'PostEditForm',
    mixins: [validationMixin],
    components: {
      MessageBox
    },
    validations: {
      post: {
        title: { required, minLength: minLength(10), maxLength: maxLength(120) },
        description: { required },
      },
    },
    data: () => ({
      post: {}
    }),
    mounted () {
      this.post = this.$store.getters.post(+this.$route.params.id)
    },
    computed: {
      ...mapGetters(['message']),
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
      ...mapActions(['updatePost', 'clearMessage']),
      async submit () {
        this.$v.$touch()

        const post = {
          id: this.post.id,
          title: this.$v.post.title.$model,
          description: this.$v.post.description.$model,
          claps: this.post.claps,
          createdAt: this.post.createdAt,
          updateAt: dayjs().format(),
          userId: this.$store.getters.user.id
        }
        await this.$store.dispatch('updatePost', post)
      },
    },
  }
</script>

<style scoped>

</style>
