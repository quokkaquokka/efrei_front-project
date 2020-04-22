<template>
  <div class="list-cities">
    <div class="row">
      <div class="col-9" id="city">
        <SearchBar
          :search="searchAttributes"
          :action="searchAction"
          :rightButton="addCityLabels"
          :righAction="goToPageAddAd" >
        </SearchBar>
        <div v-for="ad in ads" :key="ad._id">
          <AdItem :ad="ad" :labelsButton="labelsButton" v-on:adUser-action="actionAdUser"></AdItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import AdItem from '../components/AdItem.vue'
import SearchBar from '../components/SearchBarForm.vue'
export default {
  components: {
    AdItem,
    SearchBar
  },
  data: () => ({
    labelsButton: [
      {
        icon: 'fas fa-trash',
        text: 'Supprimer'
      },
      {
        icon: 'fas fa-edit',
        text: 'Modifier'
      }
    ],
    searchAttributes: {
      placeHolder: 'Ex: Où?',
      title: 'Acheter',
      itemSearch: null
    },
    addCityLabels: {
      icon: 'fas fa-plus-square',
      text: 'Ajouter une annonce'
    }
  }),
  async mounted () {
    await this.fetchAds()
  },
  computed: {
    ...mapState('ads', ['ads'])
  },
  methods: {
    ...mapActions('ads', ['fetchAds', 'deleteAd']),
    ...mapMutations('ads', ['addAd', 'removeAd']),
    async searchAction () {
      this.fetchAds(this.searchAttributes.itemSearch)
    },
    goToPageAddAd () {
      this.$router.push('/addad')
    },
    async actionAdUser (id, label) {
      if (label === 'Supprimer') {
        await this.deleteAd({ adId: id })
      } else {
        this.$router.push('/addad/' + id)
      }
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
