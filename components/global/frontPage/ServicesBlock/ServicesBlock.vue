<template>
    <section class="service-section">
        <ServicesBlockTop :title="title" :subtitle="subtitle" :workTypes="workTypes" :img="img" />
        <ServicesBlockBottom :serviceList="serviceList" :galleryList="galleryList" :tablePrice="tablePrice" :infoText="infoText" />
        <ServicesBlockForm :titleForm="titleForm" />
    </section>
</template>
<style lang="sass">
    @import "sass/serviceBlock"
</style>
<script>
    export default {
        props: {
            title: {
                type: String,
                required: true
            },
            subtitle: {
                type: String,
                required: true
            },
            workTypes: {
                type: Array,
                required: true
            },
            img: {
                type: Object,
                required: true
            },
            serviceList: {
                type: Array,
                required: true
            },
            galleryList: {
                type: Array,
                required: true
            },
            tablePrice: {
                type: Object,
                required: true
            },
            infoText: {
                type: String,
                required: true
            },
            titleForm: {
                type: String,
                required: true
            }
        },
    }
</script>
