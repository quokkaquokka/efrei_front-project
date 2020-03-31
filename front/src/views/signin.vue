<template>
  <div id='signin'>
    <form class='signin'>
      <h1>Sign in</h1>
      <label>Email</label>
      <input required v-model='email' type='text' placeholder='Email' />
      <br />
      <label>Password</label>
      <input required v-model='password' type='password' placeholder='Password' />
      <hr />

      <button
        color='submit'
        @click='signin({
          email: email,
          password: password
        })'
      >Sign In</button>
      <br />
      <router-link to='/signup'>Don't have an account yet? Sign Up!</router-link>|
    </form>
    <br />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'signin',
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
#signin {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
}
</style>
