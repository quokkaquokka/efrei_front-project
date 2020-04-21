<template>
  <div id='card'>
    <div id='sign'>
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Se connecter</a>
          <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">S'inscrire</a>
          <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Mot de passe oublié ?</a>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <Signin> </Signin>
        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <Signup> </Signup>
        </div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
          <ForgottenPassword></ForgottenPassword>
        </div>
      </div>
    </div>
    <div class="mx-auto mt-5 text-center">
      <img src="@/assets/logo_big.png" height="250" alt="Logo"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'
import ForgottenPassword from '../components/ForgottenPassword.vue'
export default {
  components: {
    Signin,
    Signup,
    ForgottenPassword
  },
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
  }
}
</script>

<style scoped>
#card {
  background-color: #00A0C6;
  margin: auto;
  margin-top: 50px;
  padding: 80px;
}

#sign {
  width: 700px;
  background-color: #00A0C6;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
}

#sign nav a, #sign div.tab-content {
  border-style: hidden solid solid;
  border-color: #cccccc;
}

#sign nav a {
  background-color: #cccccc;
}

#sign nav a.active {
  background-color: #ffffff;
  border-color: #ffffff;
}

#sign div.tab-content {
  background-color: #ffffff;
}

#nav-tabContent{
  border-style: hidden solid solid;
  border-width: 1px;
  border-color: #cccccc;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-top: 20px;
}
#nav-home-tab {
  margin-left: 0;
}
</style>
