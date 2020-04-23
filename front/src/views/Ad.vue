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
        <div class="col-10 descriptif">
          <FormRow :dataForm="address" v-model="adUser.address" :sizeLabel="sizeLabel"></FormRow>
          <FormRow :dataForm="propositionPrice" v-model="adUser.propositionPrice" :sizeLabel="sizeLabel" inputType="number"></FormRow>
          <h4 style="float:right" v-if="adUser.propositionPrice"> - {{ calculLowerPrice() }} % du prix initial</h4>
        </div>
        <div class="col-10 descriptifTab">
          <EditableTable :dataForm="generalWorks" :toComplete="adUser.generalWorks" id="formInTab"></EditableTable>
        </div>
        <div class="col-10 descriptifTab">
          <EditableTable :dataForm="rooms" :toComplete="adUser.rooms" id="formInTab" sizeInput="col-sm-5" sizeLabel="col-sm-3" sizeForm="col-5"></EditableTable>
        </div>
        <div class="col-10 descriptif">
          <h4>Coût total des travaux</h4>
          <h3 style="float:right"> {{ calculWorksPrice() | numeralFormat }} €</h3>
        </div>
        <div class="col-10 descriptif">
          <h4>Potentiel locatif</h4>
          <h3 style="float:right"> Cashflow par mois</h3>
          <div class="mb-5">
            <h5>Location longue durée vide</h5>
            <FormRow :dataForm="exploitationPrice" v-model="adUser.locationType.LN.price" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <h3 v-if="adUser.locationType.LN.price" class="float-right">{{ calculpriceLN(adUser.locationType.LN.price) | numeralFormat }} € / mois</h3>
          </div>
          <div class="mb-5">
          <h5>Colocation</h5>
            <FormRow :dataForm="countBedRoom" v-model="adUser.locationType.LC.countBedRoom" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <FormRow :dataForm="colocationPrice" v-model="adUser.locationType.LC.bedRoomPrice" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <h3 v-if="adUser.locationType.LC.bedRoomPrice" class="float-right">{{ calculpriceLC() | numeralFormat }} € / mois</h3>
          </div>
          <div class="mb-5">
            <h5>Location longue durée meublé</h5>
            <FormRow :dataForm="exploitationPrice" v-model="adUser.locationType.LM.price" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <h3 v-if="adUser.locationType.LM.price" class="float-right">{{ calculpriceLN(adUser.locationType.LM.price) | numeralFormat }} € / mois</h3>
          </div>
          <div class="mb-5">
            <h5>Location mixte (meublé + courte durée)</h5>
            <h6>Longue durée</h6>
            <FormRow :dataForm="exploitationPrice" v-model="adUser.locationType.LM_LCD.priceLM" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <h6>Courte durée</h6>
            <FormRow :dataForm="countMonthLCD" v-model="adUser.locationType.LM_LCD.countMonthLCD" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <FormRow :dataForm="minNumberNight" v-model="adUser.locationType.LM_LCD.minNumberNight" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <FormRow :dataForm="countBedRoom" v-model="adUser.locationType.LM_LCD.countBedRoom" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <FormRow :dataForm="colocationPrice" v-model="adUser.locationType.LM_LCD.pricePerNight" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <h3 v-if="adUser.locationType.LM_LCD.pricePerNight" class="float-right">{{ calculpriceLM_LCD() | numeralFormat }} € / an</h3>
            <h4 v-if="adUser.locationType.LM_LCD.pricePerNight" class="float-right">{{ Math.round(calculpriceLM_LCD() / 12) | numeralFormat }} € / mois - </h4>
          </div>
          <div class="mb-5">
            <h5>Location courte durée meublé</h5>
            <FormRow :dataForm="minNumberNight" v-model="adUser.locationType.LCD.minNumberNight" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <p>Vos types de logements</p>
            <EditableTable :dataForm="logementsType" :toComplete="adUser.locationType.LCD.logementsType" id="formInTab"></EditableTable>
            <h3 v-if="adUser.locationType.LCD.logementsType.length > 0" class="float-right">{{ calculpriceLCD() | numeralFormat }} € / mois</h3>
          </div>
        </div>
        <div class="col-10 descriptif">
          <h4>Crédit</h4>
            <p> prix du bien <button type="button" class="btn btn-link" data-toggle="tooltip" data-placement="top" title="Le prix est caculé en fonction de la proposition de prix ou du prix du bien avec les travaux"><i class="far fa-question-circle"></i></button>: {{ calculPriceProperty() }} € </p>
            <p> Frais de notaire<button type="button" class="btn btn-link" data-toggle="tooltip" data-placement="top" title="Le prix est caculé en fonction de la proposition de prix ou du prix du bien sans les travaux, sur une marge haute de 10%"><i class="far fa-question-circle"></i></button>: {{ calculNotaryFees() }} €</p>
            <FormRow :dataForm="downpayment" v-model="credit.downpayment" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <div class="form-group row">
            <label :class="sizeLabel.label">Durée du crédit</label>
            <div :class="sizeLabel.input">
              <select id="inputState" class="form-control" v-model="credit.interestRate">
                <option value="0.95">Durée 7 ans - Taux d'intérêt 0.95 %</option>
                <option value="1.01">Durée 10 ans - Taux d'intérêt 1.01 %</option>
                <option value="1.17">Durée 15 ans - Taux d'intérêt 1.17 %</option>
                <option selected value="1.32">Durée 20 ans - Taux d'intérêt 1.32 %</option>
                <option value="1.65">Durée 25 ans - Taux d'intérêt 1.65 %</option>
              </select>
            </div>
          </div>
          <h3 class="float-right d-block">{{ calculTotalPrice() | numeralFormat }} €</h3>
        </div>
        <!-- <div class="col-10 descriptif">
          <h4>Notes</h4>
          <h4>questions</h4>
        </div> !-->
        <div class="col-10 descriptif" style="background-color: #f3f5fa; margin-bottom: 20px;">
          <button type="button" class="btn btn-outline-primary mt-3" @click='addAdUser' style="float: right">Enregistrer</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import _ from 'lodash'
import router from '../router/index'
import Caroussel from '../components/Caroussel.vue'
import EditableTable from '../components/EditableTable'
import FormRow from '../components/FormRow.vue'

export default {
  components: {
    Caroussel,
    FormRow,
    EditableTable
  },
  data () {
    return {
      adId: null,
      ad: {},
      credit: {
        priceProperty: null,
        notaryFees: null,
        interestRate: 1.32,
        downpayment: 0,
        sumPrice: null,
        monthlyPayment: null
      },
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
      },
      address: { title: 'Adresse', placeholder: 'Ex: N° rue' },
      propositionPrice: { title: 'Proposition au prix (€)', placeholder: 'Ex: 250000' },
      generalWorks: {
        title: 'Travaux généraux',
        labels: ['Intitulé', 'Prix (€)'],
        keyObj: ['name', 'price'],
        placeHolders: ['Ex: électricité', 'Ex: 30 000'],
        typeInputs: ['text', 'number']
      },
      rooms: {
        title: 'Travaux par pièce',
        labels: ['Intitulé', 'Surface ( m² )', 'Travaux', 'Prix (€)'],
        keyObj: ['name', 'area', 'works', 'price'],
        placeHolders: ['Ex: chambre 1', '9', 'sol + peinture', 'Ex: 2 000'],
        typeInputs: ['text', 'number', 'text', 'number']
      },
      sizeLabel: {
        label: 'col-3',
        input: 'col-sm-7'
      },
      exploitationPrice: { title: 'Prix envisagé (€)', placeholder: 'Ex: 250' },
      colocationPrice: { title: 'Prix envisagé (€)/ chambres', placeholder: 'Ex: 250' },
      countBedRoom: { title: 'Nombre de chambre', placeholder: 'Ex: 3' },
      countMonthLCD: { title: 'Nombre de mois', placeholder: '' },
      minNumberNight: { title: 'Nombre de nuit minimum', placeholder: '' },
      downpayment: { title: 'Votre apport (€)', placeholder: '' },
      logementsType: {
        title: '',
        labels: ['Type', 'Quantité', 'Prix (€)'],
        keyObj: ['name', 'number', 'price'],
        placeHolders: ['Ex: studio', 'Ex: 2', 'Ex: 20'],
        typeInputs: ['text', 'number', 'number']
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
    ...mapActions('adsUser', ['createAdUser', 'fetchAdsUser', 'updateAdUser']),
    calculLowerPrice () {
      if (this.adUser.propositionPrice) {
        this.adUser.propositionPrice = parseInt(this.adUser.propositionPrice, 10)
        const delta = this.ad.price - this.adUser.propositionPrice
        return Math.round(delta / this.ad.price * 100)
      }
      return 0
    },
    calculWorksPrice () {
      let price = _.reduce(this.adUser.rooms, (acc, o) => {
        return o.price + acc
      }, 0)
      price = price + _.reduce(this.adUser.generalWorks, (acc, o) => {
        return o.price + acc
      }, 0)
      return price
    },
    calculPriceProperty () {
      if (this.adUser.propositionPrice) {
        this.credit.priceProperty = parseInt(this.adUser.propositionPrice) + this.calculWorksPrice() - parseInt(this.credit.downpayment)
      } else {
        this.credit.priceProperty = this.ad.price + this.calculWorksPrice() - parseInt(this.credit.downpayment)
      }
      return this.credit.priceProperty
    },
    calculNotaryFees () {
      if (this.adUser.propositionPrice) {
        this.credit.notaryFees = parseInt(this.adUser.propositionPrice) * 10 / 100
      } else {
        this.credit.notaryFees = this.ad.price * 10 / 100
      }
      return this.credit.notaryFees
    },
    calculTotalPrice () {
      this.credit.sumPrice = this.credit.priceProperty * parseFloat(this.credit.interestRate)
      this.credit.monthlyPayment = this.credit.sumPrice / 12 / 20
      return this.credit.sumPrice
    },
    calculpriceLN (price) {
      if (price) {
        return parseInt(price) - this.credit.monthlyPayment
      }
      return 0
    },
    calculpriceLC () {
      if (this.adUser.locationType.LC.bedRoomPrice && this.adUser.locationType.LC.countBedRoom) {
        this.adUser.locationType.LC.bedRoomPrice = parseInt(this.adUser.locationType.LC.bedRoomPrice)
        this.adUser.locationType.LC.countBedRoom = parseInt(this.adUser.locationType.LC.countBedRoom)
        return this.adUser.locationType.LC.bedRoomPrice * this.adUser.locationType.LC.countBedRoom - this.credit.monthlyPayment
      }
      return 0
    },
    calculpriceLM_LCD () {
      const bool = this.adUser.locationType.LM_LCD.priceLM && this.adUser.locationType.LM_LCD.pricePerNight && this.adUser.locationType.LM_LCD.countBedRoom
      if (bool) {
        this.adUser.locationType.LM_LCD.countMonthLCD = parseInt(this.adUser.locationType.LM_LCD.countMonthLCD)
        this.adUser.locationType.LM_LCD.priceLM = parseInt(this.adUser.locationType.LM_LCD.priceLM)
        this.adUser.locationType.LM_LCD.countBedRoom = parseInt(this.adUser.locationType.LM_LCD.countBedRoom)
        this.adUser.locationType.LM_LCD.pricePerNight = parseInt(this.adUser.locationType.LM_LCD.pricePerNight)
        this.adUser.locationType.LM_LCD.minNumberNight = parseInt(this.adUser.locationType.LM_LCD.minNumberNight)
        const moisNormal = 12 - this.adUser.locationType.LM_LCD.countMonthLCD
        const normalPrice = moisNormal * this.adUser.locationType.LM_LCD.priceLM
        const priceLM = this.adUser.locationType.LM_LCD.countBedRoom * this.adUser.locationType.LM_LCD.pricePerNight * this.adUser.locationType.LM_LCD.countMonthLCD * this.adUser.locationType.LM_LCD.minNumberNight
        const totalPrice = normalPrice + priceLM
        return totalPrice - this.credit.sumPrice / 20
      }
      return 0
    },
    calculpriceLCD () {
      if (this.adUser.locationType.LCD.logementsType.length > 0) {
        this.adUser.locationType.LCD.minNumberNight = parseInt(this.adUser.locationType.LCD.minNumberNight)
        const price = _.reduce(this.adUser.locationType.LCD.logementsType, (acc, o) => {
          return o.price * o.number + acc
        }, 0)
        return price * this.adUser.locationType.LCD.minNumberNight - this.credit.monthlyPayment
      }
      return 0
    },
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
        router.replace('/ads')
      }
    }
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
