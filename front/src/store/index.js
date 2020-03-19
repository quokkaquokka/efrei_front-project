import Vue from 'vue'
import Vuex from 'vuex'
import usersStore from './modules/users'
import adsStore from './modules/ads'
import citiesStore from './modules/cities'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    users: usersStore,
    ads: adsStore,
    cities: citiesStore,
  }
})
