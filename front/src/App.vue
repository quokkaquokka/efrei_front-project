<template>
  <div id="app">
    <div id="nav">
      <router-link
        v-if="isAuthenticated"
        to="/signin"
        v-on:click.native="this.logout()"
        replace
      >Logout</router-link><br>
      <router-link
        v-if="isAuthenticated"
        to="/home"
        replace
      ><h1 align='center'>Title</h1></router-link>
    </div>

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
    ...mapMutations('user', ['AUTH_SUCCESS', 'AUTH_ERROR'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
