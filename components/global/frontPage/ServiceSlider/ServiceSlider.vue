<template>
    <section class="serviceSlider-section">
        <div v-animate.repeat="'fadeInLeft'" class="container serviceSlider-section-container">
            <h2 class="title-section serviceSlider-section__title" v-show="serviceData.title">{{ serviceData.title }}</h2>
        </div>
        <ul v-animate.repeat="'fadeInRight'" class="serviceSlider-tabNav" v-show="serviceData.sliderTab">
            <li v-for="(item,index) in serviceData.sliderTab" class="serviceSlider-tabNav-item" :key="index" @click="changeTab($event.target,index)" :class="{active:index === 0}">{{ item.name }}</li>
        </ul>
        <div v-animate.repeat="'fadeInRight'" v-for="(itemTab,indexTab) in serviceData.sliderTab" :key="indexTab" :class="{active:indexTab === 0}"  :id="`tab-${indexTab}`"  class="serviceSlider-tab-container">
            <VueSlickCarousel v-show="itemTab.slider" :arrows="false" :dots="false" :ref="`slick${indexTab}`" class="serviceSlider">
               <div v-for="(slideItem,indexItem) in itemTab.slider" :key="indexItem" class="serviceSlider-item">
                   <div class="serviceSlider-tab-header">
                       <div v-show="slideItem.img" class="serviceSlider-tab-header__img">
                           <img :src="slideItem.img.sourceUrl" ref="mainImg" :alt="slideItem.img.altText" />
                       </div>
                       <div class="container lg:flex lg:justify-end">
                          <div class="serviceSlider-tab-header__container">
                              <div class="serviceSlider-tab-header__content">
                                  <h3 v-show="slideItem.title" class="serviceSlider-title">{{slideItem.title}}</h3>
                                  <div v-for="(infoItem,infoIndex) in slideItem.infoList" :key="infoIndex" class="serviceSlider-info">
                                      <div class="serviceSlider-info__title">{{ infoItem.title }}</div>
                                      <ul  class="serviceSlider-info__list">
                                          <li v-for="(infoList,infoListIndex) in infoItem.infoListItem" :key="infoListIndex" class="serviceSlider-info__list-item">
                                              {{ infoList.text }}
                                          </li>
                                      </ul>
                                  </div>
                                  <div v-show="slideItem.deadline" class="serviceSlider-info__deadline-info">
                                      <span class="serviceSlider-info__deadline-text">Срок выполнения:</span>
                                      <span class="serviceSlider-info__deadline-days">{{slideItem.deadline}}</span>
                                  </div>
                              </div>
                              <ul class="sliderNav">
                                  <li @click="showPrev(`slick${indexTab}`)" class="sliderNav__btn sliderNav__btn-left"></li>
                                  <li @click="showNext(`slick${indexTab}`)" class="sliderNav__btn sliderNav__btn-right"></li>
                              </ul>
                          </div>
                       </div>
                   </div>
                   <div v-show="slideItem.gallery" class="serviceSlider-tab-footer">
                       <div class="container serviceSlider-tab-footer__container">
                           <ul class="serviceSlider-tab-footer__list">
                               <li v-for="(galleryItem,galleryIndex) in slideItem.gallery" :key="galleryIndex" :class="{active: galleryIndex === 0 }" @click="changeImg($event.target)" class="serviceSlider-tab-footer__list-item">
                                   <img :src="galleryItem.img.sourceUrl" :alt="galleryItem.img.altText" />
                               </li>
                               <li class="serviceSlider-tab-footer__list-item empty">
                                   <ul class="sliderNav">
                                       <li @click="showPrev(`slick${indexTab}`)" class="sliderNav__btn sliderNav__btn-left"></li>
                                       <li @click="showNext(`slick${indexTab}`)" class="sliderNav__btn sliderNav__btn-right"></li>
                                   </ul>
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
              serviceData: {},
              mainImg: '',
              settings: {
                  prevArrow: '#test'
              }
          }
      },
      methods: {
          //Смена картинки
          changeImg(event){
              console.log()
              if(!event.parentElement.classList.contains('active')){
                  let oldImg = event.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.serviceSlider-tab-header__img img').src
                  for(let item of event.parentElement.parentNode.children){
                      item.classList.remove('active')
                  }
                  event.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.serviceSlider-tab-header__img img').src = event.src
                  event.src = oldImg
                  event.parentElement.classList.add('active')
              }
          },
          changeTab(event,index){
              if(!event.classList.contains('active')){
                  for(let item of event.parentNode.children){
                      item.classList.remove('active')
                  }
                  event.classList.add('active')
                  for(let tab of event.parentNode.parentNode.children){
                      tab.classList.remove('active')
                  }
                  event.parentElement.parentElement.querySelector(`#tab-${index}`).classList.add('active')
              }
          },
          showNext(val) {
              this.$refs[val][0].next()
          },
          showPrev(val) {
              this.$refs[val][0].prev()
          },
      }
    }
</script>