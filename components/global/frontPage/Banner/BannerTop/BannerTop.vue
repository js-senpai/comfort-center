<template>
    <div   class="banner__top">
        <div class="container">
            <div class="banner__top-row">
                <h1
                        v-show="title"
                        class="title banner__top-title"
                >
                    {{ title }}
                </h1>
                <h4
                        v-show="subtitle"
                        class="banner__top-subtitle"
                >
                    {{ subtitle }}
                </h4>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
    @import "sass/bannerTop"
</style>
<script>
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    export default {
        async fetch() {
            const data = await this.$graphql.request(FRONT_PAGE)
            this.title = _get(data, "nodeByUri.mainPage.banner.title", {})
            this.subtitle = _get(data, "nodeByUri.mainPage.banner.subtitle", {})
        },
        data(){
            return {
                title: null,
                subtitle: null
            }
        }
    }
</script>