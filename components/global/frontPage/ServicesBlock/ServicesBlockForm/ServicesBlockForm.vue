<template>
    <div class="service-section__form"  v-animate.repeat="'fadeInRight'">
        <div class="container service-section__form-container border-dec">
            <h3 class="service-section__form-title">{{ titleForm }}</h3>
            <form  class="service-section__form-block" @submit="sendForm($event)">
                <div class="service-section__form-item">
                    <label class="contact-form__file service-section__form-file" :class="{done: file !== null}">
                        <input type="file"  ref="file" @change="getFile()" class="contact-form__file-input service-section__form-file-input" required>
                        <span class="contact-form__file-input-text service-section__form-file-input-text">Прикрепить проект смету</span>
                    </label>
                    <span class="contact-form__file-done" v-show="file !== null">Файл успешно загружен</span>
                </div>
                <div class="service-section__form-item">
                    <button type="submit" class="contact-form__submit">Отправить</button>
                </div>
            </form>
            <span class="contact-form__error service-section__form-error" v-show="error">{{errorText}}</span>
        </div>
    </div>
</template>
<style lang="sass">
    @import "sass/servicesBlockForm"
</style>
<script>
    import { mapMutations } from 'vuex'
    import { toFormData } from "../../../../../helpers/formHelper"
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
            titleForm: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        },
        data(){
            return {
                file: null,
                errorText: '',
                error: false
            }
        },
        methods: {
            getFile(){
                this.file = this.$refs.file.files[0]
                console.log(this.file)
            },
            /* Отправка формы */
            async sendForm(e){
                e.preventDefault()
                try {
                    const response = await this.$axios.$post(`${process.env.MAIN_URL}178/feedback`,toFormData({title:this.title,yourFile:this.file}))
                    if(response.status !== "mail_sent"){
                        this.errorText = response.message
                        this.error = true
                    } else {
                        this.TOGGLE_MODAL({enable: true, message: response.message})
                        this.error = false
                        this.$gtm.push({ event: this.id })
                    }
                    console.log(response)
                    this.file = null
                } catch (e) {
                    console.log(e)
                    this.error = true
                }
            },
            // Модальное окно подтверждения
            ...mapMutations({
                TOGGLE_MODAL: 'formModal/TOGGLE_MODAL'
            })
        }
    }
</script>