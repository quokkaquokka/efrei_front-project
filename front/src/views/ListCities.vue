<template>
  <div class="list-cities">
    <div class="row">
      <div class="col-9" id="city">
        <SearchCities
          :search="searchAttributes"
          :action="searchAction">
        </SearchCities>
        <div v-for="city in cities" :key="city._id">
          <CityItem :city="city" :dash="false" v-on:cityUser-action="addCitiesUser"></CityItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import CityItem from '../components/CityItem.vue'
import SearchCities from '../components/SearchBar.vue'
export default {
  components: {
    CityItem,
    SearchCities
  },
  data: () => ({
    searchAttributes: {
      placeHolder: 'Ex: Paris',
      title: 'Ville',
      itemSearch: null
    }
  }),
  async mounted () {
    await this.fetchCities()
  },
  computed: {
    ...mapState('cities', ['cities']),
    ...mapGetters('user', ['getUser', 'isAuthenticated'])
  },
  methods: {
    ...mapActions('cities', ['fetchCities']),
    ...mapActions('citiesUser', ['createCityUser']),
    async searchAction () {
      await this.fetchCities(this.searchAttributes.itemSearch)
    },
    async addCitiesUser (cityId) {
      if (this.isAuthenticated) {
        const cityUser = {
          villeId: cityId,
          userId: this.getUser._id
        }
        await this.createCityUser({ cityUser: cityUser })
      }
      // sinon une erreur et il faut dire de s'authentifier
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
