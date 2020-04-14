<template>
  <div class="col-9" id="city">
    <h1>Welcome {{getUser.firstname}}</h1>
    <div class="ad" id="item">
      <h3>Listes de mes annonces</h3>
      <!-- <div v-for="ad in ads" :key="ad._id">
        <AdItem :ad="ad"></AdItem>
      </div> !-->
    </div>
    <h3>Listes de mes villes</h3>
    <div v-for="city in cities" :key="city._id">
      <CityItem :city="city"></CityItem>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CityItem from '../components/CityItem.vue'
import _ from 'lodash'
export default {
  components: {
    CityItem
  },
  data: () => ({
    cities: []
  }),
  computed: {
    ...mapState(['user']),
    ...mapState(['citiesUser']),
    ...mapState(['cities']),
    ...mapGetters('user', ['getUser', 'isAuthenticated'])
  },
  methods: {
    ...mapActions('user', ['fetchUser']),
    ...mapActions('citiesUser', ['fetchCitiesUser']),
    ...mapActions('cities', ['fetchCitiesbyIds'])
  },
  async mounted () {
    await this.fetchCitiesUser({ uid: this.user.user._id })
    const citiesId = _.reduce(this.citiesUser.citiesUser, (acc, e) => {
      acc.push(e.villeId)
      return acc
    }, [])
    this.cities = await this.fetchCitiesbyIds({ ids: citiesId })
    console.log('cities run', this.cities)
  }
}
</script>
