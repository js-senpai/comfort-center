<template>
  <section  class="priceForm">
      <div class="container priceForm-container">
          <h3 v-show="contactForm.title" class="contact-form__title priceForm__title">{{ contactForm.title }}</h3>
          <div v-show="contactForm.subtitle" v-html="contactForm.subtitle" class="contact-form__subtitle priceForm__subtitle" />
          <form @submit.prevent="sendForm($event)" class="contact-form__container priceForm-form">
              <div class="priceForm__form-container">
                  <div class="contact-form__item">
                      <label class="contact-form__label">Имя</label>
                      <input
                              v-model="$v.name.$model"
                              ref="priceName"
                              :class="{ error: !$v.name.checkName}"
                              type="text"
                              class="contact-form__input name"
                              placeholder="Введите ваше имя"
                      >
                      <div v-show="!$v.name.checkName" class="contact-form__error">Введите корректное имя</div>
                      <div v-show="$v.name.$error" class="contact-form__error">Это поле обязательно к заполнению</div>
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
                      <div v-show="$v.tel.$error" class="contact-form__error">Это поле обязательно к заполнению</div>
                  </div>
                  <div class="contact-form__item">
                      <label
                              class="contact-form__label">
                          Почта
                      </label>
                      <input
                              v-model="$v.email.$model"
                              type="email"
                              class="contact-form__input mail"
                              placeholder="ezample@mail.ru"
                              ref="priceEmail"
                              :class="{ error: !$v.email.email}"
                      />
                      <div class="contact-form__error" v-show="!$v.email.email">Введите корректную почту</div>
                      <div v-show="$v.email.$error" class="contact-form__error">Это поле обязательно к заполнению</div>
                  </div>
                  <div class="contact-form__item">
                      <v-select v-model="selected" placeholder="Выберите услугу" label="name" :options="select" class="contact-form__select" >
                          <template #open-indicator="{ attributes }">
                              <svg v-bind="attributes" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                          </template>
                          <template #search="{attributes, events}">
                              <input
                                      class="vs__search"
                                      :required="!selected"
                                      v-bind="attributes"
                                      v-on="events"
                              />
                          </template>
                      </v-select>
                  </div>
                  <div class="contact-form__item priceForm__submit-container">
                      <button type="submit" class="contact-form__submit" >Получить прайс лист</button>
                  </div>
                  <div class="contact-form__item priceForm__input-checkbox">
                      <label class="contact-form__checkbox-container">
                          <div class="contact-form__checkbox-wrapper focus-within:border-blue-500">
                              <input @change="checkCheckbox($event.target)" type="checkbox" class="contact-form__checkbox" :checked="check" required>
                              <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                          </div>
                          <div class="contact-form__select-none">Я принимаю <a href="/policy.pdf" target="_blank">соглашение сайта</a> об обработке персональных данных</div>
                      </label>
                      <span class="contact-form__error" v-show="errorCheck">Необходимо дать согласие на обработку персональных данных</span>
                  </div>
              </div>
              <span class="contact-form__error" v-show="error">Произошла ошибка во время отправки формы.{{ errorText }}</span>
          </form>
      </div>
  </section>
</template>
<style lang="sass">
    @import "sass/priceForm"
</style>
<script>
    import { mapMutations } from 'vuex'
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    //Validation
    import { minLength,email,required } from 'vuelidate/lib/validators'
    import {checkName,toFormData} from "../../../../helpers/formHelper"
    import stateHelper from "../../../../helpers/stateHelper"
    export default {
        async fetch(){
            const data = await this.$graphql.request(FRONT_PAGE)
            this.contactForm = _get(data, "nodeByUri.mainPage.priceForm", {})
            this.select =  _get(data, "nodeByUri.mainPage.priceForm.select", {}).map((item)=>{
                return {
                    id: stateHelper.generateId(),
                    ...item
                }
            })
        },
        data(){
            return {
                contactForm: {},
                name: null,
                tel: null,
                email: null,
                select: [],
                selected: '',
                check: true,
                errorCheck: false,
                error: false,
                errorText: null,
                attributes: {
                    ref: 'openIndicator',
                    role: 'presentation',
                    class: 'vs__open-indicator',
                },
            }
        },
        watch:{
            name: function () {
                this.$v.name.checkName?this.$refs.priceName.classList.add('done'):''
            },
            email: function () {
                this.$v.email.email?this.$refs.priceEmail.classList.add('done'):''
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
            },
            email: {
                email,
                required
            },
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
                if (!this.$v.$invalid && this.check) {
                    try {
                        const response = await this.$axios.$post(`${process.env.MAIN_URL}240/feedback`,toFormData({
                            name:this.name,
                            tel:this.tel,
                            email: this.email,
                            selected: this.selected.name
                        }))
                        if(response.status !== "mail_sent"){
                            this.errorText = response.message
                            this.error = true
                        } else {
                            this.TOGGLE_MODAL({enable: true, message: response.message})
                            this.error = false
                            this.$gtm.push({ event: 'priceForm' })
                            this.errorCheck = false
                            this.$v.$reset()
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