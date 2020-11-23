<template>
    <div :class="classes">
        <template v-if="!parsedPage.isFrontPage">
            <div class="container wp-page">
                <wp-content
                        :html="parsedPage.encodedContent"
                        :enable-styles="true"
                        v-show="!parsedPage.isFrontPage"
                />
            </div>
        </template>
    </div>
</template>

<script>
// Helpers
import _get from "lodash/get"

// Queries
import HOME from "~/gql/queries/Home"
export default {
    scrollToTop: false,
    async asyncData({ $graphql,params,error }) {
        const data = await $graphql.request(HOME, {
            uri: params.page,
        })
        const getPage = _get(data, "nodeByUri", {})
        if(getPage === null){
            error({ statusCode: 404, message: '' })
        }
        return {
            page: getPage,
        }
    },
    computed: {
        classes() {
            return ["page", "page-home"]
        },
        parsedPage() {
            // Shape data from WP-GQL to work with template
            return {
                ...this.page,
                featuredImage: _get(this, "page.featuredImage.node", {}),
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.page-home {
    min-height: var(--unit-100vh);
}
</style>
