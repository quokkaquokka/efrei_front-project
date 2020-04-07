<template>
  <div class="list-cities">
    <div class="row">
      <div class="col-9" id="city">
        <SearchAds :search="searchAttributes"> </SearchAds><br>
        <button class="btn btn btn-outline-info my-2 my-sm-0" type="submit" @click="addCity"><i class="fas fa-plus-square"></i> Ajouter une ville</button>
        <div v-for="city in cities" :key="city._id">
          <CityDash :city="city" v-on:city-deleted="removeCity"></CityDash>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CityDash from '../components/CityDash.vue'
import SearchAds from '../components/SearchBar.vue'
export default {
  components: {
    CityDash,
    SearchAds
  },
  data: () => ({
    searchAttributes: {
      placeHolder: 'Ex: Paris',
      title: 'Ville'
    }
  }),
  async mounted () {
    await this.fetchCities()
  },
  computed: {
    ...mapState('cities', ['cities'])
  },
  methods: {
    ...mapActions('cities', ['fetchCities', 'deleteCity']),
    addCity () {
      this.$router.push('/addcity')
    },
    async removeCity (cityId) {
      await this.deleteCity({ cityId: cityId })
      await this.fetchCities()
      console.log(this.cities)
    }
  }
}
</script>

<style>
.list-cities {
  margin-top: 20px;
}

#searchDetails {
  background-color: #F9F9F9;
  max-width: 250px
}
#city{
  margin-left: auto;
  margin-right: auto;
}
</style>
