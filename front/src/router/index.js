import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/signin.vue'
import SignUp from '../views/signup.vue'
import Ads from '../views/ListAds.vue'
import Ad from '../views/Ad.vue'
import Cities from '../views/ListCities.vue'
import City from '../views/City.vue'
import DashboardCities from '../views/DashboardCities.vue'
import DashboardAds from '../views/DashboardAds.vue'
import EditCity from '../views/EditCity.vue'
import AddCity from '../views/AddCity.vue'
import AddAd from '../views/AddAd.vue'

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
      path: '/',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
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
      path: '/editcity/:id',
      name: 'editcity',
      component: EditCity
    },
    {
      path: '/addcity',
      name: 'addcity',
      component: AddCity
    },
    {
      path: '/addad',
      name: 'addad',
      component: AddAd
    }

  ]
})
