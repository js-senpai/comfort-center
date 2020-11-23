<template>
    <section class="section section-404">
        <h2 v-if="error.statusCode === 404">
            Извините, кажется такой страницы не существует
        </h2>
        <h2 v-else>
            Упс! Кажется произошла ошибка {{ error.statusCode }}.
        </h2>

<!--        <p-->
<!--            v-show="error.message"-->
<!--            v-text="error.message"-->
<!--        />-->

        <a href="/">
            Вернуться на главную
        </a>
    </section>
</template>

<script>
export default {
    props: ["error"],
    mounted() {
        console.log(this.error)
    },
    computed:{
        domainURL(){
            return process.env.DOMAIN
        }
    },
    head() {
        return {
            title: `${this.error.statusCode} Error`
        }
    }
}
</script>
<style lang="scss">
.section-404 {
    min-height: var(--unit-100vh);

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: center;
}
</style>
