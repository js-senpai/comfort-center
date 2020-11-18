<template>
    <section class="serviceSlider-section">
        <div v-animate.repeat="'fadeInLeft'" class="container serviceSlider-section-container">
            <h2 class="title-section serviceSlider-section__title" v-if="serviceData.title">{{ serviceData.title }}</h2>
        </div>
        <ul v-animate.repeat="'fadeInRight'" class="serviceSlider-tabNav" v-if="serviceData.sliderTab">
            <li v-for="(item,index) in serviceData.sliderTab" class="serviceSlider-tabNav-item" :key="index" :class="{active:index === 0}">{{ item.name }}</li>
        </ul>
        <div v-animate.repeat="'fadeInRight'" v-for="(item,index) in serviceData.sliderTab" :key="index" :class="{active:index === 0}" :id="`tab-${index}`" class="serviceSlider-tab-container">
            <VueSlickCarousel v-if="item.slider" :arrows="true" :dots="false" class="serviceSlider">
               <div v-for="(slideItem,indexItem) in item.slider" :key="indexItem" class="serviceSlider-item">
                   <div class="serviceSlider-tab-header">
                       <div v-if="slideItem.img" class="serviceSlider-tab-header__img">
                           <img :src="slideItem.img.sourceUrl" :alt="slideItem.img.altText" />
                       </div>
                       <div class="container">
                          <div class="serviceSlider-tab-header__container">
                              <h3 v-if="slideItem.title" class="serviceSlider-title">{{slideItem.title}}</h3>
                              <div v-for="(infoItem,infoIndex) in slideItem.infoList" :key="infoIndex" class="serviceSlider-info">
                                  <div class="serviceSlider-info__title">{{ infoItem.title }}</div>
                                  <ul  class="serviceSlider-info__list">
                                      <li v-for="(infoList,infoListIndex) in infoItem.infoListItem" :key="infoListIndex" class="serviceSlider-info__item">
                                          {{ infoList.text }}
                                      </li>
                                  </ul>
                              </div>
                              <div v-if="slideItem.deadline" class="serviceSlider-info__deadline-info">
                                  <span class="serviceSlider-info__deadline-text">Срок выполнения:</span>
                                  <span class="serviceSlider-info__deadline-days">{{slideItem.deadline}}</span>
                              </div>
                          </div>
                       </div>
                   </div>
                   <div v-if="slideItem.gallery" class="serviceSlider-tab-footer">
                       <div class="container serviceSlider-tab-footer__container">
                           <ul class="serviceSlider-tab-footer__list">
                               <li v-for="(galleryItem,galleryIndex) in slideItem.gallery" :key="galleryIndex" class="serviceSlider-tab-footer__list-item">
                                   <img :src="galleryItem.img.sourceUrl" :alt="galleryItem.img.altText" />
                               </li>
                           </ul>
                       </div>
                   </div>
               </div>
            </VueSlickCarousel>
        </div>
    </section>
</template>
<style lang="sass">
    @import "sass/serviceSlider"
</style>
<script>
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    export default {
      async fetch(){
          const data = await this.$graphql.request(FRONT_PAGE)
          this.serviceData = _get(data, "nodeByUri.mainPage.sliderTabContainer", {})
      },
      data(){
          return {
              serviceData: {}
          }
      }
    }
</script>