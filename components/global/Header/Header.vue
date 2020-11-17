<template>
    <header class="header" :class="{fixed: isFixed}">
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
        data(){
            return {
                isFixed: false
            }
        },
        mounted() {
            // const currentCounter = this.$el
            // // const counterTop = currentCounter.getBoundingClientRect().top
            // const these = this
            window.addEventListener('scroll',  () => {
                if (window.pageYOffset > 800) {
                    this.isFixed = true
                    // this.removeEventListener('scroll', onScroll)
                } else {
                    this.isFixed = false
                }
            })
        }
    }
</script>