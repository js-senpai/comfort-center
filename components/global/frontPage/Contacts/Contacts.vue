<template>
    <section  class="contacts">
        <div class="container">
            <div class="contacts-container">
                <h2 v-show="contactsData.title" class="title-section contacts-title">{{ contactsData.title }}</h2>
                <div v-html="contactsData.subtext" class="contacts__description" />
                <div  v-for="item in contactsList" :key="item.id" class="contacts__list-container">
                    <ul  class="contacts__list">
                        <li v-for="(itemList,index) in item.contactsContainer" :key="index" class="contacts__list-item">
                            <div class="contacts__list-icon">
                                <img :src="itemList.icon.sourceUrl" :alt="itemList.icon.altText" />
                            </div>
                            <div v-html="itemList.text" class="contacts__list-text" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-html="contactsData.map" class="contacts__map" />
    </section>
</template>
<style lang="sass">
    @import "sass/contacts"
</style>
<script>
    // Helpers
    import _get from "lodash/get"
    // Queries
    import FRONT_PAGE from "~/gql/queries/FrontPage"
    import stateHelper from "../../../../helpers/stateHelper"
    export default {
        async fetch(){
            const data = await this.$graphql.request(FRONT_PAGE)
            this.contactsData = _get(data, "nodeByUri.mainPage.contacts", {})
            this.contactsList = _get(data, "nodeByUri.mainPage.contacts.contactsList", {}).map((item)=>{
                return {
                    id: stateHelper.generateId(),
                    ...item
                }
            })
        },
        data(){
            return {
                contactsData: {},
                contactsList: []
            }
        },
    }

</script>