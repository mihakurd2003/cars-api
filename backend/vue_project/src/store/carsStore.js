import axios from "axios";
import Vue from "vue";


export const carsStore = {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    allData: {
      'cars': [],
      'carParts': [],
      'countries': [],
    },
    cars: {},
    carPart: {},
    country: {}
  }),
  getters: {
    isLogged: state => !!state.token,
    getData(state) {
      return state.allData
    },
    getCar(state) {
      return state.cars
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    removeToken(state) {
      state.token = ''
      localStorage.setItem('token', '')
    },
    updateList(state, {array, id}) {
      state.allData[id] = array
    },
    updateObj(state, {obj, model}) {
      state[model] = obj
    }
  },
  actions: {
    async login({commit}, {username, password, router}) {
      return await axios.post('api-token-auth/', {
        username: username,
        password: password,
      }).then(response => {
        const token = response.data.token
        commit('setToken', token)
        router.push('/')
      }).catch(reject => {
        return reject.response.data.non_field_errors
      })
    },
    async getList(context, id) {
      try {
        let response = await Vue.prototype.$myAxios.get(`api/${id}/`)
        let array = response.data
        context.commit('updateList', {array, id})
      } catch (err) {
        console.log(err)
      }
    },
    async getObj(context, {model, id}) {
      try {
        let response = await Vue.prototype.$myAxios.get(`api/${model}/${id}/`)
        let obj = response.data
        context.commit('updateObj', {obj, model})
      } catch (err) {
        console.log(err)
      }
    }
  },
}