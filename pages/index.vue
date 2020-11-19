<template>
 <div class="front-page">
   <Banner />
   <GallerySection />
   <ServicesBlock
      v-for="(item,index) in services"
      :id="`service-${index+1}`"
      :key="index"
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
 </div>
</template>
<script>
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    export default {
        async asyncData({$graphql}){
            const data = await $graphql.request(FRONT_PAGE)
            return {
                services: _get(data, "nodeByUri.mainPage.services", {})
            }
        }
    }
</script>