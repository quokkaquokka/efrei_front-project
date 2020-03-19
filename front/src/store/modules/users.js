import axios from 'axios'
import config from '../../client.config'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  connected: false,
  user: {
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    roles: [], // string array
    groups: [], // string array
    isActive: true,
    deleted: false,
    deletedDate: null,
    createdDate: null,
    lastModifiedDate: null,
    activeAfterDate: null,
    expirationDate: null
  },
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.connected,
  hasAccessRight: state => right => {
    if (state.user.role && state.user.role.rights) {
      return !!state.user.role.rights.find(r => r === right)
    }
    return false
  }
}
// POST /signin
// username et password

//POST /signup
/* const data = {
    password: this.password,
    email: this.email,
    firstname: this.firstname,
    lastname: this.lastname
  };*/
const actions = {
  async fetchUser ({ commit }) {
    commit('AUTH_REQUEST')
    try {
      const { data } = await axios.get(api('/me'))

      commit('AUTH_SUCCESS', data)
    } catch (err) {
      commit('AUTH_ERROR')
    }
  },

  async signin ({ commit }, { email, password }) {
    commit('AUTH_REQUEST')
    try {
      const { data } = await axios.post(api('/signin'), { email, password })
      commit('AUTH_SUCCESS', data)
    } catch (err) {
      commit('AUTH_ERROR')
    }
  },

  async signup ({ commit }, { email, password, firstname, lastname }) {
    commit('AUTH_REQUEST')
    try {
      const { data } = await axios.post(api('/signup'), { email, password, firstname, lastname })
      commit('AUTH_SUCCESS', data)
    } catch (err) {
      commit('AUTH_ERROR')
    }
  },

  async logout ({ commit }) {
    commit('AUTH_REQUEST')
    try {
      const { data } = await axios.post(api('/logout'))
      commit('UNSET_USER', data)
      commit('AUTH_SUCCESS')
    } catch (err) {
      commit('AUTH_ERROR')
    }
  }
}

const mutations = {
  AUTH_REQUEST (state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS (state, { username,
    firstname,
    lastname,
    email,
    password,
    roles, // string array
    groups, // string array
    isActive,
    deleted,
    deletedDate,
    createdDate,
    lastModifiedDate,
    activeAfterDate,
    expirationDate }) {
    state.status = 'success'
    state.connected = true
    state.user.firstname = firstname
    state.user.lastname = lastname
    state.user.email = email
    state.user.password = password
    state.user.roles = roles
    state.user.groups = groups
    state.user.isActive = isActive
    state.user.deleted = deleted
    state.user.deletedDate = deletedDate
    state.user.createdDate = createdDate
    state.user.lastModifiedDate = lastModifiedDate
    state.user.activeAfterDate = activeAfterDate
    state.user.expirationDate = expirationDate
  },
  AUTH_ERROR (state) {
    state.status = 'error'
    state.connected = false
  },
  UNSET_USER (state) {
    state.user.username = null
    state.user.firstname = null
    state.user.lastname = null
    state.user.email = null
    state.user.password = null
    state.user.roles = [] // string array
    state.user.groups = [] // string array
    state.user.isActive = true
    state.user.deleted = false
    state.user.deletedDate = null
    state.user.createdDate = null
    state.user.lastModifiedDate = null
    state.user.activeAfterDate = null
    state.user.expirationDate = null
    state.connected = false
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
