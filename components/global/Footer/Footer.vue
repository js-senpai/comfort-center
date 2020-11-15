<template>
    <footer class="footer">
        <div class="container footer-container">
            <div
                v-for="(item,index) in footerList"
                :key="index"
                class="footer-item"
                v-html="item.text"
            />
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
    async fetch(){
        const data = await this.$graphql.request(FOOTER_SITE)
        this.footerList =  _get(data, "footer.acfFooter.footerColumns", {})
    },
    data(){
        return {
            footerList: null
        }
    }
}
</script>