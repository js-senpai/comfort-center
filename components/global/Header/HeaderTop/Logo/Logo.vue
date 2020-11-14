<template>
    <nuxt-link to="/" class="logo">
        <img :src="logo.url" :alt="logo.alt" />
    </nuxt-link>
</template>
<style lang="sass">
    @import "sass/logo"
</style>
<script>
    import _get from "lodash/get"
    import HEADER_SITE from "~/gql/queries/Header"
    export default {
        data(){
          return {
              logo: {
                  url: null,
                  alt: null
              }
          }
        },
        async fetch(){
            const data = await this.$graphql.request(HEADER_SITE);
            this.logo = {
                url: _get(data, "siteOptions.acfHeader.logo.sourceUrl", {}),
                alt: _get(data, "siteOptions.acfHeader.logo.altText", {})
            }
        }
    }
</script>