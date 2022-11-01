export const mutations = {
    studentListMutation(state, payload) {
        state.studentList = payload
    },
    learningResourceListMutation(state, payload) {
        state.learningResourceList = payload
    },
    userListMutation(state, payload) {
        state.userList = payload
    },
    signinMutation(state, payload) {
        state.signin = payload
    }
}