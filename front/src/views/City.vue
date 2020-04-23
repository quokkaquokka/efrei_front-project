<template>
  <div>
    <div class="row">
      <div class="col-9" id="city">
        <CityItem :city="city"></CityItem>
        <div class="col-6" id="cityDescriptionsLeft">
          <Chart
            :dataChart="dataPopulations"
          ></Chart>
        </div>
        <div class="col-6" id="cityDescriptionsRight">
          <Chart
            :dataChart="dataLogementsType"
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
            <p><b>{{ parking.name }}</b>: {{ parking.number }}</p>
          </div>
          <h3>Établissements Scolaires</h3>
          <div v-for="school of city.schools" :key="school.name">
            <p><b>{{ school.name }}</b>: {{ school.number }}</p>
          </div>
        </div>
          <CityUserForm
            :cityId="cityId"
            :citiesUser="citiesUser"
          ></CityUserForm>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import Chart from '../components/Chart.vue'
import CityUserForm from '../components/CityUserForm.vue'
import CityItem from '../components/CityItem.vue'

export default {
  components: {
    Chart,
    CityUserForm,
    CityItem
  },
  data: () => ({
    citiesUser: {
      hotels: [],
      hotelsCount: null,
      streets: [],
      attractivities: [],
      roads: [],
      publicTransports: [],
      demography: null
    },
    dataPopulations: {
      values: null,
      labels: ['Propriétaires', 'Locataires'],
      title: 'Répartition locataires/propriétaires',
      colors: ['#6610f2', '#6f42c1'],
      id: 'idChartPopulation',
      type: 'pie'
    },
    dataLogementsType: {
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
    }
  }),
  async created () {
    this.city = this.getCityById(this.cityId) || {}
    this.dataPopulations.values = [this.city.owners, this.city.tenants]
    this.dataPopulations.labels = ['Propriétaire', 'Locataires']
    this.createDataLogementsType()
    this.createDataSocio()
    if (this.isAuthenticated) {
      await this.fetchCitiesUser({ uid: this.user._id })
      if (this.getCityUserByCityId(this.cityId)) {
        this.citiesUser = this.getCityUserByCityId(this.cityId)
      }
    }
  },
  methods: {
    ...mapActions('user', ['fetchUser']),
    ...mapActions('citiesUser', ['fetchCitiesUser']),
    createDataLogementsType () {
      this.city.sizeBuildings.forEach(element => {
        this.dataLogementsType.values.push(element.percent)
        const label = element.name + ' ' + element.percent + '% ' + element.price + '€/mois'
        this.dataLogementsType.labels.push(label)
      })
    },
    createDataSocio () {
      this.city.socioProfessionalCat.forEach(element => {
        this.dataSocio.values.push(element.percent)
        this.dataSocio.labels.push(element.name)
      })
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('cities', ['cities']),
    ...mapGetters('cities', ['getCityById']),
    ...mapGetters('citiesUser', ['getCityUserByCityId']),
    ...mapGetters('user', ['isAuthenticated']),
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
  margin-top: 20px;
  float: right;
}
</style>
