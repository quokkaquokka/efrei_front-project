<template>
  <div class="adDetails">
    <div class="caroussel">
      <Caroussel :pictures="ad.pictures"></Caroussel>
    </div>
    <div class="details">
      <div class="col-10 descriptif">
        <h3>{{ ad.title }}</h3>
        <h4><i class="fas fa-map-marker-alt"></i> {{ ad.city }} </h4><span>( {{ ad.postalCode }} )</span><br>
        <h2> {{ ad.price | numeralFormat }} €</h2><span> {{ ad.pricem2 | numeralFormat }} €/m²</span>
        <div class="row">
          <div class="col-3">
            <p>Surface</p>
            <h3><i class="fas fa-ruler-combined"></i> {{ ad.buildingArea | numeralFormat }}</h3>
          </div>
          <div class="col-3">
            <p>Nb de pièces</p>
            <h3><i class="fas fa-cube"></i> {{ ad.rooms }}</h3>
          </div>
          <div class="col-3">
            <p>Nb de chambres</p>
            <h3><i class="fas fa-bed"></i> {{ ad.bedRooms }}</h3>
          </div>
          <div class="col-3">
            <p>Date de construction</p>
            <h3><i class="far fa-calendar-alt"></i> {{ ad.constructionDate }}</h3>
          </div>
        </div>
      </div>
      <div class="col-10 descriptif">
        <h3> Descriptif </h3>
        <p v-html="`${ ad.description }`"></p>
        <h3> Equipement </h3>
        <div v-for="item in ad.equipments" :key="item" id="pills">
          <h4><span class="badge badge-secondary">{{ item }}</span></h4>
        </div>
      </div>
      <div class="col-10 descriptif">
        <h3>Source</h3>
        <p><a :href="ad.permalink">Lien: {{ ad.source }}</a></p>
        <p>id de l'annonce: {{ ad.idAd }}</p>
        <p>contact: {{ ad.phone }}</p>
      </div>
      <AdUserForm :adId="adId" :adUser="adUser" :ad="ad"></AdUserForm>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import AdUserForm from '../components/AdUserForm.vue'
import Caroussel from '../components/Caroussel.vue'

export default {
  components: {
    AdUserForm,
    Caroussel
  },
  data () {
    return {
      adId: null,
      ad: {},
      adUser: {
        address: null,
        propositionPrice: null,
        comment: '',
        rooms: [],
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
    }
  },
  async mounted () {
    this.adId = this.$route.params.id
    this.ad = this.getAdById(this.adId)
    if (this.isAuthenticated) {
      await this.fetchAdsUser({ uid: this.user._id })
      if (this.getAdUserByAdId(this.adId)) {
        this.adUser = this.getAdUserByAdId(this.adId)
      }
    }
  },
  computed: {
    ...mapState('ads', ['ads']),
    ...mapState('user', ['user']),
    ...mapGetters('ads', ['getAdById']),
    ...mapGetters('adsUser', ['getAdUserByAdId']),
    ...mapGetters('user', ['getUser', 'isAuthenticated'])
  },
  methods: {
    ...mapActions('ads', ['fetchAd']),
    ...mapActions('adsUser', ['createAdUser', 'fetchAdsUser', 'updateAdUser'])
  }
}
</script>

<style scope>
#formInTab {
  background-color: #ffffff;
  border: 0;
  padding: 30px;
}
#formInTab .table {
  margin-top: 20px;
}
.descriptif {
  background-color: #ffffff;
  padding: 40px;
  margin: auto;
  margin-top: 30px;
}

.descriptifTab {
  background-color: #ffffff;
  margin: auto;
  margin-top: 30px;
}

.middle {
  width: 800px;
  margin: auto;
}

.details {
  margin-top: 30px;
  background-color: #f3f5fa;
  padding-top: 70px;
  padding-bottom: 20px;
}

.caroussel {
  width: 100%;
  margin: auto;
  margin-top: 40px;
}

h3 {
  color: #00648E;
}

h4 {
  color: #00A0C6;
  width: max-content;
  display: inline-block;
  margin-right: 10px;
}
</style>
