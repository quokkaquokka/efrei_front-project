<template>
  <div class="signin">
    <form>
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
          @click='forgottenPassword({
            email: email
          })'
      >Mot de passe oublié ?</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      email: ''
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated']),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions('user', ['forgottenPassword']),
    ...mapMutations('user', ['AUTH_SUCCESS', 'AUTH_ERROR'])
  }
}
</script>
