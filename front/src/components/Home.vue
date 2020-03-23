<template>
  <div id='create'>
    <h1>Welcome {{getUser.firstname}}</h1>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters('user', ['getUser', 'isAuthenticated'])
  },
  methods: {
    ...mapActions('user', ['fetchUser'])
  },
  async mounted () {
    console.log(this.isAuthenticated)
    console.log(this.getUser)
  }
}
</script>
