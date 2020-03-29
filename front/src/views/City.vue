<template>
  <div>
    <h1> {{ city.name }}</h1>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    tot: null
  }),
  async mounted () {
    console.log('city', this.city)
  },
  computed: {
    ...mapState('cities', ['cities']),
    ...mapGetters('cities', ['getCityById']),
    cityId () {
      return this.$route.params.id
    },
    city () {
      return this.getCityById(this.cityId) || { name: 'Loading..' }
    }
  }
}
</script>
