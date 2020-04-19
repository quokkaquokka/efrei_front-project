// GET /cities -> recupere totue les annonces
// GET /cities/{id}  -> lit une annonce via l'id

// ATTENTION pour pouvoir modifier il faut un headers, afin que tous le monde ne puisse pas le modifier
// dans le header il faut mettre "Authorization"
// POST  /cities  -> ajoute une annonce
// PUT /cities/{id} -> modifie une annonce avec l'id
// DELETE /cities/{id} -> supprime l'annonce via l'id

import axios from 'axios'
import config from '../../client.config'
import _ from 'lodash'

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
  },
  removeCity (state, { cityId }) {
    const existing = state.cities.findIndex(e => e._id === cityId)
    if (existing !== -1) {
      state.cities.splice(existing, 1)
    }
  }
}

const getters = {
  getCityById: state => id => {
    return state.cities.find(_ => {
      return _._id === id
    })
  },
  getCitiesbyIds: state => citiesId => {
    return _.reduce(state.cities, (acc, o) => {
      if (citiesId.indexOf(o._id) >= 0) {
        acc.push(o)
      }
      return acc
    }, [])
  }
}

const actions = {
  async fetchCities ({ commit }, filters = undefined) {
    const { data } = await axios.get(api('/cities'), { params: { filters: filters } })
    data.forEach(d => commit('addCity', d))
  },

  async fetchCitiesbyIds ({ commit }, { ids }) {
    const { data } = await axios.get(api('/cities/ids'), { params: { ids: JSON.stringify(ids) } })
    data.forEach(d => commit('addCity', d))
  },

  async fetchCity ({ commit }, { id }) {
    const { data } = await axios.get(api('/cities/' + id))
    commit('addCity', data)
  },

  async createCity ({ commit }, { city }) {
    const { data } = await axios.post(api('/cities'), city)
    commit('addCity', data)
  },

  async deleteCity ({ commit }, { cityId }) {
    await axios.delete(api('/cities/' + cityId))
    commit('removeCity', { cityId })
  },

  async updateCity ({ commit }, { city }) {
    await axios.put(api('/cities'), city)
    commit('addCity', city)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
