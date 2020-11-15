<template>
    <div class="header__top">
        <div class="container header__top-container">
            <div class="header__top-left">
                <Logo />
                <HeaderTitle />
            </div>
            <div class="header__top-right">
                <Social :socials="socials" :is-column="true" class="header__top-socials hidden lg:flex" />
                <Hamburger class="flex lg:hidden" />
            </div>
        </div>
    </div>
</template>
<style lang="sass">
    @import "sass/headerTop"
</style>
<script>
    import _get from "lodash/get"
    import HEADER_SITE from "~/gql/queries/Header"
    import Social from "../../Social/Social"
    import Hamburger from "./Hamburger/Hamburger"
    export default {
        components: {Hamburger, Social},
        data(){
            return {
                socials: null
            }
        },
        async fetch(){
            const data = await this.$graphql.request(HEADER_SITE)
            this.socials =  _get(data, "siteOptions.acfHeader.contacts", {})
            console.log(this.socials)
        }
    }
</script>