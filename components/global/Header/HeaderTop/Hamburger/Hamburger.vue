<template>
    <div
        class="header__top-hamburger"
        @click="toggleMenu()"
    >
        <div class="line line-1" />
        <div class="line line-2" />
        <div class="line line-3" />
    </div>
</template>
<style lang="sass">
    @import "sass/hamburger"
</style>
<script>
export default {
    methods: {
        toggleMenu() {
            if (this.$store.state.menuOpened) {
                this.$store.commit("SET_MENU", false)
            } else {
                this.$store.commit("SET_MENU", true)
            }
        },
    },
}
</script>

