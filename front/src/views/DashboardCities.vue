<template>
  <div class="list-cities">
    <div class="row">
      <div class="col-9" id="city">
        <SearchBar
          :search="searchAttributes"
          :action="searchAction"
          :rightButton="addCityLabels"
          :righAction="addCity" >
        </SearchBar>
        <div v-for="city in cities" :key="city._id">
          <CityItem :city="city" :dash="true" v-on:city-deleted="removeCity"></CityItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CityItem from '../components/CityItem.vue'
import SearchBar from '../components/SearchBar.vue'
export default {
  components: {
    CityItem,
    SearchBar
  },
  data: () => ({
    searchAttributes: {
      placeHolder: 'Ex: Paris',
      title: 'Ville',
      itemSearch: null
    },
    addCityLabels: {
      icon: 'fas fa-plus-square',
      text: 'Ajouter une ville'
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
    ...mapMutations('cities', ['addCity', 'removeCity']),
    async searchAction () {
      this.fetchCities(this.searchAttributes.itemSearch)
    },
    addCity () {
      this.$router.push('/addcity/')
    },
    async removeCity (cityId) {
      await this.deleteCity({ cityId: cityId })
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
