<template>
    <div :class="classes">
        <template v-if="!parsedPage.isFrontPage">
            <div class="container wp-page">
                <wp-content
                        :html="parsedPage.encodedContent"
                        :enable-styles="true"
                        v-show="!parsedPage.isFrontPage"
                />
            </div>
        </template>
        <template v-else>
            <div class="front-page">
                <Banner />
                <GallerySection />
                <ServicesBlock
                        v-for="(item,index) in services"
                        :id="`service-${index+1}`"
                        :key="item.id"
                        :title="item.title"
                        :subtitle="item.subtitle"
                        :workTypes="item.worktypes"
                        :img="item.img"
                        :serviceList="item.servicesList"
                        :galleryList="item.galleryList"
                        :tablePrice="item.tablePrice"
                        :infoText="item.infoText"
                        :titleForm="item.titileForm"
                />
                <ServiceSlider />
                <SalesForm />
                <Catalog />
                <PriceForm />
                <Advantages />
                <Contacts />
            </div>
        </template>
    </div>
</template>

<script>
import stateHelper from "../helpers/stateHelper"
// Helpers
import _get from "lodash/get"

// Queries
import HOME from "~/gql/queries/Home"
import FRONT_PAGE from "~/gql/queries/FrontPage"
export default {
    scrollToTop: false,
    async asyncData({ $graphql, route,error }) {
        const data = await $graphql.request(HOME, {
            uri: route.path,
        })
        const frontPage = await $graphql.request(FRONT_PAGE)
        const services =  _get(frontPage, "nodeByUri.mainPage.services", {}).map((item)=>{
            return {
                id: stateHelper.generateId(),
                ...item
            }
        })
        const getPage = _get(data, "nodeByUri", {})
        console.log(getPage)
        if(getPage === null){
            error({ statusCode: 404, message: '' })
        }
        return {
            page: getPage,
            services
        }
    },
    computed: {
        classes() {
            return ["page", "page-home"]
        },
        parsedPage() {
            // Shape data from WP-GQL to work with template
            return {
                ...this.page,
                featuredImage: _get(this, "page.featuredImage.node", {}),
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.page-home {
    min-height: var(--unit-100vh);
}
</style>
