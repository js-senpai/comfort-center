<template>
    <ul v-show="gallery.length" v-animate.repeat="'fadeInRight'" class="catalog__gallery">
        <li v-for="item in gallery" :key="item.id" class="catalog__gallery-item">
            <img :src="item.img.sourceUrl" :alt="item.img.altText">
        </li>
    </ul>
</template>
<style lang="sass">
    @import "sass/catalogGallery"
</style>
<script>
    import stateHelper from "../../../../../helpers/stateHelper"
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    export default {
        async fetch(){
            const data = await this.$graphql.request(FRONT_PAGE)
            this.gallery = _get(data, "nodeByUri.mainPage.catalog.galleryList", {}).map((item)=>{
                return {
                    id: stateHelper.generateId(),
                    ...item
                }
            })
        },
        data(){
            return {
                gallery: []
            }
        }
    }
</script>