import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import SignIn from '../views/signin.vue'
import SignUp from '../views/signup.vue'

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
    }
  ]
})
