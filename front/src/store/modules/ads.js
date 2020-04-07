import axios from 'axios'
import config from '../../client.config'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  ads: []
}

const getters = {
  getAdById: state => id => state.ads.find(_ => _.id === parseInt(id))
}

const mutations = {
  addAd (state, ad) {
    const existing = state.ads.findIndex(e => e._id === ad._id)
    if (existing !== -1) {
      state.ads[existing] = ad
    } else {
      state.ads.push(ad)
    }
  },
  removeAd (state, { adId }) {
    const existing = state.ads.findIndex(e => e.id === adId)
    if (existing !== -1) {
      state.ads.splice(existing, 1)
    }
  }
}

const actions = {
  async fetchAds ({ commit }) {
    const { data } = await axios.get(api('/ads'))
    data.forEach(d => commit('addAd', d))
  },

  async fetchAd ({ commit }, { id }) {
    const { data } = await axios.get(api('/ads/' + id))
    commit('addAd', data)
  },

  async createAd ({ commit }, { ad }) {
    const { data } = await axios.post(api('/ads'), ad)
    commit('addAd', data)
  },

  async deleteAd ({ commit }, { adId }) {
    await axios.delete(api('/ads/' + adId))
    commit('removeAd', { adId })
  },

  async updateAd ({ commit }, { ad }) {
    const { data } = await axios.put(api('/ads'), ad)
    commit('addAd', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
