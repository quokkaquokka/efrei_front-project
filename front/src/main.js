import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-fontawesome'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
