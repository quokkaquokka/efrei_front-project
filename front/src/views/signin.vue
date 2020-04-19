<template>
  <div id='signin'>
    <form>
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
      >Sign In</button>
      <br />
      <router-link to='/signup'>Don't have an account yet? Sign Up!</router-link>|
    </form>
    <button class="btn btn-outline-primary" style="float: right;"
        v-on:click="resetPassword"
      >TEST</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import axios from 'axios'
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
    ...mapState(['user']),
    // pour les testes
    ...mapGetters('user', ['state'])
  },
  methods: {
    ...mapActions('user', ['signin']),
    ...mapMutations('user', ['AUTH_SUCCESS', 'AUTH_ERROR']),
    async resetPassword (event) {
      // http://localhost:8000/api/v1/auth/forgotten-password?email=mouttecam@gmail.com pas besoin d'etre connecter
      /* const options = {
        params: {
          email: 'mouttecam@gmail.com'
        }
      }event
      const resp = await axios.get('http://localhost:8000/api/v1' + '/auth/forgotten-password', options)
      console.log(resp) */

      // const option2 = {
      //   headers: {
      //     authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YzBhYTFjMi05NDc3LTQ3YzAtOTJmYS0zMzk1OWNiYTYwOWUiLCJpc3MiOlsiRlJPTlQtUFJPSkVDVCJdLCJpYXQiOjE1ODczMzAxMzIsImV4cCI6MTU4NzMzMDEzMiwic2NvcGUiOlsidXNlciJdLCJwcm92aWRlciI6eyJuYW1lIjoiaW50ZXJuYWwiLCJlbWFpbCI6Im1vdXR0ZWNhbUBnbWFpbC5jb20ifSwiX2lkIjoiNWU3MzRhYWIxYzlkNDQwMDAwYTM4NDY5IiwiZmlyc3RuYW1lIjoiQ2FtaWxsZSIsImxhc3RuYW1lIjoiTW91dHRlIiwiZW1haWwiOiJtb3V0dGVjYW1AZ21haWwuY29tIn0.d9ZvgosrsvjdDHGR_tbAYShqhntZpze9nJ8IJoFlqYY'
      //   }
      // }
      // const resp2 = await axios.get('http://localhost:8000/api/v1' + '/auth/logout', option2)
      // console.log('res', resp2)
      const option2 = {
        headers: {
          authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MmU1MmEyYS0xNDY3LTQyMGUtYTFhOC0wNDc2ZGI4M2UxNzQiLCJpc3MiOlsiRlJPTlQtUFJPSkVDVCJdLCJpYXQiOjE1ODczMzA0NDEsImV4cCI6MTU4NzMzMDQ0MSwic2NvcGUiOlsidXNlciJdLCJwcm92aWRlciI6eyJuYW1lIjoiaW50ZXJuYWwiLCJlbWFpbCI6Im1vdXR0ZWNhbUBnbWFpbC5jb20ifSwiX2lkIjoiNWU3MzRhYWIxYzlkNDQwMDAwYTM4NDY5IiwiZmlyc3RuYW1lIjoiQ2FtaWxsZSIsImxhc3RuYW1lIjoiTW91dHRlIiwiZW1haWwiOiJtb3V0dGVjYW1AZ21haWwuY29tIn0.7HlTKWJBLZopI3mhBJKH3LwtIPGh05DwjpEmU4S5Rpk'
        }
      }
      const resp2 = await axios.get('http://localhost:8000/api/v1' + '/auth/logout', option2)
      console.log('res', resp2)
    }
  }
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
