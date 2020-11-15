<template>
    <div :class="classes">
        <template v-if="!parsedPage.isFrontPage">
            <div class="container wp-page">
                <wp-content
                        :html="parsedPage.encodedContent"
                        :enable-styles="true"
                        v-if="!parsedPage.isFrontPage"
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
    async asyncData({ $graphql, route }) {
        const data = await $graphql.request(HOME, {
            uri: route.path,
        })
        return {
            page: _get(data, "nodeByUri", {}),
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
