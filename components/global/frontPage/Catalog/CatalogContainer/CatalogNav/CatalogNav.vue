<template>
    <ul v-animate.repeat="'fadeInRight'" class="tabNav catalogTabNav" v-show="categories.length">
        <li v-for="item in categories" class="tabNav-item catalogTabNavItem" :key="item.id" :class="{active: item.enable}" @click="setCategory(item.name)">{{ item.name }}</li>
    </ul>
</template>
<style lang="sass">
    @import "sass/catalogNav"
</style>
<script>
    import { mapGetters,mapActions } from 'vuex'
    export default {
         computed: {
             ...mapGetters({
                 categories: 'catalog/getCategories'
             })
         },
        methods: {
            ...mapActions({
                setCategory: 'catalog/CHANGE_CATEGORY',
            }),
        }
    }
</script>