<template>
    <div :class="classes">
            <div class="container wp-page">
                <wp-content
                        :html="parsedPage.encodedContent"
                        :enable-styles="true"
                />
            </div>
    </div>
</template>

<script>
    // Helpers
    import _get from "lodash/get"

    // Queries
    import POST from "~/gql/queries/Post"
    export default {
        scrollToTop: false,
        async asyncData({ $graphql, route,error }) {
            const data = await $graphql.request(POST, {
                uri: route.path,
            })
            const getPost = _get(data, "nodeByUri", {})
            if(getPost === null){
                error({ statusCode: 404, message: '' })
            }
            return {
                post: getPost,
            }
        },
        computed: {
            classes() {
                return ["post", "post-page"]
            },
            parsedPage() {
                // Shape data from WP-GQL to work with template
                return {
                    ...this.post
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
