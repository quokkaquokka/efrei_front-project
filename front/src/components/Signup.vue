<template>
  <div class="signin">
    <form>
      <div class="input-group mb-3">
        <div class="input-group-append">
          <span class="input-group-text"><i class="fas fa-user"></i></span>
        </div>
        <input required v-model="firstname" type="text" class="form-control" placeholder="Firstname">
      </div>
      <div class="input-group mb-2">
        <div class="input-group-append">
          <span class="input-group-text"><i class="fas fa-user"></i></span>
        </div>
        <input required v-model="lastname" type="text" class="form-control" placeholder="lastname">
      </div>
      <div class="input-group mb-2">
        <div class="input-group-append">
          <span class="input-group-text"><i class="fas fa-at"></i></span>
        </div>
        <input required v-model="email" type="text" class="form-control" placeholder="Email">
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
          @click="signup({
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname
        })"
      >S'inscire</button>
    </div>
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
  }
}
</script>
