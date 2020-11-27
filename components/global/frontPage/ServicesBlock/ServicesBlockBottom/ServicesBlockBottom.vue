<template>
    <div class="service-section__bottom">
        <div class="container service-section-container">
            <div class="service-section-container-bottom">
                <ul class="service-section__bottom-service-list" v-if="serviceList" >
                    <li class="service-section__bottom-service-list-item" v-for="(item,index) in serviceList" :key="index">
                        <div class="service-section__bottom-service-list-img" v-show="item.img">
                            <img :src="item.img.sourceUrl" :alt="item.img.altText" />
                        </div>
                        <div class="service-section__bottom-service-list-title" v-show="item.title">{{ item.title }}</div>
                        <div class="service-section__bottom-service-list-subtitle" v-show="item.subtitle">{{ item.subtitle }}</div>
                    </li>
                    <li class="service-section__bottom-service-list-item empty">
                    </li>
                </ul>
            </div>
            <ul class="service-section__bottom-gallery" v-show="galleryList" >
                <li class="service-section__bottom-gallery-item" v-for="(item,index) in galleryList" :key="index">
                    <img :src="item.img.sourceUrl" :alt="item.img.altText" />
                </li>
            </ul>
            <div class="service-section__bottom-table" v-show="tablePrice" >
                <div class="service-section__bottom-table-header" v-show="tablePrice.name && tablePrice.value">
                    <div class="service-section__bottom-table-tr">
                        <div class="service-section__bottom-table-td">{{ tablePrice.name }}</div>
                        <div class="service-section__bottom-table-td">{{ tablePrice.value }}</div>
                    </div>
                </div>
                <div class="service-section__bottom-table-body" v-show="tablePrice.tableList">
                    <div class="service-section__bottom-table-tr" v-for="(item,index) in tablePrice.tableList" :key="index">
                        <div class="service-section__bottom-table-td">{{ item.name }}</div>
                        <div class="service-section__bottom-table-td">{{ item.price }}</div>
                    </div>
                </div>
            </div>
            <div class="service-section__bottom-info" v-show="infoText" >
                <div class="service-section__bottom-info-img">
                    <img src="~static/images/icons/info-icon.svg" alt="info text">
                </div>
                <div class="service-section__bottom-info-text">{{infoText}}</div>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
    @import "sass/servicesBlockBottom"
</style>
<script>
    export default {
        props: {
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
            }
        }
    }
</script>