<template>
  <div class="list-cities">
    <div class="row">
      <div class="col-9" id="city">
        <SearchBar :search="searchAttributes" v-on:search-city="filteredList"> </SearchBar>
        <div v-for="city in citiesList" :key="city._id">
          <CityItem :city="city"></CityItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      searchItem: ''
    },
    citiesList: []
  }),
  async mounted () {
    await this.fetchCities()
    this.citiesList = this.cities
  },
  computed: {
    ...mapState('cities', ['cities'])
  },
  methods: {
    ...mapActions('cities', ['fetchCities']),
    async filteredList (search) {
      this.citiesList = this.cities.filter(city => {
        return city.name.toLowerCase().includes(search.toLowerCase())
      })
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
