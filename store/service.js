export const state = () => ({
    modal: {
        enable: false,
        file: null,
        id: null,
        title: null
    },
})

// Define mutations
export const mutations = {
    TOGGLE_MODAL(state, payload) {
        state.modal = {...payload}
    },
}

export const getters = {
    getModal: state => state.modal
}