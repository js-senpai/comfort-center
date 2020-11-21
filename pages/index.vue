<template>
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
 </div>
</template>
<script>
    import stateHelper from "../helpers/stateHelper"
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    export default {
        scrollToTop: false,
        async asyncData({$graphql}){
            const data = await $graphql.request(FRONT_PAGE)
            const services =  _get(data, "nodeByUri.mainPage.services", {}).map((item)=>{
                return {
                    id: stateHelper.generateId(),
                    ...item
                }
            })
            return {
                services
            }
        }
    }
</script>