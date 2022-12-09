export const mutations = {
    studentListMutation(state, payload) {
        state.studentList = payload
    },
    learningResourceListMutation(state, payload) {
        state.learningResourceList = payload
    },
    learningResourceMutation(state, payload) {
        state.learningResource = payload
    },
    userListMutation(state, payload) {
        state.userList = payload
    },
    signinMutation(state, payload) {
        state.signin = payload
    },
    loadingFullPageMutation(state, payload) {
        state.loadingFullPage = payload
    },
    cliImgAssetInfoMutation(state, payload) {
        state.cliImgAssetInfo = payload
    }
}