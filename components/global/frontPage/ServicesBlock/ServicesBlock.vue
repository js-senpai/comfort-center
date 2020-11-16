<template>
    <section class="service-section">
            <div class="service-section__top">
                <div class="container service-section-container">
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
                <form  class="service-section__form">
                    <div class="service-section__form-item">
                        <input type="file" class="service-section__form-file-input">
                        <div class="service-section__form-file">Прикрепить проект смету</div>
                    </div>
                    <div class="service-section__form-item">
                        <button type="submit" class="contact-form__submit">Отправить</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<style lang="sass">
    @import "sass/serviceBlock"
</style>
<script>
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
        }
    }
</script>
