<template>
    <div class="formModal-overlay" v-show="modal.enable" :class="{active: modal.enable}" @click="TOGGLE_MODAL({enable: false,message: null})">
        <transition name="slideUp">
            <div id="myModal" class="formModal h-auto w-11/12 md:w-1/2 p-5   rounded-md" v-if=" modal.enable" :class="{active: modal.enable}">

                <div class="flex flex-col w-full h-auto ">
                    <!-- Header -->
                    <div class="flex w-full h-auto justify-end items-center">
                        <div @click="TOGGLE_MODAL({enable: false,message: null})" class="flex w-1/12 h-auto justify-center cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </div>
                        <!--Header End-->
                    </div>
                    <!-- Modal Content-->
                    <div class="flex w-full h-auto py-10 px-2 justify-center items-center  text-center font-bold text-xl">
                        {{modal.message}}
                    </div>
                    <!-- End of Modal Content-->
                </div>
            </div>
        </transition>
    </div>
</template>
<style lang="sass">
    @import "sass/formModal"
</style>
<script>
    import { mapGetters,mapMutations } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
               modal: 'formModal/getModal'
            })
        },
        methods: {
            ...mapMutations({
                TOGGLE_MODAL: 'formModal/TOGGLE_MODAL'
            })
        }
    }
</script>