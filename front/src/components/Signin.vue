<template>
  <div class="signin">
    <form>
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
    </form>
    <div class="signin">
      <button class="btn btn-outline-primary" style="float: right;"
          color='submit'
          @click='signin({
            email: email,
            password: password
          })'
      >Se connecter</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
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
  }
}
</script>

<style>
.signin{
  display: inline-block;
  width: 100%;
}
</style>
