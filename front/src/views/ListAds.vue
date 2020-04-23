<template>
  <div class="list-ads">
    <div class="row">
      <div class="col-2" id="searchDetails">
        <SearchAdsDetails
          :city="`${searchAttributes.city}`"
          :action="searchActionAdvanced"
          :details="searchAdvanced" ></SearchAdsDetails>
      </div>
      <div class="col-10">
        <SearchAds
          :search="searchAttributes"
          :action="searchAction"
        > </SearchAds>
        <div class="alert alert-success text-center mt-3" role="alert" v-if="labelAddedAd"> {{ labelAddedAd }} </div>
        <div v-for="ad in ads" :key="ad._id">
          <AdItem :ad="ad" v-on:adUser-action="addAdUser"></AdItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AdItem from '../components/AdItem.vue'
import SearchAds from '../components/SearchBarForm.vue'
import SearchAdsDetails from '../components/SearchAdsForm.vue'
export default {
  components: {
    AdItem,
    SearchAds,
    SearchAdsDetails
  },
  data: () => ({
    labelAddedAd: '',
    searchAttributes: {
      placeHolder: 'Où ?',
      title: 'Acheter',
      itemSearch: null
    },
    searchAdvanced: {
      price: 0,
      buildingArea: 0,
      pricem2: 0,
      oldBuilding: true,
      newBuilding: true,
      house: true,
      appartment: true,
      land: true
    }
  }),
  async mounted () {
    await this.fetchAds()
  },
  computed: {
    ...mapState('ads', ['ads']),
    ...mapGetters('user', ['getUser', 'isAuthenticated'])
  },
  methods: {
    ...mapActions('ads', ['fetchAds']),
    ...mapActions('adsUser', ['createAdUser']),
    async searchAction () {
      const data = {
        city: this.searchAttributes.itemSearch
      }
      this.fetchAds(data)
    },
    async searchActionAdvanced () {
      const data = {
        city: this.searchAttributes.itemSearch,
        searchAdvanced: this.searchAdvanced
      }
      this.fetchAds(data)
    },
    async addAdUser (id, label) {
      if (this.isAuthenticated) {
        const adUser = {
          adId: id,
          userId: this.getUser._id
        }
        await this.createAdUser({ adUser: adUser })
        this.labelAddedAd = 'Vous avez ajouté cette annonce dans votre espace'
        setTimeout(() => { this.labelAddedAd = '' }, 3000)
      }
    }
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
