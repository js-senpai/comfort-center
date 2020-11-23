<template>
    <div class="formModal-overlay" v-show="modal" :class="{active: modal}" @click.self="TOGGLE_MODAL({product: null,price:null,isActive: false})">
        <transition name="slideUp">
            <div id="productModal" class="formModal productModal h-auto w-11/12 md:w-1/2 p-5   rounded-md" v-if="modal" :class="{active: modal}">

                <div class="flex flex-col w-full h-auto ">
                    <!-- Header -->
                    <div class="flex w-full h-auto justify-end items-center">
                        <div @click="TOGGLE_MODAL({product: null,price:null,isActive: false})" class="flex w-1/12 h-auto justify-center cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </div>
                        <!--Header End-->
                    </div>
                    <!-- Modal Content-->
                    <transition name="fade">
                        <form v-if="!mailSent" @submit="sendForm($event)" class="contact-form__container productModal__form-container">
                            <div class="productModal__form-container">
                                <div class="contact-form__item">
                                    <label class="contact-form__label">Имя</label>
                                    <input
                                            ref="modalName"
                                            :class="{ error: !$v.name.checkName}"
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
                                <div class="contact-form__item productModal__input-checkbox">
                                    <label class="contact-form__checkbox-container">
                                        <div class="contact-form__checkbox-wrapper focus-within:border-blue-500">
                                            <input @change="checkCheckbox($event.target)" type="checkbox" class="contact-form__checkbox" required>
                                            <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                        </div>
                                        <div class="contact-form__select-none">Я принимаю <a href="/policy.pdf" target="_blank">соглашение сайта</a> об обработке персональных данных</div>
                                    </label>
                                    <span class="contact-form__error" v-show="errorCheck">Необходимо дать согласие на обработку персональных данных</span>
                                </div>
                                <div class="contact-form__item productModal__submit-container">
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
    @import "sass/productModal"
</style>
<script>
    import { mapGetters,mapMutations } from 'vuex'
    //Validation
    import { minLength, required } from 'vuelidate/lib/validators'
    import {checkName,toFormData} from "../../../helpers/formHelper"

    export default {
        data(){
            return {
                contactForm: {},
                name: null,
                tel: null,
                check: false,
                errorCheck: false,
                error: false,
                errorText: null,
                mailSent: false,
                thxMessage: ''
            }
        },
        validations: {
            tel: {
                minLength: minLength(9),
                required
            },
            name: {
                checkName,
                required
            }
        },
        computed: {
            ...mapGetters({
                modal: 'catalog/getModal',
                productForm: 'catalog/getProductModal'
            })
        },
        watch:{
            name: function () {
                this.$v.name.checkName?this.$refs.salesName.classList.add('done'):''
            },
        },
        methods: {
            ...mapMutations({
                TOGGLE_MODAL: 'catalog/TOGGLE_MODAL'
            }),
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
            async sendForm(e){
                e.preventDefault()
                try {
                    const response = await this.$axios.$post(`${process.env.MAIN_URL}232/feedback`,toFormData({
                        name:this.name,
                        tel:this.tel,
                        productName: this.productForm.name,
                        productManufacturer: this.productForm.filters,
                        productCategory: this.productForm.category,
                        productType: this.productForm.type,
                        productPrice: this.productForm.price
                    }))
                    if(response.status !== "mail_sent"){
                        this.errorText = response.message
                        this.error = true
                    } else {
                        this.thxMessage = response.message
                        this.mailSent = true
                        this.error = false
                        this.$gtm.push({ event: 'catalogForm' })
                        setTimeout(()=>{
                            this.TOGGLE_MODAL({product: null,price:null,isActive: false})
                        },2000)
                    }
                    this.name = null
                    this.tel = null
                } catch (e) {
                    console.log(e)
                    this.error = true
                }
            },
        }
    }
</script>