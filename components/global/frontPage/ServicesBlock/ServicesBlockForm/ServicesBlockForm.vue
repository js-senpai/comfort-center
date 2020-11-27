<template>
    <div class="service-section__form"  >
        <div class="container service-section__form-container border-dec">
            <h3 class="service-section__form-title">{{ titleForm }}</h3>
            <div  class="service-section__form-block">
                <div class="service-section__form-item">
                    <label class="contact-form__file service-section__form-file" :class="{done: file !== null}">
                        <input type="file"   ref="file" @change="getFile" class="contact-form__file-input service-section__form-file-input">
                        <span class="contact-form__file-input-text service-section__form-file-input-text">Прикрепить проект смету</span>
                    </label>
                    <div class="contact-form__file-done" v-show="file !== null">Файл успешно загружен</div>
                </div>
                <div class="service-section__form-item">
                    <button type="button" @click="sendForm" class="contact-form__submit">Отправить</button>
                </div>
            </div>
            <span class="contact-form__error service-section__form-error" v-show="error">Необходимо прикрепить файл</span>
        </div>
    </div>
</template>
<style lang="sass">
    @import "sass/servicesBlockForm"
</style>
<script>
    import { mapMutations } from 'vuex'
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
            getFile(event){
                this.file = this.$refs.file.files[0]
                console.log(this.file)
            },
            ...mapMutations({
              TOGGLE_MODAL: 'service/TOGGLE_MODAL'
            }),
            /* Отправка формы */
            async sendForm(){
                if(this.file !== null){
                  this.error = false
                  this.TOGGLE_MODAL({file:this.file,id: this.id,title:this.title,enable: true})
                  this.file = null
                  this.$refs.file.value = null
                } else {
                  this.error = true
                }
            },
        }
    }
</script>