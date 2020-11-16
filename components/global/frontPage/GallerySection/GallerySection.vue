<template>
    <section class="gallery-section">
        <div class="container gallery-section___container">
            <h2 class="title-section gallery-section___title" v-animate.repeat="'fadeInLeft'">{{ galleryData.title }}</h2>
            <ul class="gallery-section__gallery-list" v-if="galleryData.galleryServices">
                <li class="gallery-section__gallery-list-item" v-for="(item,index) in galleryData.galleryServices" :key="index"  v-animate.repeat="'fadeInLeft'">
                    <div class="gallery-section__gallery-list-img">
                        <img :src="item.img.sourceUrl" :alt="item.img.altText">
                    </div>
                    <div class="gallery-section__gallery-list-title">{{ item.title }}</div>
                </li>
            </ul>
        </div>
    </section>
</template>
<style lang="sass">
    @import "sass/gallerySection"
</style>
<script>
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    export default {
        async fetch(){
            const data = await this.$graphql.request(FRONT_PAGE)
            this.galleryData = _get(data, "nodeByUri.mainPage.gallerySection", {})
        },
        data(){
            return {
                galleryData: null,
            }
        },
    }
</script>