<template>
    <section class="serviceSlider-section">
        <div class="container serviceSlider-section-container">
            <h2 class="title-section serviceSlider-section__title" v-if="title">{{ title }}</h2>
        </div>
        <ul class="serviceSlider-tabNav">
            <li class="serviceSlider-tabNav-item"></li>
        </ul>
        <div class="serviceSlider-tab-container">
            <VueSlickCarousel :arrows="true" :dots="false" class="serviceSlider">
               <div class="serviceSlider-item">
                   <div class="serviceSlider-tab-header">
                       <div class="serviceSlider-tab-header__img">
                           <img src="" alt="" />
                       </div>
                       <div class="container">
                          <div class="serviceSlider-tab-header__container">
                              <h3 class="serviceSlider-title"></h3>
                              <div class="serviceSlider-info">
                                  <div class="serviceSlider-info__title"></div>
                                  <ul class="serviceSlider-info__list">
                                      <li class="serviceSlider-info__item"></li>
                                  </ul>
                                  <div class="serviceSlider-info__deadline-info">
                                      <span class="serviceSlider-info__deadline-text"></span>
                                      <span class="serviceSlider-info__deadline-days"></span>
                                  </div>
                              </div>
                          </div>
                       </div>
                   </div>
                   <div class="serviceSlider-tab-footer">
                       <div class="container serviceSlider-tab-footer__container">
                           <ul class="serviceSlider-tab-footer__list">
                               <li class="serviceSlider-tab-footer__list-item">
                                   <img src="" alt="" />
                               </li>
                           </ul>
                       </div>
                   </div>
               </div>
            </VueSlickCarousel>
        </div>
    </section>
</template>
<script>
    export default {

    }
</script>