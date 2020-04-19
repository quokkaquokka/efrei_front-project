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
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    scope: [] // string array
  },
  status: ''
}

const getters = {
  token: state => state.token,
  tokenExpiry: state => state.tokenExpiry,
  isAuthenticated: state => state.connected,
  getUser: state => state.user,
  hasAccessRight: state => state.user.scope.includes('admin')
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
      const { data } = await axios.post(api('/auth/login'), { email, password })
      // stock the token of the user
      state.token = data
      localStorage.setItem('token', state.token)
      // decode the token to have the expiration date
      const decoded = jwtDecode(data)
      state.tokenExpiryDate = decoded.exp
      localStorage.setItem('tokenExpiry', state.tokenExpiryDate)
      commit('AUTH_SUCCESS', { user: decoded })
      router.replace('/home')
    } catch (err) {
      commit('AUTH_ERROR')
      console.log('error', err)
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
      const { data } = await axios.post(api('/auth/logout'))
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
      _id,
      firstname,
      lastname,
      email,
      scope // string array
    }
  }) {
    state.status = 'success'
    state.connected = true
    state.user._id = _id
    state.user.firstname = firstname
    state.user.lastname = lastname
    state.user.email = email
    state.user.scope = scope
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
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
