<template>
    <footer class="footer">
        <div class="container footer-container">
           <div class="footer-item" v-for="(item,index) in footerList" :key="index" v-html="item.text" />
        </div>
    </footer>
</template>
<style lang="sass">
    @import "sass/footer"
</style>
<script>
    import _get from "lodash/get"
    import FOOTER_SITE from "~/gql/queries/Footer"
    export default {
        data(){
            return {
                footerList: null
            }
        },
        async fetch(){
            const data = await this.$graphql.request(FOOTER_SITE)
            this.footerList =  _get(data, "footer.acfFooter.footerColumns", {})
        }
    }
</script>