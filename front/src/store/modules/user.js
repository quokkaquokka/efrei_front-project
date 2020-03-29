import axios from 'axios'
import config from '../../client.config'
import router from '../../router/index'
import jwtDecode from 'jwt-decode'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  connected: false,
  token: null,
  tokenExpiryDate: null,
  user: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    scopes: [], // string array
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
  token: state => state.token,
  tokenExpiry: state => state.tokenExpiry,
  isAuthenticated: state => state.connected,
  getUser: state => state.user,
  hasAccessRight: state => right => {
    if (state.user.role && state.user.role.rights) {
      return !!state.user.role.rights.find(r => r === right)
    }
    return false
  }
}

const actions = {
  async fetchUser ({ commit }) {
    commit('AUTH_REQUEST')
    try {
      const { data } = await axios.get(api('/user'))
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
      // stock the token of the user
      state.token = data.token
      localStorage.setItem('token', state.token)
      // decode the token to have the expiration date
      const decoded = jwtDecode(data.token)
      state.tokenExpiryDate = decoded.exp
      localStorage.setItem('tokenExpiry', state.tokenExpiryDate)
      router.replace('/home')
    } catch (err) {
      commit('AUTH_ERROR')
    }
  },

  async signup ({ commit }, { email, password, firstname, lastname }) {
    commit('AUTH_REQUEST')
    try {
      const { data } = await axios.post(api('/signup'), { email, password, firstname, lastname })
      commit('AUTH_SUCCESS', data)
      router.replace('/home')
    } catch (err) {
      commit('AUTH_ERROR')
    }
  },

  async logout ({ commit }) {
    commit('AUTH_REQUEST')
    try {
      const { data } = await axios.post(api('/logout'))
      commit('UNSET_USER', data)
      router.replace('/signin')
    } catch (err) {
      commit('AUTH_ERROR')
    }
  }
}

const mutations = {
  AUTH_REQUEST (state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS (state, {
    user: {
      firstname,
      lastname,
      email,
      password,
      scopes, // string array
      groups, // string array
      isActive,
      deleted,
      deletedDate,
      createdDate,
      lastModifiedDate,
      activeAfterDate,
      expirationDate
    }
  }) {
    state.status = 'success'
    state.connected = true
    state.user.firstname = firstname
    state.user.lastname = lastname
    state.user.email = email
    state.user.password = password
    state.user.scopes = scopes
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
    state.connected = false
    state.token = null
    state.user.firstname = ''
    state.user.lastname = ''
    state.user.email = ''
    state.user.password = ''
    state.user.scopes = [] // string array
    state.user.groups = [] // string array
    state.user.isActive = true
    state.user.deleted = false
    state.user.deletedDate = null
    state.user.createdDate = null
    state.user.lastModifiedDate = null
    state.user.activeAfterDate = null
    state.user.expirationDate = null
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
