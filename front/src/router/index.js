import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import SignIn from '../views/Sign.vue'
import Ads from '../views/ListAds.vue'
import Ad from '../views/Ad.vue'
import Cities from '../views/ListCities.vue'
import City from '../views/City.vue'
import DashboardCities from '../views/DashboardCities.vue'
import DashboardAds from '../views/DashboardAds.vue'
import AddCity from '../views/AddCity.vue'
import AddAd from '../views/AddAd.vue'
import ResetPassword from '../views/ResetPassword.vue'

Vue.use(Router)

async function beforeEnter (_to, _from, next) {
  if (!store.getters['user/isAuthenticated']) {
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/')
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'signin'
      }
    },
    {
      path: '/ad/:id',
      name: 'ad',
      component: Ad,
      beforeEnter
    },
    {
      path: '/addad/:id?',
      name: 'addad',
      component: AddAd,
      beforeEnter
    },
    {
      path: '/ads',
      name: 'ads',
      component: Ads,
      beforeEnter
    },
    {
      path: '/addcity/:id?',
      name: 'addcity',
      component: AddCity,
      beforeEnter
    },
    {
      path: '/auth/reset-password/:token',
      name: 'resetpassword',
      component: ResetPassword
    },
    {
      path: '/city/:id',
      name: 'city',
      component: City,
      beforeEnter
    },
    {
      path: '/cities',
      name: 'cities',
      component: Cities,
      beforeEnter
    },
    {
      path: '/dashads',
      name: 'dashads',
      component: DashboardAds,
      beforeEnter
    },
    {
      path: '/dashcities',
      name: 'dashcities',
      component: DashboardCities,
      beforeEnter
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    }
  ]
})
