<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark"  style="background-color: #00A0C6;" v-if="isAuthenticated">
  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav mr-1 mt-2 mt-lg-0">
      <li class="nav-item">
        <router-link
          to="/home"
          replace
        >
        <img src="@/assets/logo_big.png" height="70" alt="logo"/>
      </router-link>
      </li>
    </ul>
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item">
        <router-link
          to="/home"
          replace
        >Accueil</router-link>
      </li>
      <li class="nav-item">
       <router-link
          to="/ads"
          replace
        >
        Liste des annonces
      </router-link>
      </li>
      <li class="nav-item">
       <router-link
          to="/cities"
          replace
        >
        Liste des villes
      </router-link>
      </li>
      <li class="nav-item">
       <router-link
          v-if="hasAccessRight"
          to="/dashcities"
          replace
        >
        Dashboard villes
      </router-link>
      </li>
      <li class="nav-item">
       <router-link
          v-if="hasAccessRight"
          to="/dashads"
          replace
        >
        Dashboard annonces
      </router-link>
      </li>
    </ul>
    <ul class="navbar-nav mr-1 mt-2 mt-lg-0">
      <li class="nav-item">
    <router-link
      to="/signin"
      v-on:click.native="logout()"
      replace>
      Logout
    </router-link>
      </li>
    </ul>
  </div>
</nav>
  <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'hasAccessRight']),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions('user', ['logout']),
    ...mapMutations('user', ['AUTH_SUCCESS', 'AUTH_ERROR', 'UNSET_USER'])
  }
}
</script>

<style>
#app {
  font-family: Ubuntu,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-bottom: 20px;
}

nav a {
  font-weight: bold;
  color: rgba(0,0,0,.4);
  margin-right: 20px;
  margin: 10px;
  font-size: 20px;
}

nav a:hover {
  font-weight: bold;
  color: rgba(0,0,0,.7);
  text-decoration: none;
  margin-right: 20px;
  margin: 10px;
  font-size: 20px;
}

nav a.router-link-exact-active {
  color: white;
}
.navbar{
  justify-content: flex-start;
}
#align-right{
  text-align: right;
}

</style>
