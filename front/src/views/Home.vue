<template>
  <div class="col-9 py-3" id="city">
    <h3>Listes de mes annonces</h3>
    <p v-if="adsbyId.length === 0">Vous n'avez pas encore de suivis d'annonce! Vous pouvez vous rendre sur la liste des annonces pour en ajouter</p>
    <div v-for="ad in adsbyId" :key="ad._id">
      <AdItem :ad="ad" :labelsButton="labelsButton" v-on:adUser-action="removeAdUser"></AdItem>
    </div>
    <h3>Listes de mes villes</h3>
    <p v-if="citiesbyId.length === 0">Vous n'avez pas encore de suivis de ville! Vous pouvez vous rendre sur la liste des villes pour en ajouter</p>
    <div v-for="city in citiesbyId" :key="city._id">
      <CityItem :city="city" :labelItem="deleteLabelItem" v-on:cityUser-action="removeCityUser"></CityItem>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import AdItem from '../components/AdItem.vue'
import CityItem from '../components/CityItem.vue'

export default {
  components: {
    AdItem,
    CityItem
  },
  data: () => ({
    citiesbyId: [],
    adsbyId: [],
    labelsButton: [{
      icon: 'fas fa-trash',
      text: 'Ne plus suivre'
    }],
    deleteLabelItem: {
      icon: 'fas fa-trash',
      text: 'Ne plus suivre'
    }
  }),
  computed: {
    ...mapState('ads', ['ads']),
    ...mapState('adsUser', ['adsUser']),
    ...mapState('cities', ['cities']),
    ...mapState('citiesUser', ['citiesUser']),
    ...mapState('user', ['user']),
    ...mapGetters('ads', ['getAdsbyIds']),
    ...mapGetters('adsUser', ['getAdUserByAdId', 'getAdsUser']),
    ...mapGetters('cities', ['getCitiesbyIds']),
    ...mapGetters('citiesUser', ['getCitiesUser', 'getCityUserByCityId']),
    ...mapGetters('user', ['getUser', 'isAuthenticated'])
  },
  methods: {
    ...mapActions('ads', ['fetchAds']),
    ...mapActions('adsUser', ['deleteAdUser', 'fetchAdsUser']),
    ...mapActions('cities', ['fetchCitiesbyIds']),
    ...mapActions('citiesUser', ['deleteCityUser', 'fetchCitiesUser']),
    async removeCityUser (cityId) {
      const cityUser = this.getCityUserByCityId(cityId)
      await this.deleteCityUser({ cityId: cityUser._id })
      await this.fetchCitiesUser({ uid: this.user._id })
      const citiesUsr = this.getCitiesUser
      const citiesId = _.reduce(citiesUsr, (acc, e) => {
        acc.push(e.villeId)
        return acc
      }, [])
      await this.fetchCitiesbyIds({ ids: citiesId })
      this.citiesbyId = this.getCitiesbyIds(citiesId)
    },
    async removeAdUser (id, label) {
      const adUser = this.getAdUserByAdId(id)
      await this.deleteAdUser({ adId: adUser._id })
      await this.fetchAdsUser({ uid: this.user._id })
      const adsUsr = this.getAdsUser
      const adsId = _.reduce(adsUsr, (acc, e) => {
        acc.push(e.annonceId)
        return acc
      }, [])
      await this.fetchAds()
      this.adsbyId = this.getAdsbyIds(adsId)
    }
  },
  async mounted () {
    await this.fetchCitiesUser({ uid: this.user._id })
    const citiesId = _.reduce(this.citiesUser, (acc, e) => {
      acc.push(e.villeId)
      return acc
    }, [])
    await this.fetchCitiesbyIds({ ids: citiesId })
    this.citiesbyId = this.getCitiesbyIds(citiesId)
    await this.fetchAds()
    await this.fetchAdsUser({ uid: this.user._id })
    const adsId = _.reduce(this.adsUser, (acc, e) => {
      acc.push(e.annonceId)
      return acc
    }, [])
    this.adsbyId = this.getAdsbyIds(adsId)
  }
}
</script>
