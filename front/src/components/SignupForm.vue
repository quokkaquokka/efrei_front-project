<template>
  <div class="signin">
    <form>
      <div class="alert alert-danger" role="alert" v-if="error">
        {{ error }}
      </div>
      <div class="alert alert-success" role="alert" v-if="validate">
        {{ validate }}
      </div>
      <div class="input-group mb-3">
        <div class="input-group-append">
          <span class="input-group-text"><i class="fas fa-user"></i></span>
        </div>
        <input required v-model="firstname" type="text" class="form-control" placeholder="Prénom">
      </div>
      <div class="input-group mb-2">
        <div class="input-group-append">
          <span class="input-group-text"><i class="fas fa-user"></i></span>
        </div>
        <input required v-model="lastname" type="text" class="form-control" placeholder="Nom">
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
          @click='register'
      >S'inscire</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      error: null,
      validate: null,
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'status']),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions('user', ['signup']),
    ...mapMutations('user', ['AUTH_SUCCESS', 'AUTH_ERROR']),
    async register () {
      const { data } = await this.signup({
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname
      })
      if (!data) {
        this.error = 'Inscription échouée. Adresse mail incomplète ou déjà utilisée.'
        setTimeout(() => { this.error = '' }, 3000)
      } else {
        this.validate = 'Votre incription a bien été effectué, vous pouvez désormais vous connecter.'
        setTimeout(() => { this.validate = '' }, 3000)
      }
    }
  }
}
</script>
