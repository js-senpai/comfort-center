import stateHelper from "../helpers/stateHelper"
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
                ...item,
                enable: false,
                id: stateHelper.generateId()
            }
        })
        state.filters[0].enable = true
    },
    // Toggle Filters
    TOGGLE_FILTERS(state,name){
        state.idx = 0
        state.productsToShow = 6
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
            state.categories = payload.map(({category})=>{
                return {
                    name: category,
                    enable: false,
                    id: stateHelper.generateId()
                }
            })
            state.categories[0].enable = true
            // Set product types
            const newTypes =  payload.map((item)=>{
                return item.typeMaterial.map(({name})=>{
                    return {
                        name: name,
                        enable: false
                    }
                })
            }).flat(1)
            state.productTypes = [...new Map(newTypes.map(obj => [JSON.stringify(obj), obj])).values()]
            state.productTypes[0].enable = true
            // Set all products
            state.allProducts = payload
        }
    },
    // Generate filtered products
    FILTER_PRODUCTS(state){
        if(state.allProducts.length){
            const getCategory = state.allProducts.map((item,index)=>{
                if(state.categories[index].enable){
                    if(state.categories[index].name == item.category){
                        return item.typeMaterial
                    }
                }
            }).flat(1).filter((x) => {
                return x !== undefined && x !== null
            })
            const getTypes = getCategory.map((type,typeIndex)=>{
                if(state.productTypes[typeIndex].enable){
                    if(state.productTypes[typeIndex].name == type.name){
                        return type.products
                    }
                }
            }).filter((x) => {
                return x !== undefined && x !== null
            }).flat(1)
            const getProducts =  getTypes.map((item)=>{
                if(state.filters.length){
                    if(state.filters.some(item=>item.enable === true)){
                        return state.filters.map((filter=>{
                            if(filter.enable){
                                if(filter.name == item.manufacturer){
                                    return  {
                                        id: stateHelper.generateId(),
                                        ...item
                                    }
                                }
                            }
                        }))
                    } else {
                        return  {
                            id: stateHelper.generateId(),
                            ...item
                        }
                    }
                } else {
                    return  {
                        id: stateHelper.generateId(),
                        ...item
                    }
                }
            }).flat(1).filter((x) => {
                return x !== undefined && x !== null
            }).flat(1)
            state.filteredProducts = getProducts
        }
    },
    // Change category
    CHANGE_CATEGORY(state,name){
        state.idx = 0
        state.productsToShow = 6
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
        state.idx = 0
        state.productsToShow = 6
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
          state.productModal.filter = Array.isArray(getFilters)?JSON.stringify(getFilters.map((item)=>{
              return item.name
          })): JSON.stringify(getFilters.name)
          const getCategories = state.categories.filter((item)=>{
              if(item.enable){
                  return item
              }
          })
          state.productModal.category = Array.isArray(getCategories)?JSON.stringify(getCategories.map((item)=>{
              return item.name
          })): JSON.stringify(getCategories.name)
          const getType = state.productTypes.filter((item)=>{
              if(item.enable){
                  return item
              }
          })
          state.productModal.type = Array.isArray(getType)?JSON.stringify(getType.map((item)=>{
              return item.name
          })): JSON.stringify(getType.name)
      }
    },
    //Animation
    run(state) {
        if(state.filteredProducts.length && state.idx == 0){
            state.idx += ({ 0: 1, [state.filteredProducts.length]: -1 })[state.idx]
        }
    },
    enter(state) {
        if(state.filteredProducts.length){
            state.idx = Math.min(state.filteredProducts.length, state.idx + 1)
        }
    },
    leave(state) {
        state.idx = Math.max(0, state.idx - 1)
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
        dispatch('FILTER_PRODUCTS')
        commit('run')
    },
    // Set catalog
    SET_CATALOG({commit,dispatch}, payload) {
        commit('SET_CATALOG',payload)
        dispatch('FILTER_PRODUCTS')
    },
    // Generate filtered products
    FILTER_PRODUCTS({commit}){
        commit('FILTER_PRODUCTS')
    },
    //Change category
    CHANGE_CATEGORY({commit,dispatch},name){
        commit('CHANGE_CATEGORY',name)
        dispatch('FILTER_PRODUCTS')
        commit('run')
    },
    // Change types
    CHANGE_TYPE({commit,dispatch},name) {
        commit('CHANGE_TYPE',name)
        dispatch('FILTER_PRODUCTS')
        commit('run')
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