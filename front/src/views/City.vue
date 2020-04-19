<template>
  <div>
    <div class="row">
      <div class="col-9" id="city">
        <CityItem :city="city"></CityItem>
        <div class="col-6" id="cityDescriptionsLeft">
          <Chart
            :dataChart="dataPopulation"
          ></Chart>
        </div>
        <div class="col-6" id="cityDescriptionsRight">
          <Chart
            :dataChart="dataTypeLogement"
          ></Chart>
        </div>
        <div class="col-6" id="cityDescriptionsLeft">
          <Chart
            :dataChart="dataSocio"
          ></Chart>
        </div>
        <div class="col-6" id="cityDescriptionsRight">
          <h3>Parkings</h3>
          <div v-for="parking of city.parkings" :key="parking.name">
            <p><b>{{ parking.name }}</b>: {{ parking.chiffre }}</p>
          </div>
          <h3>Etablissement Scolaire</h3>
          <div v-for="eta of city.eta_scolaires" :key="eta.name">
            <p><b>{{ eta.name }}</b>: {{ eta.nb }}</p>
          </div>
        </div>
          <CityForm
            :cityId="cityId"
            :citiesUser="citiesUser"
          ></CityForm>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import CityItem from '../components/CityItem.vue'
import Chart from '../components/Chart.vue'
import CityForm from '../components/CityForm.vue'
export default {
  components: {
    CityItem,
    Chart,
    CityForm
  },
  data: () => ({
    citiesUser: {
      nbHotels: null,
      demographie: null,
      hotels: [],
      attractivites: [],
      quartiers: [],
      routes: [],
      transports: []
    },
    dataPopulation: {
      values: null,
      labels: ['Propriétaire', 'Locataires'],
      title: 'Répartition locataires/propriétaires',
      colors: ['#6610f2', '#6f42c1'],
      id: 'idChartPopulation',
      type: 'pie'
    },
    dataTypeLogement: {
      values: [],
      labels: [],
      title: 'Répartition par taille de logement',
      colors: ['#17a2b8', '#20c997', '#28a745', '#007bff', '#6610f2', '#6f42c1', '#e83e8c'],
      id: 'idChartLogement',
      type: 'pie'
    },
    dataSocio: {
      values: [],
      labels: [],
      title: 'Population par catégorie socioprofessionnelle',
      colors: ['#17a2b8', '#20c997', '#28a745', '#007bff', '#6610f2', '#6f42c1', '#e83e8c'],
      id: 'idChartSocio',
      type: 'bar'
    },
    nameHotel: '',
    prixHotel: null
  }),
  async created () {
    this.city = this.getCityById(this.cityId) || {}
    this.dataPopulation.values = [this.city.proprietaires, this.city.locataires]
    this.dataPopulation.labels = ['Propriétaire', 'Locataires']
    this.createDataTypeLogement()
    this.createDataSocio()
    if (this.user) {
      await this.fetchCityUser({ uid: this.user.user._id, cid: this.cityId })
      this.citiesUser = this.getCityUserByCityId(this.cityId)
    }
  },
  methods: {
    ...mapActions('user', ['fetchUser']),
    ...mapActions('citiesUser', ['fetchCityUser']),
    createDataTypeLogement () {
      this.city.tailleLogement.forEach(element => {
        this.dataTypeLogement.values.push(element.pourcentage)
        const label = element.name + ' ' + element.pourcentage + '% ' + element.prix + '€/mois'
        this.dataTypeLogement.labels.push(label)
      })
    },
    createDataSocio () {
      this.city.catSocioprofessionelle.forEach(element => {
        this.dataSocio.values.push(element.chiffre)
        this.dataSocio.labels.push(element.name)
      })
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState('cities', ['cities']),
    ...mapGetters('cities', ['getCityById']),
    ...mapGetters('citiesUser', ['getCityUserByCityId']),
    cityId () {
      return this.$route.params.id
    }
  }
}
</script>

<style>
#cityDescriptionsLeft {
  display: inline-block;
  background-color: #F9F9F9;
  border: 1px solid #d3d3d3;
  margin-top: 20px;
}
#cityDescriptionsRight {
  display: inline-block;
  background-color: #F9F9F9;
  border: 1px solid #d3d3d3;
  float: right;
  margin-top: 20px;
}
</style>
