<template>
  <section class="priceForm">
      <div class="container priceForm-container">
          <h3 v-show="contactForm.title" class="contact-form__title priceForm__title">{{ contactForm.title }}</h3>
          <div v-show="contactForm.subtitle" v-html="contactForm.subtitle" class="contact-form__subtitle priceForm__subtitle" />
          <form @submit="sendForm($event)" class="contact-form__container priceForm-form">
              <div class="priceForm__form-container">
                  <div class="contact-form__item">
                      <label class="contact-form__label">Имя</label>
                      <input
                              type="text"
                              class="contact-form__input name"
                              placeholder="Введите ваше имя"
                              v-model="$v.name.$model"
                              required
                      >
                      <span class="contact-form__error" v-show="!$v.name.checkName">Введите корректное имя</span>
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
                              required
                      />
                      <span class="contact-form__error" v-show="!$v.tel.minLength">Введите корректный номер телефона</span>
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
                              required
                      />
                      <span class="contact-form__error" v-show="!$v.email.email">Введите корректную почту</span>
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
                      <button type="submit" class="contact-form__submit">Получить прайс лист</button>
                  </div>
                  <div class="contact-form__item priceForm__input-checkbox">
                      <label class="contact-form__checkbox-container">
                          <div class="contact-form__checkbox-wrapper focus-within:border-blue-500">
                              <input type="checkbox" class="contact-form__checkbox" required>
                              <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                          </div>
                          <div class="contact-form__select-none">Я принимаю <a href="/policy.pdf" target="_blank">соглашение сайта</a> об обработке персональных данных</div>
                      </label>
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
    import { minLength,email } from 'vuelidate/lib/validators'
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
                error: false,
                errorText: null,
                attributes: {
                    ref: 'openIndicator',
                    role: 'presentation',
                    class: 'vs__open-indicator',
                }
            }
        },
        validations: {
            tel: {
                minLength: minLength(9)
            },
            name: {
                checkName
            },
            email: {
                email
            }
        },
        methods: {
            /* Отправка формы */
            async sendForm(e){
                e.preventDefault()
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
                    }
                    this.name = null
                    this.tel = null
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