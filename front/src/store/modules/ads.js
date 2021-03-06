import axios from 'axios'
import config from '../../client.config'
import _ from 'lodash'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  ads: []
}

const getters = {
  getAdById: state => id => {
    return state.ads.find(_ => {
      return _._id === id
    })
  },
  getAdsbyIds: state => adsId => {
    return _.reduce(state.ads, (acc, o) => {
      if (adsId.indexOf(o._id) >= 0) {
        acc.push(o)
      }
      return acc
    }, [])
  }
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
    const existing = state.ads.findIndex(e => e._id === adId)
    if (existing !== -1) {
      state.ads.splice(existing, 1)
    }
  },
  clearAll () {
    state.ads = []
  }
}

const actions = {
  async fetchAds ({ commit }, filters = undefined) {
    commit('clearAll')
    const { data } = await axios.get(api('/ads'), { params: { filters: filters } })
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
