import axios from "axios";

// const baseURL = "http://127.0.0.1:3000";
const baseURL = 'https://sanookkit-server.vercel.app'
const storageBaseURL = 'https://www.sanookkit.com/sanookkit_backend'

export const actions = {
  async getStudentList({ commit }) {
    try {
        commit("loadingFullPageMutation", true);
      return await axios
        .get(`${baseURL}/student/`)
        .then((response) => {
            commit("loadingFullPageMutation", false);
          // console.log(response.data)
          commit("studentListMutation", response.data);
        });
    } catch (err) {
        commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async addNewStudent({ commit }, student) {
    try {
        commit("loadingFullPageMutation", true);
      return await axios
        .post(`${baseURL}/student/`, student)
        .then((response) => {
            commit("loadingFullPageMutation", false);
          // console.log(response.data)
          // commit("studentListMutation", response.data);
        });
    } catch (err) {
        commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async addNewStudentList({ commit }, studentList) {
    try {
        commit("loadingFullPageMutation", true);
      return await axios
        .post(`${baseURL}/studentList/`, studentList)
        .then((response) => {
            commit("loadingFullPageMutation", false);
          // console.log(response.data)
          // commit("studentListMutation", response.data);
        });
    } catch (err) {
        commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async deleteStudent({ commit }, id) {
    try {
        commit("loadingFullPageMutation", true);
      return await axios
        .delete(`${baseURL}/student/${id}`)
        .then((response) => {
            commit("loadingFullPageMutation", false);
          // console.log(response.data)
          // commit("studentListMutation", response.data);
        });
    } catch (err) {
        commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async updateAllStudentList({ commit }) {
    try {
        commit("loadingFullPageMutation", true);
      return await axios
        .patch(`${baseURL}/allStudent`)
        .then((response) => {
            commit("loadingFullPageMutation", false);
        });
    } catch (err) {
        commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async updateStudent({ commit }, payload) {
    try {
      //   commit("loadingFullPageMutation", true);
      return await axios
        .patch(`${baseURL}/student/${payload._id}`, payload)
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
        commit("loadingFullPageMutation", true);
      return await axios
        .get(`${baseURL}/learning-resource/`)
        .then((response) => {
            commit("loadingFullPageMutation", false);
          // console.log(response.data)
          commit("learningResourceListMutation", response.data);
        });
    } catch (err) {
        commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async addLearningResourceImageList({ commit }, learning_resources) {
    try {
        commit("loadingFullPageMutation", true);
      return await axios
        .post(`${storageBaseURL}/test-resource/`, learning_resources, {headers: {
                  'Content-Type': 'multipart/form-data'
        }})
        .then((response) => {
          console.log(response)
          commit("learningResourceMutation", response.data);
            commit("loadingFullPageMutation", false);
          // console.log(response.data)
          // commit("studentListMutation", response.data);
        });
    } catch (err) {
        commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  // async addCliImageList({ commit }, cliImg) {
  //   try {
  //     //   commit("loadingFullPageMutation", true);
  //     return await axios
  //       .post(`${storageBaseURL}/upload-cli-img/`, cliImg, {headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }})
  //       .then((response) => {
  //         console.log(response)
  //         //   commit("loadingFullPageMutation", false);
  //         // console.log(response.data)
  //         // commit("studentListMutation", response.data);
  //       });
  //   } catch (err) {
  //     //   commit("loadingFullPageMutation", false);
  //     console.error(err);
  //   }
  // },
  async addLearningResourceList({ commit }, learning_resources) {
    try {
        commit("loadingFullPageMutation", true);
      return await  axios
      .post(`${baseURL}/learning-resource/`, learning_resources).then((res) => {
        console.log('uploaded')
        commit("loadingFullPageMutation", false);
      })
    } catch (err) {
        commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async deleteLearningResource({ commit }, id) {
    try {
        commit("loadingFullPageMutation", true);
      return await axios
        .delete(`${baseURL}/learning-resource/${id}`)
        .then((response) => {
          console.log(response)
          commit("learningResourceMutation", response.data);
            commit("loadingFullPageMutation", false);
          // console.log(response.data)
          // commit("studentListMutation", response.data);
        });
    } catch (err) {
        commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async deleteLearningResourceImage({ commit }, learning_resources) {
    try {
        commit("loadingFullPageMutation", true);
      return await axios
        .post(`${storageBaseURL}/delete-learning-resource/`, learning_resources, {headers: {
          'Content-Type': 'multipart/form-data'
          }})
        .then((response) => {
            commit("loadingFullPageMutation", false);
          // console.log(response.data)
          // commit("studentListMutation", response.data);
        });
    } catch (err) {
        commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  // user
  async getAllUser({ commit }) {
    try {
      commit("loadingFullPageMutation", true);
      return await axios.get(`${baseURL}/user`, {
        headers: {
          'access_token': 'testToken'
        }
      })
      .then((response) => {
        // return response
        commit("loadingFullPageMutation", false);
        commit('userListMutation', response.data)
      })
    } catch (error) {
      commit("loadingFullPageMutation", false);
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
  async addCliImgAssetList({ commit }, cliImgAsset) {
    try {
      commit("loadingFullPageMutation", true);
      return await axios
        .post(`${storageBaseURL}/cli-img-asset/`, cliImgAsset, {headers: {
                  'Content-Type': 'multipart/form-data'
        }})
        .then((response) => {
          console.log(response)
          commit("loadingFullPageMutation", false);
          commit("cliImgAssetInfoMutation", response.data)
        });
    } catch (err) {
      commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async addCliAssetList({ commit }, cliImgAsset) {
    try {
      commit("loadingFullPageMutation", true);
      return await  axios
      .post(`${baseURL}/cliImgAsset/`, cliImgAsset).then((res) => {
        commit("loadingFullPageMutation", false);
        console.log('uploaded')
      })
    } catch (err) {
      commit("loadingFullPageMutation", false);
      console.error(err);
    }
  },
  async signin({ commit }, user) {
    try {
      commit("loadingFullPageMutation", true);
      return await axios.post(`${baseURL}/signin`, user).then((res) => {
        commit("loadingFullPageMutation", false);
        commit('signinMutation', res.data)
      })
    } catch (err) {
      commit("loadingFullPageMutation", false);
      console.log(err)
    }
  }
}