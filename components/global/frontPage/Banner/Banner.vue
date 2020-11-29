<template>
    <section
        class="banner"
        :lazy-background="bannerData.bg?bannerData.bg.sourceUrl:null"
    >
        <BannerTop />
        <BannerBottom />

    </section>
</template>
<style lang="sass">
    @import "sass/banner"
</style>
<script>
// Helpers
import _get from "lodash/get"
// Queries
import FRONT_PAGE from "~/gql/queries/FrontPage"


export default {
    async fetch(){
        const data = await this.$graphql.request(FRONT_PAGE)
        this.bannerData = _get(data, "nodeByUri.mainPage.banner", {})
    },
    data(){
        return {
            bannerData: {},
        }
    },
}

</script>