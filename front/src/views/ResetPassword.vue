<template>
  <div id='signin'>
    <form>
      <h3>Entrer votre nouveau mot de passe</h3>
      <div class="form-group">
        <div class="input-group mb-2">
          <div class="input-group-append">
            <span class="input-group-text"><i class="fas fa-key"></i></span>
          </div>
          <input required v-model='password' type='password' class="form-control" placeholder='Mot de passe'>
        </div>
      </div>
      <div class="signin">
        <button class="btn btn-outline-primary" style="float: right;"
          color='submit'
          @click='resetPassword({
            password: password,
            resetToken: resetToken
          })'
        >Sauvegarder</button>
    </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      password: '',
      resetToken: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    this.resetToken = this.$route.params.token
  },
  methods: {
    ...mapActions('user', ['resetPassword'])
  }
}
</script>

<style scoped>
#signin {
  width: 700px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
}
</style>
