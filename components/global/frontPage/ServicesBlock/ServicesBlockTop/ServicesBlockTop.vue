<template>
    <div class="service-section__top">
        <div class="container service-section-container service-section-container-top">
            <div class="service-section__top-left" >
                <h2 class="title-section service-section__title" v-show="title">{{ title }}</h2>
                <div class="subtitle-section service-section__subtitle" v-show="subtitle">{{ subtitle }}</div>
                <ul class="service-section__work-types" v-show="workTypes">
                    <li class="service-section__work-types-item" v-for="(item,index) in workTypes" :key="index">
                        <div class="service-section__work-types-img" v-show="item.img">
                            <img :src="item.img.sourceUrl" :alt="item.img.altText" />
                        </div>
                        <div class="service-section__work-types-title">
                            {{ item.title }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="service-section__top-right" v-show="img" >
            <img :src="img.sourceUrl" :alt="img.altText" />
        </div>
    </div>
</template>
<style lang="sass">
    @import "sass/servicesBlockTop"
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
            }
        }
    }
</script>