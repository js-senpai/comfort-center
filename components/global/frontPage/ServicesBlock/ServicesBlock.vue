<template>
    <section class="service-section">
            <div class="service-section__top">
                <div class="container service-section-container service-section-container-top">
                    <div class="service-section__top-left" v-animate.repeat="'fadeInLeft'">
                        <h2 class="title-section service-section__title" v-if="title">{{ title }}</h2>
                        <div class="subtitle-section service-section__subtitle" v-if="subtitle">{{ subtitle }}</div>
                        <ul class="service-section__work-types" v-if="workTypes">
                            <li class="service-section__work-types-item" v-for="(item,index) in workTypes" :key="index">
                                <div class="service-section__work-types-img" v-if="item.img">
                                    <img :src="item.img.sourceUrl" :alt="item.img.altText" />
                                </div>
                                <div class="service-section__work-types-title">
                                    {{ item.title }}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="service-section__top-right" v-if="img" v-animate.repeat="'fadeInRight'">
                    <img :src="img.sourceUrl" :alt="img.altText" />
                </div>
            </div>
            <div class="service-section__bottom">
                <div class="container service-section-container">
                    <div class="service-section-container-bottom">
                        <ul class="service-section__bottom-service-list" v-if="serviceList" v-animate.repeat="'fadeInLeft'">
                            <li class="service-section__bottom-service-list-item" v-for="(item,index) in serviceList" :key="index">
                                <div class="service-section__bottom-service-list-img" v-if="item.img">
                                    <img :src="item.img.sourceUrl" :alt="item.img.altText" />
                                </div>
                                <div class="service-section__bottom-service-list-title" v-if="item.title">{{ item.title }}</div>
                                <div class="service-section__bottom-service-list-subtitle" v-if="item.subtitle">{{ item.subtitle }}</div>
                            </li>
                            <li class="service-section__bottom-service-list-item empty">
                            </li>
                        </ul>
                    </div>
                    <ul class="service-section__bottom-gallery" v-if="galleryList" v-animate.repeat="'fadeInLeft'">
                        <li class="service-section__bottom-gallery-item" v-for="(item,index) in galleryList" :key="index">
                            <img :src="item.img.sourceUrl" :alt="item.img.altText" />
                        </li>
                    </ul>
                    <div class="service-section__bottom-table" v-if="tablePrice" v-animate.repeat="'fadeInRight'">
                        <div class="service-section__bottom-table-header" v-if="tablePrice.name && tablePrice.value">
                            <div class="service-section__bottom-table-tr">
                                <div class="service-section__bottom-table-td">{{ tablePrice.name }}</div>
                                <div class="service-section__bottom-table-td">{{ tablePrice.value }}</div>
                            </div>
                        </div>
                        <div class="service-section__bottom-table-body" v-if="tablePrice.tableList">
                            <div class="service-section__bottom-table-tr" v-for="(item,index) in tablePrice.tableList" :key="index">
                                <div class="service-section__bottom-table-td">{{ item.name }}</div>
                                <div class="service-section__bottom-table-td">{{ item.price }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="service-section__bottom-info" v-if="infoText" v-animate.repeat="'fadeInLeft'">
                        <div class="service-section__bottom-info-img">
                            <img src="~static/images/icons/info-icon.svg" alt="info text">
                        </div>
                        <div class="service-section__bottom-info-text">{{infoText}}</div>
                    </div>
                </div>
            </div>
        <div class="service-section__form" v-if="titleForm" v-animate.repeat="'fadeInRight'">
            <div class="container service-section__form-container">
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
    </section>
</template>
<style lang="sass">
    @import "sass/serviceBlock"
</style>
<script>
    import { mapMutations } from 'vuex'
    import { toFormData } from "../../../../helpers/formHelper"
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            subtitle: {
                type: String,
                required: true
            },
            workTypes: {
                type: Array,
                required: true
            },
            img: {
                type: Object,
                required: true
            },
            serviceList: {
                type: Array,
                required: true
            },
            galleryList: {
                type: Array,
                required: true
            },
            tablePrice: {
                type: Object,
                required: true
            },
            infoText: {
                type: String,
                required: true
            },
            titleForm: {
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
                    const response = await this.$axios.$post(`${process.env.MAIN_URL}178/feedback`,toFormData({yourFile:this.file}))
                    if(response.status !== "mail_sent"){
                        this.errorText = response.message
                        this.error = true
                    } else {
                        this.TOGGLE_MODAL({enable: true, message: response.message})
                        this.error = false
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
