<template>
  <div class="formModal-overlay" v-show="modal.enable" :class="{active: modal.enable}" @click.self="TOGGLE_MODAL({file: null,id:null,title:null,enable: false})">
    <transition name="slideUp">
      <div id="serviceModal" class="formModal serviceModal h-auto w-11/12 md:w-1/2 p-5   rounded-md" v-if="modal.enable" :class="{active: modal.enable}">

        <div class="flex flex-col w-full h-auto ">
          <!-- Header -->
          <div class="flex w-full h-auto justify-end items-center">
            <div @click="TOGGLE_MODAL({file: null,id:null,title:null,enable: false})" class="flex w-1/12 h-auto justify-center cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <!--Header End-->
          </div>
          <!-- Modal Content-->
          <transition name="fade">
            <form v-if="!mailSent" @submit.prevent="sendForm" class="contact-form__container serviceModal__form-container">
              <div class="flex w-full h-auto py-1  justify-center items-center text-center font-bold text-xl">{{ modal.title }}</div>
              <div class="serviceModal__form-container">
                <div class="contact-form__item">
                  <label class="contact-form__label">Имя</label>
                  <input
                      ref="modalName"
                      :class="{ error: !$v.name.checkName}"
                      type="text"
                      class="contact-form__input name"
                      placeholder="Введите ваше имя"
                      v-model="$v.name.$model"
                  >
                  <div class="contact-form__error" v-show="!$v.name.checkName">Введите корректное имя</div>
                </div>
                <div class="contact-form__item">
                  <label class="contact-form__label">Email</label>
                  <input
                      ref="modalName"
                      :class="{ error: !$v.email.email}"
                      type="text"
                      class="contact-form__input name"
                      placeholder="Введите ваш email"
                      v-model="$v.email.$model"
                  >
                  <div class="contact-form__error" v-show="!$v.email.email">Введите корректное имя</div>
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
                <div class="contact-form__item serviceModal__input-checkbox">
                  <label class="contact-form__checkbox-container">
                    <div class="contact-form__checkbox-wrapper focus-within:border-blue-500">
                      <input @change="checkCheckbox($event.target)" type="checkbox" class="contact-form__checkbox" :checked="check">
                      <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                    </div>
                    <div class="contact-form__select-none">Я принимаю <a href="/policy.pdf" target="_blank">соглашение сайта</a> об обработке персональных данных</div>
                  </label>
                  <span class="contact-form__error" v-show="errorInput.checkbox">Необходимо дать согласие на обработку персональных данных</span>
                </div>
                <div class="contact-form__item serviceModal__submit-container">
                  <button type="submit" class="contact-form__submit">Отправить</button>
                </div>
              </div>
              <span class="contact-form__error" v-show="error">Произошла ошибка во время отправки формы.{{ errorText }}</span>
            </form>
            <!-- End of Modal Content-->
            <div v-else class="flex w-full h-auto py-10 px-2 justify-center items-center  text-center font-bold text-xl">
              {{ thxMessage }}
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>
<style lang="sass">
@import "sass/serviceModal"
</style>
<script>
import { mapMutations,mapGetters } from 'vuex'
import {toFormData,checkName} from "../../../helpers/formHelper"
import { minLength, required, email } from 'vuelidate/lib/validators'
export default {
  data(){
    return {
      name: null,
      email: null,
      tel: null,
      check: true,
      errorCheck: false,
      error: false,
      errorText: null,
      mailSent: false,
      thxMessage: '',
      errorInput: {
        tel: false,
        checkbox: false
      }
    }
  },
  computed: {
    ...mapGetters({
      modal: 'service/getModal'
    })
  },
  validations: {
    tel: {
      minLength: minLength(16),
      required
    },
    name: {
      checkName
    },
    email: {
      email
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
      if(!this.$v.$invalid){
        try {
          const response = await this.$axios.$post(`${process.env.MAIN_URL}178/feedback`,toFormData({title:this.modal.title,file:this.modal.file,name: this.name !== null?this.name:'',phone: this.tel,email: this.email !== null?this.email:''}))
          if(response.status !== "mail_sent"){
            this.errorText = response.message
            this.error = true
          } else {
            this.thxMessage = response.message
            this.mailSent = true
            this.$gtm.push({ event: this.id })
            setTimeout(()=>{
              this.TOGGLE_MODAL({file: null,id:null,title:null,enable: false})
              this.mailSent = false
              this.errorCheck = false
              this.error = false
              this.$v.$reset()
            },2000)
          }
        } catch (e) {
          console.log(e)
          this.error = true
        }
      } else {
        this.error = true
      }
    },
    // Модальное окно подтверждения
    ...mapMutations({
      TOGGLE_MODAL: 'service/TOGGLE_MODAL'
    })
  }
}
</script>