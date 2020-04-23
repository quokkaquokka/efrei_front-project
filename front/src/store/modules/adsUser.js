import axios from 'axios'
import config from '../../client.config'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  adsUser: []
}
const mutations = {
  addAdUser (state, adUser) {
    const existing = state.adsUser.findIndex(e => e._id === adUser._id)
    if (existing !== -1) {
      state.adsUser[existing] = adUser
    } else {
      state.adsUser.push(adUser)
    }
  },
  removeAdUser (state, adUserId) {
    const existing = state.adsUser.findIndex(e => e._id === adUserId)
    if (existing !== -1) {
      state.adsUser.splice(existing, 1)
    }
  }
}

const getters = {
  getAdUserByAdId: state => id => {
    return state.adsUser.find(_ => _.adId === id)
  },
  getAdsUser: state => {
    return state.adsUser
  }
}

const actions = {
  async fetchAdsUser ({ commit }, { uid }) {
    const { data } = await axios.get(api('/ads/user/' + uid))
    data.forEach(d => commit('addAdUser', d))
  },

  async fetchAdUser ({ commit }, { uid, aid }) {
    const { data } = await axios.get(api('/ads/' + aid + '/user/' + uid))
    commit('addAdUser', data)
    return data
  },

  async createAdUser ({ commit }, { adUser }) {
    const { data } = await axios.post(api('/ads/user'), adUser)
    commit('addAdUser', data)
  },

  async deleteAdUser ({ commit }, { adId }) {
    await axios.delete(api('/ads/user/' + adId))
    commit('removeAdUser', adId)
  },

  async updateAdUser ({ commit }, { adUser }) {
    const { data } = await axios.put(api('/ads/user'), adUser)
    commit('addAdUser', data)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
