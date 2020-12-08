import stateHelper from "../helpers/stateHelper"
const findEqualObjects =(someArray, otherArray) =>{
    let checkArray = []
    for(let item of someArray){
        if(otherArray.indexOf(item) !== -1){
            checkArray.push('true')
        } else {
            checkArray.push('false')
        }
    }
    return checkArray.includes('true')
}
export const state = () => ({
    filters: [],
    filteredProducts: [],
    allProducts: [],
    categories: [],
    productTypes: [],
    idx: 0,
    productsToShow: 6,
    modal: false,
    productModal: {
        name: '',
        price: '',
        filter: null,
        category: null,
        type: null
    }
})

// Define mutations
export const mutations = {
    // Set filters
    SET_FILTERS(state, payload) {
        state.filters = payload.map((item) => {
            return {
                name:item,
                enable: false,
                id: stateHelper.generateId()
            }
        })
        state.filters[0].enable = true
    },
    // Toggle Filters
    TOGGLE_FILTERS(state,name){
        if(state.filters.length){
            state.filters = state.filters.map(item=>{
                if(item.name == name){
                    return {
                        ...item,
                        enable: !item.enable
                    }
                }
                return item
            })
        }
    },
    // Set catalog data
    SET_CATALOG(state,payload){
        // Set categories
        if(payload !== undefined){
            const categories = payload.map(({category})=> category)
            state.categories = [...new Map(categories.map(obj => [JSON.stringify(obj), obj])).values()].map((item)=>{
                return {
                    name: item,
                    enable: false,
                    id: stateHelper.generateId()
                }
            })
            state.categories[0].enable = true

            // Set all products
            state.allProducts = payload
        }
    },
    // Generate filtered products
    FILTER_PRODUCTS(state,firstLoad=false){
        state.idx = 0
        state.productsToShow = 6
        if(state.allProducts.length){
            const getCategory = state.categories.map((item)=>{
                if(item.enable){
                    return item.name
                }
            }).filter((x) => {
                return x !== undefined && x !== null
            })
            const getFilters = state.filters.map((item)=>{
                if(item.enable){
                    return item.name
                }
            }).filter((x) => {
                return x !== undefined && x !== null
            })
            const getCategoriesProducts = state.allProducts.map((item)=>{
                if(item.category == getCategory) {
                    return item
                }
            }).filter((x) => {
                return x !== undefined && x !== null
            })
            const getFiltersProducts = getCategoriesProducts.length ? getCategoriesProducts.map((item)=>{
                    return item.manufacturer.map((manufItem)=>{
                        if(getFilters.indexOf(manufItem) !== -1){
                            return item
                        }
                    })
            }).flat(1).filter((x) => {
                return x !== undefined && x !== null
            }): []
            if(firstLoad){
                // Set product types
                const newTypes =  getFiltersProducts.map(({typeMaterial})=>{
                    return typeMaterial.map((item)=>{
                        return {
                            name: item,
                            enable: false,
                            id: stateHelper.generateId()
                        }
                    })

                }).flat(1).filter((x) => {
                    return x !== undefined && x !== null
                })
                state.productTypes = newTypes.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i)
                if(state.productTypes.length){
                    state.productTypes[0].enable = true
                }
            }
            const getTypes = state.productTypes.map((item)=>{
                if(item.enable){
                    return item.name
                }
            }).filter((x) => {
                return x !== undefined && x !== null
            })
            const getMaterial = getFiltersProducts.length ? getFiltersProducts.map((item)=>{
                    return item.typeMaterial.map((material)=>{
                        if(getTypes.indexOf(material) !== -1){
                            return  {
                                id: stateHelper.generateId(),
                                ...item
                            }
                        }
                    })
            }).flat(1).filter((x) => {
                return x !== undefined && x !== null
            }):[]
            if(getMaterial.length){
                state.filteredProducts = getMaterial.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
            } else  {
                state.filteredProducts = []
            }
        }
    },
    // Set viewed materials
    // SET_MATERIALS(state){
    //     if(state.filteredProducts.length > 0){
    //         state.productTypes = state.productTypes.filter((item)=>{
    //             return state.filteredProducts.filter(({typeMaterial})=>{
    //                 return typeMaterial.filter((type)=>{
    //                     item.viewed = true
    //                     return item
    //                 })
    //             })
    //         })
    //     }
    // },
    // Change category
    CHANGE_CATEGORY(state,name){
        state.categories = state.categories.map((item)=>{
            item.enable = false
            if(item.name == name){
                item.enable = true
            }
            return item
        })
    },
    // Change types
    CHANGE_TYPE(state,name){
        state.productTypes = state.productTypes.map((item)=>{
            item.enable = false
            if(item.name == name){
                item.enable = true
            }
            return item
        })
    },
    // Load more products
    LOAD_MORE(state){
        state.productsToShow += 3
    },
    // Toggle modal
    TOGGLE_MODAL(state,{product,price,isActive}){
        state.modal = isActive
        if(product !== null && price !== null){
            state.productModal.name = product
            state.productModal.price = price
            const getFilters = state.filters.filter((item)=>{
                if(item.enable){
                    return item
                }
            })
            state.productModal.filter = Array.isArray(getFilters)?JSON.stringify(getFilters.map(({name})=>{
                return name
            }).join(',','')): JSON.stringify(getFilters.name)
            const getCategories = state.categories.filter((item)=>{
                if(item.enable){
                    return item
                }
            })
            state.productModal.category = Array.isArray(getCategories)?JSON.stringify(getCategories.map(({name})=>{
                return name
            }).join(',','')): JSON.stringify(getCategories.name)
            const getType = state.productTypes.filter((item)=>{
                if(item.enable){
                    return item.name
                }
            })
            state.productModal.type = Array.isArray(getType)?JSON.stringify(getType.map(({name})=>{
                return name
            }).join(',','')): JSON.stringify(getType.name)
        }
    },
    //Animation
    run(state) {
        for(let i = 0;i<= state.filteredProducts.length;i++){
            state.idx = i
        }

    },
    enter(state) {
        if(state.filteredProducts.length){
            state.idx = Math.min(state.filteredProducts.length, state.idx + 1)
        }
    },
    leave(state) {
        if(state.filteredProducts.length){
            state.idx = Math.max(0, state.idx - 1)
        }
    },
}
export const actions = {
    // Set filters
    SET_FILTERS({commit}, payload) {
        commit('SET_FILTERS',payload)
    },
    // Toggle filters
    TOGGLE_FILTERS({commit,dispatch},payload){
        commit('TOGGLE_FILTERS',payload)
        dispatch('FILTER_PRODUCTS',true)
        // dispatch('SET_MATERIALS')
        commit('run')
    },
    // Set catalog
    SET_CATALOG({commit,dispatch}, payload) {
        commit('SET_CATALOG',payload)
        dispatch('FILTER_PRODUCTS',true)
        // dispatch('SET_MATERIALS')
    },
    // Generate filtered products
    FILTER_PRODUCTS({commit},payload){
        commit('FILTER_PRODUCTS',payload)
    },
    //Change category
    CHANGE_CATEGORY({commit,dispatch},name){
        commit('CHANGE_CATEGORY',name)
        dispatch('FILTER_PRODUCTS',true)
        // dispatch('SET_MATERIALS')
        dispatch('run')
    },
    // Change types
    CHANGE_TYPE({commit,dispatch},name) {
        commit('CHANGE_TYPE',name)
        dispatch('FILTER_PRODUCTS')
        commit('run')
    },
    // Set materials
    SET_MATERIALS({commit}){
        commit('SET_MATERIALS')
    },
    // Animations
    //Animation
    run({commit}) {
        commit('run')
    },
    enter({commit}) {
        commit('enter')
    },
    leave({commit}) {
        commit('leave')
    },
}
export const getters = {
    getFilters: state => state.filters,
    getCategories: state => state.categories,
    getTypes: state => state.productTypes,
    getFilteredProducts: state => state.filteredProducts,
    getIdx: state=>state.idx,
    getProductsToShow: state => state.productsToShow,
    getProductModal: state => state.productModal,
    getModal: state => state.modal
}