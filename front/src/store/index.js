import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './modules/user'
import adsStore from './modules/ads'
import citiesStore from './modules/cities'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    user: userStore,
    ads: adsStore,
    cities: citiesStore
  }
})
