<template>
    <header class="header">
        <div class="header-overlay" :class="{active:this.$store.state.menuOpened}">
            <div class="header-container">
                <HeaderTop />
                <HeaderBottom />
            </div>
        </div>
    </header>
</template>
<style lang="sass">
    @import "sass/header"
</style>
<script>
    export default {

    }
</script>