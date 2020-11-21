<template>
    <div class="catalog-container">
       <CatalogNav />
       <CatalogTypes />
       <CatalogFilter class="block lg:hidden" />
       <CatalogProducts />
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    import CatalogNav from "./CatalogNav/CatalogNav"
    import CatalogTypes from "./CatalogTypes/CatalogTypes"
    import CatalogProducts from "./CatalogProducts/CatalogProducts"
    export default {
        components: {CatalogProducts, CatalogTypes, CatalogNav},
        async fetch(){
            const data = await this.$graphql.request(FRONT_PAGE)
            const catalog = _get(data, "nodeByUri.mainPage.catalog.catalogList", {})
            await this.setCatalog(catalog)
        },
        methods: {
            ...mapActions({
                setCatalog: 'catalog/SET_CATALOG'
            }),
        }
    }
</script>