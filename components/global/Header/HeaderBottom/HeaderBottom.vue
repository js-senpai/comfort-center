<template>
    <div class="header__bottom">
        <div class="container header__bottom-container">
            <wp-menu location="MAIN_MENU" class="container header__bottom-menu"   :class="{active:this.$store.state.menuOpened}" />
            <Social :socials="socials"  class="header__bottom-socials  hidden" :class="{active:this.$store.state.menuOpened}" />
        </div>
    </div>
</template>
<style lang="sass">
  @import "sass/headerBottom"
</style>
<script>
    import _get from "lodash/get"
    import HEADER_SITE from "~/gql/queries/Header"
    export default {
        data(){
            return {
                socials: {},
                isFixed: false
            }
        },
        async fetch(){
            const data = await this.$graphql.request(HEADER_SITE)
            this.socials =  _get(data, "siteOptions.acfHeader.contacts", {})
        },
    }
</script>