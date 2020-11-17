<template>
    <section
        class="banner"
        :style="{backgroundImage: `url(${bannerData.bg.sourceUrl})`}"
    >
        <div class="banner__top"  v-animate.repeat="'fadeInLeft'">
            <div class="container">
                <div class="banner__top-row">
                    <h1
                        v-if="bannerData.title"
                        class="title banner__top-title"
                    >
                        {{ bannerData.title }}
                    </h1>
                    <h4
                        v-if="bannerData.subtitle"
                        class="banner__top-subtitle"
                    >
                        {{ bannerData.subtitle }}
                    </h4>
                </div>
            </div>
        </div>
        <div class="banner__bottom">
            <div class="container banner__bottom-container">
                        <ul
                                v-if="bannerData.services"
                                class="banner__services-list"
                                v-animate.repeat="'fadeInLeft'"
                        >
                            <li
                                    v-for="(item,index) in bannerData.services"
                                    :key="index"
                                    class="banner__services-list-item"
                            >
                                <div class="banner__services-list-item__icon">
                                    <img
                                            :src="item.icon.sourceUrl"
                                            :alt="item.icon.altText"
                                    >
                                </div>
                                <div class="banner__services-list__text">
                                    {{ item.text }}
                                </div>
                            </li>
                        </ul>
                        <div
                                v-if="bannerData.contactForm"
                                class="contact-form banner__bottom-contact-form"
                                v-animate.repeat="'fadeInRight'"
                        >
                            <div class="banner___bottom-contact-form-wrapper">
                                <h3
                                        v-if="bannerData.contactForm.title"
                                        class="contact-form__title banner__bottom-contact-form-title"
                                >
                                    {{ bannerData.contactForm.title }}
                                </h3>
                                <div
                                        v-if="bannerData.contactForm.subtitle"
                                        class="contact-form__subtitle banner__bottom-contact-form-subtitle"
                                >{{ bannerData.contactForm.subtitle }}</div>
                                <form class="contact-form__container banner__bottom-contact-form__container" @submit="sendForm($event)">
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
                                        <label class="contact-form__checkbox-container">
                                            <div class="contact-form__checkbox-wrapper focus-within:border-blue-500">
                                                <input type="checkbox" class="contact-form__checkbox" required>
                                                <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                                            </div>
                                            <div class="contact-form__select-none">Я принимаю <a href="/policy.pdf" target="_blank">соглашение сайта</a> об обработке персональных данных</div>
                                        </label>
                                    </div>
                                    <div class="contact-form__item">
                                        <button type="submit" class="contact-form__submit">Отправить</button>
                                    </div>
                                    <span class="contact-form__error" v-show="error">Произошла ошибка во время отправки формы.{{ errorText }}</span>
                                </form>
                            </div>
                        </div>
            </div>
        </div>
    </section>
</template>
<style lang="sass">
    @import "sass/banner"
</style>
<script>
import { mapMutations } from 'vuex'
// Helpers
import _get from "lodash/get"
// Queries
import FRONT_PAGE from "~/gql/queries/FrontPage"
//Validation
import { minLength } from 'vuelidate/lib/validators'
import {checkName,toFormData} from "../../../../helpers/formHelper"

export default {
    async fetch(){
        const data = await this.$graphql.request(FRONT_PAGE)
        this.bannerData = _get(data, "nodeByUri.mainPage.banner", {})
    },
    data(){
        return {
            bannerData: null,
            name: null,
            tel: null,
            error: false,
            errorText: null
        }
    },
    validations: {
        tel: {
            minLength: minLength(9)
        },
        name: {
            checkName
        }
    },
    methods: {
        /* Отправка формы */
        async sendForm(e){
            e.preventDefault()
            try {
                const response = await this.$axios.$post(`${process.env.MAIN_URL}93/feedback`,toFormData({name:this.name,tel:this.tel}))
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