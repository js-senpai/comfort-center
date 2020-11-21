<template>
    <div class="catalog__header">
        <h2 v-show="title" class="title-section catalog__header-title">{{ title }}</h2>
        <div v-show="subtitle" v-html="subtitle" class="subtitle-section catalog__header-subtitle" />
    </div>
</template>
<style lang="sass">
    @import "sass/catalogTop"
</style>
<script>
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    export default {
        async fetch(){
            const data = await this.$graphql.request(FRONT_PAGE)
            this.title = _get(data, "nodeByUri.mainPage.catalog.title", {})
            this.subtitle = _get(data, "nodeByUri.mainPage.catalog.subtitle", {})
        },
        data(){
            return {
                title: null,
                subtitle: null
            }
        }
    }
</script>