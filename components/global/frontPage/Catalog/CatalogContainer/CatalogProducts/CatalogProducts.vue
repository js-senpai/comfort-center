<template>
    <div class="catalog__products-container">
        <div  v-animate.repeat="'fadeInRight'"  v-if="products.length" class="catalog__products">
            <transition-group  tag="div"
                               name="item"
                               @after-enter="enter()"
                               class="catalog_products-list">
                <div  v-for="(item,index) in products" v-if="(index<idx)&&(index<productsToShow)" :key="item.id" :data-id="item.id" class="catalog__products-list-item">
                    <header class="catalog__products-header" :data-category="item.manufacturer">
                        <div class="catalog__products-img">
                            <img :src="item.img.sourceUrl" :alt="item.img.altText" />
                        </div>
                        <div class="catalog__products-title">{{ item.name }}</div>
                    </header>
                    <footer class="catalog__products-footer">
                        <div class="catalog__products-description" v-html="item.desc" />
                        <button @click="TOGGLE_MODAL({product: item.name,isActive: true})" type="button" class="contact-form__submit catalog__products-submit">Заказать</button>
                    </footer>
                </div>
            </transition-group>
        </div>
        <transition name="fade">
            <button type="button" v-show="products.length> productsToShow || productsToShow < products.length" @click="loadMore()" class="loadMore">
                <span class="loadMore-text">Показать ещё</span>
                <span class="loadMore-icon">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </span>
            </button>
        </transition>
    </div>
</template>
<style lang="sass">
    @import "sass/catalogProducts"
</style>
<script>
    import { mapGetters,mapActions,mapMutations } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                products: 'catalog/getFilteredProducts',
                idx: 'catalog/getIdx',
                productsToShow: 'catalog/getProductsToShow'
            })
        },
        mounted() {
            this.run()
        },
        methods: {
            ...mapActions({
                run: 'catalog/run',
                enter: 'catalog/enter',
            }),
            ...mapMutations({
                loadMore: 'catalog/LOAD_MORE',
                TOGGLE_MODAL: 'catalog/TOGGLE_MODAL'
            })
        },
    }
</script>