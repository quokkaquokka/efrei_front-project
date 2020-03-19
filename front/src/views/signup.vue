<template>
  <div id="signup">
    <form class="signup">
      <h1>Sign up</h1>
      <label>Firstname</label>
      <input required v-model="firstname" type="text" placeholder="Firstname" />
      <br />
      <label>Lastname</label>
      <input required v-model="lastname" type="text" placeholder="lastname" />
      <br />
      <label>Email</label>
      <input required v-model="email" type="text" placeholder="Email" />
      <br />
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password" />
      <hr />

     <button
        color="submit"
        @click="signup({
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname
        })"
      >
        Login
      </button>
      <router-link to="/signin">Already have an account? Sign In!</router-link> |
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
      password: '',
      firstname: '',
      lastname: ''
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated']),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions('user', ['signup']),
    ...mapMutations('user', ['AUTH_SUCCESS', 'AUTH_ERROR'])
  },
  mounted () {}
}
</script>

<style scoped>
#signup {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
}
</style>
