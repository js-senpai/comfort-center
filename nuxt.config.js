require("dotenv").config()
export default {
    target: "static",
    env: {
        ...process.env,
    },

    /*
     ** Headers of the page
     */
    head: {
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
        script: [
            {
                src:
                    "https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver,smoothscroll&flags=gated",
                body: true,
            },
        ],
    },

    /*
     ** Default transition for all pages
     */
    pageTransition: {
        name: "fade",
        mode: "out-in",
    },

    /*
     ** Customize the progress-bar color
     ** See: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading
     */
    loading: {
        color: "#000000",
        height: "3px",
    },

    /*
     ** Global CSS
     */
    css: [
        "~/styles/css-variables.scss",
        "~/styles/global.scss",
        "~/styles/transitions.scss",
        "~/styles/fonts.css" // Be sure to turn on the font loader plugin and config it
    ],

    /*
     ** Load SCSS into each component
     */
    styleResources: {
        scss: [
            "~/styles/scss-variables.scss",
            "~/styles/mixins.scss",
            "~/styles/easings.scss",
        ],
    },

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: "~/plugins/global-component-loader.js" },
        { src: "~/plugins/global-directive-loader.js" },
        // { src: "~/plugins/google-gtag.client.js", mode: "client" },
        { src: "~/plugins/web-font-loader.client.js", mode: "client" },
        //{ src: "~/plugins/ip-geolocate.js" },
        { src: "~/plugins/vue-mask.js", mode: "client" },
        { src: "~/plugins/validate.js" },
        { src: "~/plugins/wow.js" },
    ],

    /*
     ** Nuxt.js modules
     */
    modules: [
        "nuxt-graphql-request",
        "@nuxtjs/style-resources",
        "@nuxtjs/sitemap",
        "nuxt-lazy-load",
        '@nuxtjs/axios'
    ],

    /*
     * Build modules
     */
    buildModules: ["@nuxtjs/dotenv", "~/modules/sitemapRouteGenerator",'@nuxtjs/tailwindcss', '@aceforth/nuxt-optimized-images'
    ],
    optimizedImages: {
        optimizeImages: true
    },
    components: true,
    /*
     ** GraphQL Request options.
     ** See: https://github.com/Gomah/nuxt-graphql-request
     */
    graphql: {
        AST: true,
        endpoint: "http://test.comfort-center.com/graphql",
        // options: {
        //     credentials: "include",
        //     mode: "cors",
        //     headers: {
        //         authorization: `Bearer ${process.env.BASIC_API_TOKEN || ""}`,
        //     },
        // },
    },

    /*
     ** Customize router
     */
    router: {
        linkExactActiveClass: "exact-active-link",
        linkActiveClass: "active-link",
        middleware: ["referrer", "preview-redirect"],
        prefetchLinks: true,
        linkPrefetchedClass: "link-prefetched",
        trailingSlash: true,
    },

    /*
     ** Server side middleware
     */
    serverMiddleware: [
        "~/middleware/preview-spa-mode.server.js",
        "~/middleware/redirect-trailing-slash.server.js",
    ],

    /*
     ** Build configuration
     */
    build: {
        extractCSS: true,
        /*Min all*/
        html:{
            minify:{
                collapseBooleanAttributes: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                processConditionalComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                trimCustomFragments: true,
                useShortDoctype: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyElements: true
            }
        },
        // This and the transpile code below fix an issue with the spread operator in Safari 10.
        babel: {
            plugins: ["@babel/plugin-proposal-object-rest-spread"],
        },
        transpile: ["ky", "vuex"],
        extend(config, ctx) {

            // Includes the Compiler version of Vue.
            // If you don't use the <wp-content> component, then you can delete this safely.
            config.resolve.alias["vue$"] = "vue/dist/vue.esm.js"

            // This stops a @nuxtjs/dotenv error.
            config.node = { fs: "empty" }

            // Remove SVG from default Nuxt webpack rules
            const svgRule = config.module.rules.find((rule) =>
                rule.test.test(".svg")
            )
            svgRule.test = /\.(png|jpe?g|gif|webp)$/i;

            // Use SVG loader for .svg files
            config.resolve.extensions.push(".svg")
            config.module.rules.push({
                test: /\.svg$/,
                use: [
                    "babel-loader",
                    // {
                    //     loader: "vue-svg-loader",
                    //     options: {
                    //         svgo: {
                    //             plugins: [{ removeViewBox: false }],
                    //         },
                    //     },
                    // },
                ],
            })
        },
    },

    /*
     ** Nuxt generate configuration. Used when generating a static site.
     */
    generate: {
        fallback: "404.html",
        interval: 500,
        concurrency: 300,
    },

    /*
     ** Setup for the Sitemap module.
     ** You can see output at /sitemap.xml
     ** SEE https://github.com/nuxt-community/sitemap-module
     */
    sitemap: {
        // If you are NOT using Netlify to host, you need to set the hostname
        hostname: process.env.URL || "http://localhost:3000",
        filter({ routes }) {
            // Don't allow these paths to show in sitemap.
            // Add anything you want to hide from the sitemap
            const excludedPaths = ["/wp-admin/"]

            return routes.filter((route) => {
                console.log(route)
                return !excludedPaths.includes(route.url)
            })
        },
    },

    /*
     ** Allow devices on local network to view the site at {your IP}:3000
     */
    server: {
        host: process.env.HOST || "0.0.0.0",
    },

    /*
     ** Storybook
     ** SEE https://storybook.nuxtjs.org/options
     */
    storybook: {
        stories: ["~/stories/**/*.stories.js"],
        webpackFinal(config, { configDir }) {
            // Allow webpack to auto-load .gql and .svg files
            config.resolve.extensions.push(".gql", ".svg")

            return config
        },
    },
}
