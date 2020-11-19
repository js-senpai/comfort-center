<template>
    <ul
            v-show="services"
            v-animate.repeat="'fadeInLeft'"
            class="banner__services-list"
    >
        <li
                v-for="(item,index) in services"
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
</template>
<style lang="sass">
    @import "sass/bannerServicesList"
</style>
<script>
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    export default {
        async fetch() {
            const data = await this.$graphql.request(FRONT_PAGE)
            this.services = _get(data, "nodeByUri.mainPage.banner.services", {})
        },
        data(){
            return {
                services: {}
            }
        }
    }
</script>