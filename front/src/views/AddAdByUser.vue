<template>
  <div>
    <div class="caroussel" v-if="adUser._id">
      <Caroussel :pictures="adUser.pictures"></Caroussel>
    </div>
    <div class="col-11" id="city">
      <h3 v-if="!adUser._id">Ajouter votre propre annonce</h3>
      <h3 v-if="adUser._id">Modifier votre propre annonce</h3>
      <AddAdForm :ad="adUser"></AddAdForm>
    </div>
    <div v-if="adUser.pictures.length > 0 && !adUser._id">
      <div class="caroussel">
        <Caroussel :pictures="adUser.pictures"></Caroussel>
      </div>
    </div>
    <div>
      <div class="col-11" style="margin-bottom: 20px;" id="city">
        <div id="adUserbyUser">
          <AdUserForm :adUser="adUser" :ad="adUser"></AdUserForm>
        </div>
        <button type="button" class="btn btn-outline-primary mt-3" @click='addAdUser' style="float: right">Enregistrer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import router from '../router/index'
import AddAdForm from '../components/AdAddForm.vue'
import AdUserForm from '../components/AdUserForm.vue'
import Caroussel from '../components/Caroussel.vue'

export default {
  components: {
    AddAdForm,
    AdUserForm,
    Caroussel
  },
  data: () => ({
    sizeLabel: {
      label: 'col-4',
      input: 'col-8'
    },
    adUser: {
      _id: null,
      title: null,
      pictures: [],
      equipments: [],
      idAd: null,
      city: null,
      price: null,
      postalCode: null,
      buildingArea: null,
      pricem2: null,
      description: null,
      // newBuilding: { title: 'Code postale', placeholder: 'Ex: 56100' },
      areaLand: null,
      rooms: null,
      bedrooms: null,
      permalink: null,
      phone: null,
      source: null,
      constructionDate: null,
      address: null,
      propositionPrice: null,
      comment: '',
      roomsWorks: [],
      generalWorks: [],
      locationType: {
        LN: {
          name: 'Location longue durée vide',
          price: null
        },
        LC: {
          name: 'Colocation',
          bedRoomPrice: null,
          countBedRoom: null
        },
        LM: {
          name: 'Location longue durée meublé',
          price: null
        },
        LM_LCD: {
          name: 'Location mixte (meublé + courte durée)',
          priceLM: null,
          pricePerNight: null,
          countBedRoom: null,
          countMonthLCD: 2,
          minNumberNight: 20
        },
        LCD: {
          name: 'Location courte durée meublé',
          logementsType: [],
          minNumberNight: 20
        }
      }
    }
  }),
  computed: {
    ...mapGetters('adsUser', ['getAdUserById']),
    ...mapState('user', ['user']),
    ...mapGetters('user', ['getUser', 'isAuthenticated'])
  },
  mounted () {
    if (this.$route.params.id) {
      this.adUser = this.getAdUserById(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('adsUser', ['createAdUser', 'fetchAdsUser', 'updateAdUser']),
    async addAdUser () {
      if (this.adUser.locationType.LN.price) {
        this.adUser.locationType.LN.price = parseInt(this.adUser.locationType.LN.price)
      }
      if (this.adUser.locationType.LM.price) {
        this.adUser.locationType.LM.price = parseInt(this.adUser.locationType.LN.price)
      }
      if (this.adUser._id) {
        await this.updateAdUser({ adUser: this.adUser })
        router.replace('/home')
      } else {
        this.adUser.adId = this.adId
        this.adUser.userId = this.getUser._id
        await this.createAdUser({ adUser: this.adUser })
        router.replace('/home')
      }
    }
  }
}
</script>

<style>
#adUserbyUser {
  background-color: #F9F9F9;
  border: 1px solid #d3d3d3;
  margin-bottom: 20px;
  margin-left: 0px;
  margin-top: 20px;
  padding-bottom: 20px;
}

#pills {
  display: inline-block;
  margin-right: 10px;
}

.caroussel {
  width: 100%;
  margin: auto;
  margin-top: 40px;
}
</style>
