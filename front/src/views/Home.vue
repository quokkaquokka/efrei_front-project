<template>
  <div class="col-9" id="city">
    <h1>Welcome {{getUser.firstname}}</h1>
    <div class="ad" id="item">
      <!-- <h3>Listes de mes annonces</h3> !-->
      <!-- <div v-for="ad in ads" :key="ad._id">
        <AdItem :ad="ad"></AdItem>
      </div> !-->
    </div>
    <h3>Listes de mes villes</h3>
    <div v-for="city in citiesbyId" :key="city._id">
      <CityItem :city="city" :labelItem="deleteLabelItem" v-on:cityUser-action="removeCityUser"></CityItem>
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
    citiesbyId: [],
    deleteLabelItem: {
      icon: 'fas fa-trash',
      text: 'Ne plus suivre'
    }
  }),
  computed: {
    ...mapState(['user']),
    ...mapState(['citiesUser']),
    ...mapState(['cities']),
    ...mapGetters('user', ['getUser', 'isAuthenticated']),
    ...mapGetters('citiesUser', ['getCityUserByCityId']),
    ...mapGetters('cities', ['getCitiesbyIds']),
    ...mapGetters('citiesUser', ['getCitiesUser'])
  },
  methods: {
    ...mapActions('user', ['fetchUser']),
    ...mapActions('citiesUser', ['fetchCitiesUser']),
    ...mapActions('cities', ['fetchCitiesbyIds']),
    ...mapActions('citiesUser', ['deleteCityUser']),
    async removeCityUser (cityId) {
      const cityUser = this.getCityUserByCityId(cityId)
      await this.deleteCityUser({ cityId: cityUser._id })
      await this.fetchCitiesUser({ uid: this.user.user._id })
      const citiesUsr = this.getCitiesUser
      const citiesId = _.reduce(citiesUsr, (acc, e) => {
        acc.push(e.villeId)
        return acc
      }, [])
      await this.fetchCitiesbyIds({ ids: citiesId })
      this.citiesbyId = this.getCitiesbyIds(citiesId)
    }
  },
  async mounted () {
    await this.fetchCitiesUser({ uid: this.user.user._id })
    const citiesId = _.reduce(this.citiesUser.citiesUser, (acc, e) => {
      acc.push(e.villeId)
      return acc
    }, [])
    await this.fetchCitiesbyIds({ ids: citiesId })
    this.citiesbyId = this.getCitiesbyIds(citiesId)
  }
}
</script>
