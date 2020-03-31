<template>
  <div id='login'>
    <form class='login'>
      <h1>Se connecter</h1>
      <div class="form-group">
        <label>Email</label>
        <input required v-model='email' type='text' class="form-control" placeholder='Email'/>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input required v-model='password' type='password' class="form-control" placeholder='Mot de passe' />
      </div>
      <button class="btn btn-outline-primary" style="float: right;"
        color='submit'
        @click='signin({
          email: email,
          password: password
        })'
      >Login</button>
      <br />
      <router-link to='/signup'>Don't have an account yet? Sign Up!</router-link>|
    </form>
    <br>
    <br>
    <br>
    <button class="btn btn-outline-primary" style="float: right;"
      @click='test'
    >TEST</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated']),
    ...mapState(['user'])
    // test
  },
  methods: {
    ...mapActions('user', ['signin']),
    ...mapMutations('user', ['AUTH_SUCCESS', 'AUTH_ERROR']),
    // test
    ...mapActions('ads', ['fetchAd']),
    ...mapActions('ads', ['createAd']),
    ...mapActions('ads', ['deleteAd']),
    ...mapActions('cities', ['fetchCity']),
    ...mapActions('cities', ['createCity']),
    ...mapActions('cities', ['deleteCity']),
    async test () {
      // const tmp = await this.fetchAd({ id: '5e7332c41c9d440000a38461' })
      // const ads = { titre: 'totooooo' }
      // this.createAd({ ad: ads })
      // this.deleteAd({ adId: '5e8263c4f8a1491b6a2c503c' })
      // const tmp2 = await this.fetchCity({ id: '5e7332071c9d440000a38460' })
      /* const city = {
        firstname: 'toto',
        lastname: 'ttt',
        email: 'trtr'
      } */
      // await this.createCity({ city: city })
      // this.deleteCity({ cityId: '5e82f9351c9d440000a34179' })
    }
  },
  mounted () {}
}
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
}
</style>
