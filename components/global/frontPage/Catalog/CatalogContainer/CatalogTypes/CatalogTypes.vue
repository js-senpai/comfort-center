<template>
    <ul v-show="productTypes.length"   class="catalog__types">
        <li v-for="(item,index) in productTypes"  :key="index"  :class="{active: item.enable}" @click="setType(item.name)" class="catalog__types-item">{{ item.name }}</li>
    </ul>
</template>
<style lang="sass">
    @import "sass/catalogTypes"
</style>
<script>
    import { mapGetters,mapActions } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                products: 'catalog/getFilteredProducts',
                productTypes: 'catalog/getTypes'
            })
        },
        methods: {
            ...mapActions({
                setType: 'catalog/CHANGE_TYPE',
            }),
        }
    }
</script>