<template>
    <div class="header__bottom">
        <div class="container header__bottom-container">
            <wp-menu location="MAIN_MENU" class="container header__bottom-menu"   :class="{active:this.$store.state.menuOpened}" />
        </div>
    </div>
</template>
<style lang="sass">
  @import "sass/headerBottom"
</style>