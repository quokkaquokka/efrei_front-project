<template>
  <div class="signin">
    <form>
      <div class="alert alert-danger" role="alert" v-if="error">
        {{ error }}
      </div>
      <div class="input-group mb-3">
        <div class="input-group-append">
          <span class="input-group-text"><i class="fas fa-at"></i></span>
        </div>
        <input required v-model='email' type='text' class="form-control" placeholder='Email'>
      </div>
      <div class="input-group mb-2">
        <div class="input-group-append">
          <span class="input-group-text"><i class="fas fa-key"></i></span>
        </div>
        <input required v-model='password' type='password' class="form-control" placeholder='Mot de passe'>
      </div>
    <div class="signin">
      <button class="btn btn-outline-primary" style="float: right;"
          color='submit'
          @click='login'
      >Se connecter</button>
    </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      error: null,
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'status']),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions('user', ['signin']),
    ...mapMutations('user', ['AUTH_SUCCESS', 'AUTH_ERROR']),
    async login () {
      await this.signin({
        email: this.email,
        password: this.password
      })
      if (this.status) {
        this.error = 'Connexion échouée. Vérifiez votre email ou mot de passe.'
        setTimeout(() => { this.error = '' }, 3000)
      }
    }
  }
}
</script>

<style>
.signin{
  display: inline-block;
  width: 100%;
}
</style>
