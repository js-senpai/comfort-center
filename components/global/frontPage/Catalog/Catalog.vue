<template>
    <section class="catalog" id="service-4">
        <div class="container">
            <CatalogTop  />
            <div class="catalog__wrapper">
               <CatalogFilter class="hidden lg:block" />
               <CatalogContainer />
            </div>
            <CatalogGallery />
        </div>
    </section>
</template>
<style lang="sass">
    @import "sass/catalog"
</style>