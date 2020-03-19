<template>
  <div id="login">
    <v-form class="login">
      <h1>Sign in</h1>
      <label>Username</label>
      <input required v-model="username" type="text" placeholder="Username" />
      <br />
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password" />
      <hr />

     <v-btn
        color="submit"
        @click="login({
          email: username,
          password: password
        })"
      >
        Login
      </v-btn>
    </v-form>
    <br />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters("user", ["isAuthenticated"]),
    ...mapState(["user"])
  },
  methods: {
    ...mapActions("user", ["login"]),
    ...mapMutations("user", ["AUTH_SUCCESS", "AUTH_ERROR"]),
  },
  mounted() {}
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
}
</style>s
