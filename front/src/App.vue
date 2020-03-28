<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark"  style="background-color: #00A0C6;">
  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item">
        <router-link
          v-if="isAuthenticated"
          to="/home"
          replace
        >Accueil</router-link>
      </li>
      <li class="nav-item">
       <router-link
          v-if="isAuthenticated"
          to="/ads"
          replace
        >
        Liste des annonces
      </router-link>
      </li>
      <li class="nav-item">
       <router-link
          v-if="isAuthenticated"
          to="/cities"
          replace
        >
        Liste des villes
      </router-link>
      </li>
    </ul>
    <router-link class="form-inline my-2 my-lg-0"
      v-if="isAuthenticated"
      to="/signin"
      v-on:click.native="logout()"
      replace>
      <p> Logout </p>
    </router-link>
  </div>
</nav>
  <router-view @authenticated="isAuthenticated" />
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
    ...mapGetters('user', ['isAuthenticated']),
    ...mapState(['user'])
  },
  mounted () {
    if (!this.isAuthenticated) {
      this.$router.replace({ name: 'signin' })
    }
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
}

nav a {
  font-weight: bold;
  color: rgba(0,0,0,.3);
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
