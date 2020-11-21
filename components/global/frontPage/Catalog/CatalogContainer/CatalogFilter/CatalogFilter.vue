<template>
    <div v-animate.repeat="'fadeInLeft'" class="catalog__filter">
        <div class="catalog__filter-title">Производитель</div>
        <ul class="catalog__filter-list" v-if="filters.length">
            <li v-for="item in filters" :key="item.id" class="catalog__filter-list-item">
                <label @change="getValue($event.target.value)" class="contact-form__checkbox-container catalog__filter-list-checkbox-container">
                    <div class="contact-form__checkbox-wrapper focus-within:border-blue-500">
                        <input  :value="item.name" :checked="item.enable" type="checkbox" class="contact-form__checkbox" required>
                        <svg class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                    </div>
                    <div class="contact-form__select-none">{{ item.name }}</div>
                </label>
            </li>
        </ul>
    </div>
</template>
<style lang="sass">
    @import "sass/catalogFilter"
</style>
<script>
    import { mapGetters, mapActions } from 'vuex'
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    export default {
        async fetch(){
            const data = await this.$graphql.request(FRONT_PAGE)
            const [{typeMaterial}] = _get(data, "nodeByUri.mainPage.catalog.catalogList", {})
            const getProducts = typeMaterial.map((item)=>{
                return item.products.map(currentItem=>{
                    if(currentItem.manufacturer !== undefined){
                        return {
                            name: currentItem.manufacturer
                        }
                    }

                })
            }).flat(2)
            this.setFilters([...new Map(getProducts.map(obj => [JSON.stringify(obj), obj])).values()])
        },
        computed: {
            ...mapGetters({
                filters: 'catalog/getFilters',
                products: 'catalog/getFilteredProducts',
            })
        },
        methods: {
            ...mapActions({
                setFilters: 'catalog/SET_FILTERS',
                toggleFilters: 'catalog/TOGGLE_FILTERS',
                run: 'catalog/run'
            }),
            // Toggle Filters
            async getValue(event){
                this.toggleFilters(event)
                this.run(this.products)
            }
        }
    }
</script>