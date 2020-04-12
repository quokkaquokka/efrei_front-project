<template>
  <div class="col-9" id="city">
    <h1>Welcome {{getUser.firstname}}</h1>
    <div class="ad" id="item">
      <h3>Listes de mes annonces</h3>
      <!-- <div v-for="ad in ads" :key="ad._id">
        <AdItem :ad="ad"></AdItem>
      </div> !-->
    </div>
    <div class="ad" id="item">
      <h3>Listes de mes villes</h3>
      <div v-for="city in citiesUser" :key="city._id">
        <CityItem :city="city"></CityItem>
      </div>
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
  }),
  computed: {
    ...mapState(['user']),
    ...mapState(['citiesUser']),
    ...mapGetters('user', ['getUser', 'isAuthenticated'])
  },
  methods: {
    ...mapActions('user', ['fetchUser']),
    ...mapActions('citiesUser', ['fetchCitiesUser'])
  },
  async created () {
    await this.fetchCitiesUser({ uid: this.user.user._id })
  },
  async mounted () {
    const citiesId = _.reduce(this.citiesUser.citiesUser, (acc, e) => {
      acc.push(e._id)
      return acc
    }, [])
    console.log('citiesId', citiesId)
    // TODO implemented: search get cities with multiple _id
  }
}
</script>
