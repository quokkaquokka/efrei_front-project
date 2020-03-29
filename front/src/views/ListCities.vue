<template>
  <div class="list-cities">
    <div class="row">
      <div class="col-9" id="city">
        <SearchAds :search="searchAttributes"> </SearchAds>
        <div v-for="city in cities" :key="city._id">
          <CityItem :city="city"></CityItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CityItem from '../components/CityItem.vue'
import SearchAds from '../components/SearchBar.vue'
export default {
  components: {
    CityItem,
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
    ...mapActions('cities', ['fetchCities'])
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
