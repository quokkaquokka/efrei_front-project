// GET /cities -> recupere totue les annonces
// GET /cities/{id}  -> lit une annonce via l'id

// ATTENTION pour pouvoir modifier il faut un headers, afin que tous le monde ne puisse pas le modifier
// dans le header il faut mettre "Authorization"
// POST  /cities  -> ajoute une annonce
// PUT /cities/{id} -> modifie une annonce avec l'id
// DELETE /cities/{id} -> supprime l'annonce via l'id

import axios from 'axios'
import config from '../../client.config'

// GET /ads -> recupere totue les annonces
// GET /ads/{id}  -> lit une annonce via l'id
/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  cities: []
}
const mutations = {
  addCity (state, city) {
    const existing = state.cities.findIndex(e => e._id === city._id)
    if (existing !== -1) {
      state.cities[existing] = city
    } else {
      state.cities.push(city)
    }
  }
}

const getters = {
  getCityById: state => id => {
    return state.cities.find(_ => {
      return _._id === id
    })
  }
}

const actions = {
  async fetchCities ({ commit }) {
    const { data } = await axios.get(api('/cities'))
    data.forEach(d => commit('addCity', d))
  },

  async fetchCity ({ commit }, { id }) {
    const { data } = await axios.get(api('/cities/' + id))
    commit('addCity', data)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
