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
    <br />
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
  },
  methods: {
    ...mapActions('user', ['signin']),
    ...mapMutations('user', ['AUTH_SUCCESS', 'AUTH_ERROR'])
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
