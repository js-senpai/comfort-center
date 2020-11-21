<template>
    <section class="gallery-section">
        <div class="container gallery-section___container">
            <h2 class="title-section gallery-section___title" v-animate.repeat="'fadeInLeft'" v-show="title">{{ title }}</h2>
            <ul class="gallery-section__gallery-list" v-show="galleryList.length">
                <li class="gallery-section__gallery-list-item" v-for="item in galleryList" :key="item.id"  v-animate.repeat="'fadeInLeft'">
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
    import stateHelper from "../../../../helpers/stateHelper"
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    export default {
        async fetch(){
            const data = await this.$graphql.request(FRONT_PAGE)
            this.title = _get(data, "nodeByUri.mainPage.gallerySection.title", {})
            this.galleryList = _get(data, "nodeByUri.mainPage.gallerySection.galleryServices", {}).map((item)=>{
                return {
                    id: stateHelper.generateId(),
                    ...item
                }
            })
        },
        data(){
            return {
                title: '',
                galleryList: {},
            }
        },
    }
</script>