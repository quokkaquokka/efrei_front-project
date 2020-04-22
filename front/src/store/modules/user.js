import axios from 'axios'
import config from '../../client.config'
import router from '../../router/index'
import jwtDecode from 'jwt-decode'
import { setToken } from '../../services/session-manager'

/** @param {String} path */
function api (path) {
  return config.apiURL + path
}

const state = {
  connected: false,
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
  isAuthenticated: state => state.connected,
  getUser: state => state.user,
  hasAccessRight: state => state.user.scope.includes('admin'),
  state: state => state,
  status: state => state.status
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
      const decoded = jwtDecode(data)
      setToken(data)
      commit('AUTH_SUCCESS', { user: decoded })
      router.replace('/home')
    } catch (err) {
      commit('AUTH_ERROR')
    }
  },

  async signup ({ commit }, { email, password, firstname, lastname }) {
    commit('AUTH_REQUEST')
    try {
      const { data } = await axios.post(api('/auth/signup'), { email, password, firstname, lastname })
      commit('AUTH_SUCCESS', data)
    } catch (err) {
      commit('AUTH_ERROR')
    }
  },

  async logout ({ commit }) {
    commit('AUTH_REQUEST')
    try {
      const option = {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      const { data } = await axios.get(api('/auth/logout'), option)
      commit('UNSET_USER', data)
      localStorage.setItem('token', '')
      localStorage.setItem('tokenExpiry', null)
      router.replace('/signin')
    } catch (err) {
      commit('AUTH_ERROR')
    }
  },

  async forgottenPassword ({ commit }, { email }) {
    const options = {
      params: {
        email: email
      }
    }
    const { data } = await axios.get(api('/auth/forgotten-password'), options)
    // ecrire si l'utilisateur recoit bien le mail
  },

  async resetPassword ({ commit }, { password, resetToken }) {
    const options = {
      password: password,
      resetToken: resetToken
    }
    const { data } = await axios.post(api('/auth/reset-password'), options)
    router.replace('/signin')
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
