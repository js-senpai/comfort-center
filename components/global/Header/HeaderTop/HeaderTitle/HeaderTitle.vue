<template>
    <div class="header__top-title">
      {{ title }}
    </div>
</template>
<style lang="sass">
    @import "sass/headerTitle"
</style>
<script>
    import _get from "lodash/get"
    import HEADER_SITE from "~/gql/queries/Header"
    export default {
        data(){
            return {
                title: null
            }
        },
        async fetch(){
            const data = await this.$graphql.request(HEADER_SITE)
            this.title =  _get(data, "siteOptions.acfHeader.title", {})
        }
    }
</script>