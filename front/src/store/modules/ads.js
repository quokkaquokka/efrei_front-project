<<<<<<< HEAD
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
    const existing = state.ads.findIndex(e => e.id === ad.id)
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

  async updateAd ({ commit }, { id, ad }) {
    const { data } = await axios.put(api('/ads/' + id), ad)
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
=======
import config from '../../client.config'

// GET /ads -> recupere totue les annonces
// GET ads/{id}  -> lit une annonce via l'id

// ATTENTION pour pouvoir modifier il faut un headers, afin que tous le monde ne puisse pas le modifier
// dans le header il faut mettre "Authorization"
// POST  /ads  -> ajoute une annonce
// PUT /ads/{id} -> modifie une annonce avec l'id
// DELETE /ads/{id} -> supprime l'annonce via l'id
>>>>>>> d75aefe2e8e55ac077b45f20155e8b4f28883c6d
