<template>
    <section class="catalog">
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