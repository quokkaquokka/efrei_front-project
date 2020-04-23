import axios from 'axios'
import config from '../../client.config'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  citiesUser: []
}
const mutations = {
  addCityUser (state, cityUser) {
    const existing = state.citiesUser.findIndex(e => e._id === cityUser._id)
    if (existing !== -1) {
      state.citiesUser[existing] = cityUser
    } else {
      state.citiesUser.push(cityUser)
    }
  },
  removeCityUser (state, cityUserId) {
    const existing = state.citiesUser.findIndex(e => e._id === cityUserId)
    if (existing !== -1) {
      state.citiesUser.splice(existing, 1)
    }
  }
}

const getters = {
  getCityUserByCityId: state => id => {
    return state.citiesUser.find(_ => _.cityId === id)
  },
  getCitiesUser: state => {
    return state.citiesUser
  }
}

const actions = {
  async fetchCitiesUser ({ commit }, { uid }) {
    const { data } = await axios.get(api('/cities/user/' + uid))
    data.forEach(d => commit('addCityUser', d))
  },

  async fetchCityUser ({ commit }, { uid, cid }) {
    const { data } = await axios.get(api('/cities/' + cid + '/user/' + uid))
    commit('addCityUser', data)
    return data
  },

  async createCityUser ({ commit }, { cityUser }) {
    const { data } = await axios.post(api('/cities/user'), cityUser)
    commit('addCityUser', data)
  },

  async deleteCityUser ({ commit }, { cityId }) {
    await axios.delete(api('/cities/user/' + cityId))
    commit('removeCityUser', cityId)
  },

  async updateCityUser ({ commit }, { cityUser }) {
    const { data } = await axios.put(api('/cities/user'), cityUser)
    commit('addCityUser', data)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
