<template>
    <section  class="salesForm" @submit.prevent="sendForm">
        <div class="contact-form container salesForm__container">
            <h3 v-show="contactForm.title" class="contact-form__title salesForm__title">{{ contactForm.title }}</h3>
            <div v-show="contactForm.subtitle" class="contact-form__subtitle salesForm__subtitle">{{ contactForm.subtitle }}</div>
            <form class="contact-form__container">
                <div class="salesForm__form-container">
                    <div class="contact-form__item">
                        <label class="contact-form__label">Имя</label>
                        <input
                                v-model="$v.name.$model"
                                ref="salesName"
                                :class="{ error: !$v.name.checkName}"
                                type="text"
                                class="contact-form__input name"
                                placeholder="Введите ваше имя"
                        >
                        <div class="contact-form__error" v-show="!$v.name.checkName">Введите корректное имя</div>
                        <div v-show="errorInput.name" class="contact-form__error">Это поле обязательно к заполнению</div>
                    </div>
                    <div class="contact-form__item">
                        <label
                                class="contact-form__label">
                            Телефон
                        </label>
                        <input
                                v-mask="'+7(###)###-##-##'"
                                v-model="$v.tel.$model"
                                type="tel"
                                class="contact-form__input tel"
                                placeholder="+7(__)__-__-__"
                        />
                        <div class="contact-form__error" v-show="!$v.tel.minLength">Введите корректный мобильный телефон</div>
                        <div v-show="errorInput.tel" class="contact-form__error">Это поле обязательно к заполнению</div>
                    </div>
                    <div class="contact-form__item salesForm__submit-container">
                        <button type="submit" class="contact-form__submit">Отправить</button>
                    </div>
                    <div class="contact-form__item salesForm__input-checkbox">
                        <label class="contact-form__checkbox-container">
                            <div class="contact-form__checkbox-wrapper focus-within:border-blue-500">
                                <input @change="checkCheckbox($event.target)" type="checkbox" class="contact-form__checkbox" :checked="check">
                                <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                            </div>
                            <div class="contact-form__select-none">Я принимаю <a href="/policy.pdf" target="_blank">соглашение сайта</a> об обработке персональных данных</div>
                        </label>
                        <span class="contact-form__error" v-show="errorInput.checkbox">Необходимо дать согласие на обработку персональных данных</span>
                    </div>
                </div>
                <span class="contact-form__error" v-show="error">Произошла ошибка во время отправки формы.{{ errorText }}</span>
            </form>
        </div>
    </section>
</template>
<style lang="sass">
    @import "sass/salesForm"
</style>
<script>
    import { mapMutations } from 'vuex'
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    //Validation
    import { minLength, required } from 'vuelidate/lib/validators'
    import {checkName,toFormData} from "../../../../helpers/formHelper"

    export default {
        async fetch(){
            const data = await this.$graphql.request(FRONT_PAGE)
            this.contactForm = _get(data, "nodeByUri.mainPage.saleForm", {})
        },
        data(){
            return {
                contactForm: {},
                name: null,
                tel: null,
                check: true,
                errorCheck: false,
                error: false,
                errorText: null,
                errorInput: {
                  name: false,
                  tel: false,
                  checkbox: false
                }
            }
        },
        watch:{
            name: function () {
                this.$v.name.checkName?this.$refs.salesName.classList.add('done'):''
            },
        },
        validations: {
            tel: {
                minLength: minLength(16),
                required
            },
            name: {
                checkName,
                required
            }
        },
        methods: {
            /* Проверка галочки */
            checkCheckbox(event){
                if(event.checked){
                    this.check = true
                    this.errorCheck = false
                }else {
                    this.check = false
                    this.errorCheck = true
                }
            },
            /* Отправка формы */
            async sendForm(){
              this.$v.$touch()
              if(this.$v.name.$error){
                this.errorInput.name = true
              } else {
                this.errorInput.name = false
              }
              if(this.$v.tel.$error){
                this.errorInput.tel = true
              } else {
                this.errorInput.tel = false
              }
              if(!this.check){
                this.errorInput.checkbox = true
              } else {
                this.errorInput.checkbox = false
              }
              if (!this.$v.$invalid && this.check) {
                try {
                  const response = await this.$axios.$post(`${process.env.MAIN_URL}208/feedback`,toFormData({name:this.name,tel:this.tel}))
                  if(response.status !== "mail_sent"){
                    this.errorText = response.message
                    this.error = true
                  } else {
                    this.TOGGLE_MODAL({enable: true, message: response.message})
                    this.error = false
                    this.$gtm.push({ event: 'salesForm' })
                  }
                  this.name = null
                  this.tel = null
                } catch (e) {
                  console.log(e)
                  this.error = true
                }
              }
            },
            // Модальное окно подтверждения
            ...mapMutations({
                TOGGLE_MODAL: 'formModal/TOGGLE_MODAL'
            })
        }
    }
</script>