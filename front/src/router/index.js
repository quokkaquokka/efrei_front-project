import Vue from 'vue'
import Router from 'vue-router'
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

export default new Router({
  routes: [
    /* {
      path: '/',
      redirect: {
        name: 'signin'
      }
    }, */
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/ads',
      name: 'ads',
      component: Ads
    },
    {
      path: '/ad/:id',
      name: 'ad',
      component: Ad
    },
    {
      path: '/cities',
      name: 'cities',
      component: Cities
    },
    {
      path: '/city/:id',
      name: 'city',
      component: City
    },
    {
      path: '/dashcities',
      name: 'dashcities',
      component: DashboardCities
    },
    {
      path: '/dashads',
      name: 'dashads',
      component: DashboardAds
    },
    {
      path: '/addcity/:id?',
      name: 'addcity',
      component: AddCity
    },
    {
      path: '/addad/:id?',
      name: 'addad',
      component: AddAd
    },
    {
      path: '/auth/reset-password/:token',
      name: 'resetpassword',
      component: ResetPassword
    }
  ]
})
