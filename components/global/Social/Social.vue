<template>
    <ul class="social-list" >
        <li v-for="(item,index) in socials" class="social-list-item" :key="index">
            <a :href="item.url">
                <span class="social-list-item__icon" v-if="item.icon.sourceUrl !== ''">
                    <img :src="item.icon.sourceUrl" :alt="item.icon.altText" />
                </span>
                <span class="social-list-item__text" v-if="item.text !== ''">{{ item.text }}</span>
            </a>
        </li>
    </ul>
</template>
<style lang="sass">
    @import "sass/social"
</style>
<script>
    export default {
        props: {
            socials: {
                type: Array,
                required: true
            }
        }
    }
</script>