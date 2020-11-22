<template>
    <section v-animate.repeat="'fadeInLeft'"  class="advantages">
        <div class="container">
            <h2 v-show="title" class="title-section advantages-title">{{ title }}</h2>
            <ul v-show="advantagesList.length" class="advantages-list">
                <li v-for="item in advantagesList" :key="item.id"  class="advantages-list-item">
                    <div class="advantages-list-icon">
                        <div class="advantages-list-icon-container">
                            <img :src="item.icon.sourceUrl" :alt="item.icon.altText">
                        </div>
                    </div>
                    <div class="advantages-list-title">{{ item.title }}</div>
                    <div class="advantages-list-description">
                        {{ item.description }}
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>
<style lang="sass">
    @import "sass/advantages"
</style>
<script>
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    import stateHelper from "../../../../helpers/stateHelper"
    export default {
        async fetch() {
            const data = await this.$graphql.request(FRONT_PAGE)
            this.title = _get(data, "nodeByUri.mainPage.advantages.title", {})
            this.advantagesList = _get(data, "nodeByUri.mainPage.advantages.advantagesList", {}).map((item)=>{
                return {
                    id: stateHelper.generateId(),
                    ...item
                }
            })
        },
        data(){
            return {
                title: null,
                advantagesList: []
            }
        }
    }
</script>