<template>
    <div class="column is-fullwidth box">
        <form>
            <b-field label="Заголовок"
                     :type="titleErrors.length > 0 ? 'is-danger' : ''"
                     :message="titleErrors"
            >
                <b-input placeholder="Введите заголовок статьи"
                         type="text"
                         v-model.trim="post.title"
                         @input="$v.post.title.$touch()"
                         @blur="$v.post.title.$touch()"
                         required
                >
                </b-input>
            </b-field>

            <b-field label="Текст"
                     :type="descriptionErrors.length > 0 ? 'is-danger' : ''"
                     :message="descriptionErrors"
            >
                <b-input
                        type="textarea"
                        placeholder="Вводите свой текст"
                        v-model.trim="post.description"
                        @input="$v.post.description.$touch()"
                        @blur="$v.post.description.$touch()"
                        required
                ></b-input>
            </b-field>

            <div class="field is-grouped is-pulled-right">
                <div class="control">
                    <button
                            class="button is-info"
                            type="submit"
                            @click.prevent="submit"
                    >
                        <span>Создать</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { maxLength, minLength, required } from 'vuelidate/lib/validators'

  export default {
    name: 'PostForm',
    mixins: [validationMixin],
    validations: {
      post: {
        title: { required, minLength },
        description: { required, minLength: minLength(6), maxLength: maxLength(10) },
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
        userId: null
      }
    }),
    computed: {
      titleErrors () {
        const errors = []
        if (!this.$v.post.title.$dirty) return errors
        !this.$v.post.title.required && errors.push('Заголовок обязателен')
        return errors
      },
      descriptionErrors () {
        const errors = []
        if (!this.$v.post.description.$dirty) return errors
        !this.$v.post.description.required && errors.push('Описание обязателен.')
        return errors
      }
    },
    methods: {
      async submit () {
        this.$v.$touch()
      },
    }
  }
</script>

<style scoped>

</style>
