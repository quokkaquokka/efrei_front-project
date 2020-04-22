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
    </form>
    <div class="signin">
      <button class="btn btn-outline-primary" style="float: right;"
          color='submit'
          @click='recover'
      >Mot de passe oublié ?</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      error: null,
      email: ''
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'status']),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions('user', ['forgottenPassword']),
    ...mapMutations('user', ['AUTH_SUCCESS', 'AUTH_ERROR']),
    async recover () {
      await this.forgottenPassword({
        email: this.email
      })
      if (this.status) {
        this.error = 'Echec d\'envoi de mail. Adresse mail incomplète ou inconnue.'
        setTimeout(() => { this.error = '' }, 3000)
      }
    }
  }
}
</script>
