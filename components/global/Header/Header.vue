<template>
    <fixed-header
        :threshold="400"
        @change="updateFixedStatus"
    >
        <header class="header">
            <div
                class="header-overlay"
                :class="{active:this.$store.state.menuOpened}"
            >
                <div class="header-container">
                    <HeaderTop />
                    <HeaderBottom />
                </div>
            </div>
        </header>
    </fixed-header>
</template>
<style lang="sass">
@import "sass/header"
</style>
<script>
import FixedHeader from 'vue-fixed-header'
export default {
    components: {
        FixedHeader
    },
    data(){
        return {
            isFixed: false
        }
    },
    methods: {
        updateFixedStatus(next){
            this.isFixed = next
        }
    }
}
</script>