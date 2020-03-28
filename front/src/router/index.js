import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import SignIn from '../views/signin.vue'
import SignUp from '../views/signup.vue'
import Ads from '../views/ListAds.vue'
import Ad from '../views/Ad.vue'
import Cities from '../views/ListCities.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'signin'
      }
    },
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
    }
  ]
})
