import axios from "axios";

const baseURL = "http://127.0.0.1:3000";

export const actions = {
  async getStudentList({ commit }) {
    try {
      //   commit("loadingFullPageMutation", true);
      return await axios
        .get(`${baseURL}/student/`)
        .then((response) => {
          //   commit("loadingFullPageMutation", false);
          // console.log(response.data)
          commit("studentListMutation", response.data);
        });
    } catch (err) {
      //   commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async addNewStudent({ commit }, student) {
    try {
      //   commit("loadingFullPageMutation", true);
      return await axios
        .post(`${baseURL}/student/`, student)
        .then((response) => {
          //   commit("loadingFullPageMutation", false);
          // console.log(response.data)
          // commit("studentListMutation", response.data);
        });
    } catch (err) {
      //   commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async deleteStudent({ commit }, id) {
    try {
      //   commit("loadingFullPageMutation", true);
      return await axios
        .delete(`${baseURL}/student/${id}`)
        .then((response) => {
          //   commit("loadingFullPageMutation", false);
          // console.log(response.data)
          // commit("studentListMutation", response.data);
        });
    } catch (err) {
      //   commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async updateStudent({ commit }, payload) {
    try {
      //   commit("loadingFullPageMutation", true);
      return await axios
        .put(`${baseURL}/student/${payload._id}`, payload)
        .then((response) => {
          //   commit("loadingFullPageMutation", false);
          // console.log(response.data)
          // commit("studentListMutation", response.data);
        });
    } catch (err) {
      //   commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async getLearningResourceList({ commit }) {
    try {
      //   commit("loadingFullPageMutation", true);
      return await axios
        .get(`${baseURL}/learning-resource/`)
        .then((response) => {
          //   commit("loadingFullPageMutation", false);
          // console.log(response.data)
          commit("learningResourceListMutation", response.data);
        });
    } catch (err) {
      //   commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async addLearningResourceList({ commit }, learning_resources) {
    try {
      //   commit("loadingFullPageMutation", true);
      return await axios
        .post(`${baseURL}/learning-resource/`, learning_resources, {headers: {
          'Content-Type': 'multipart/form-data'
        }})
        .then((response) => {
          //   commit("loadingFullPageMutation", false);
          // console.log(response.data)
          // commit("studentListMutation", response.data);
        });
    } catch (err) {
      //   commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async deleteLearningResource({ commit }, id) {
    try {
      //   commit("loadingFullPageMutation", true);
      return await axios
        .delete(`${baseURL}/learning-resource/${id}`)
        .then((response) => {
          //   commit("loadingFullPageMutation", false);
          // console.log(response.data)
          // commit("studentListMutation", response.data);
        });
    } catch (err) {
      //   commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  // user
  async getAllUser({ commit }) {
    try {
      return await axios.get(`${baseURL}/user`, {
        headers: {
          'access_token': 'testToken'
        }
      })
      .then((response) => {
        // return response
        commit('userListMutation', response.data)
      })
    } catch (error) {
      console.log(error)
    }
  },
  async createUser({ commit }, newUser) {
    try {
      return await axios.post(`${baseURL}/user`, newUser)
      .then((response) => {
        // return response
        // commit('userListMutation', response.data)
      })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteUser({ commit }, id) {
    try {
      return await axios
        .delete(`${baseURL}/user/${id}`)
        .then((response) => {
        });
    } catch (err) {
      console.error(err);
    }
  },
  async signin({ commit }, user) {
    try {
      return await axios.post(`${baseURL}/signin`, user).then((res) => {
        commit('signinMutation', res.data)
      })
    } catch (err) {
      console.log(err)
    }
  }
}