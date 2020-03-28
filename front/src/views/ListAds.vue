<template>
  <div class="list-ads">
    <div class="row">
      <div class="col-2" id="searchDetails">
        <SearchAdsDetails :city="`${searchAttributes.city}`"></SearchAdsDetails>
      </div>
      <div class="col-10">
        <SearchAds :search="searchAttributes"> </SearchAds>
        <div v-for="ad in ads" :key="ad._id">
          <AdItem :ad="ad"></AdItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AdItem from '../components/AdItem.vue'
import SearchAds from '../components/SearchBar.vue'
import SearchAdsDetails from '../components/SearchAds.vue'
export default {
  components: {
    AdItem,
    SearchAds,
    SearchAdsDetails
  },
  data: () => ({
    searchAttributes: {
      placeHolder: 'Où ?',
      title: 'Acheter',
      city: SearchAds.searchItem
    }
  }),
  city: SearchAds.searchItem,
  async mounted () {
    await this.fetchAds()
  },
  computed: {
    ...mapState('ads', ['ads'])
  },
  methods: {
    ...mapActions('ads', ['fetchAds'])
  }
}

</script>

<style>
.list-ads {
  margin-top: 20px;
}

#searchDetails {
  background-color: #F9F9F9;
  max-width: 250px;
}
</style>
