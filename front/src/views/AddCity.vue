<template>
  <div class="col-9" id="city">
    <div class="ad" id="item">
      <form>
        <div>
          <h4>Informations générales</h4><br>
          <FormRow :dataForm="name" v-model="city.name" ></FormRow>
          <FormRow :dataForm="departement" v-model="city.department"></FormRow>
          <FormRow :dataForm="postalCode" v-model="city.postalCode"></FormRow>
          <FormRow :dataForm="prixMoyen" v-model="city.averagePrice" inputType="number"></FormRow>
          <FormRow :dataForm="locataires" v-model="city.tenants" inputType="number"></FormRow>
        </div>
      </form>
    </div>
    <EditableTable :dataForm="sizeBuildings" :toComplete="city.sizeBuildings"> </EditableTable>
    <EditableTable :dataForm="socioProfessionalCat" :toComplete="city.socioProfessionalCat"> </EditableTable>
    <EditableTable :dataForm="parkings" :toComplete="city.parkings"> </EditableTable>
    <EditableTable :dataForm="schools" :toComplete="city.schools"> </EditableTable>
    <button v-if="!$route.params.id" type="button" class="btn btn-outline-primary mt-3" @click='addCity' style="float: right">Ajouter la ville</button>
    <button v-if="$route.params.id" type="button" class="btn btn-outline-primary mt-3" @click='editCity' style="float: right">Modifier la ville</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import EditableTable from '../components/EditableTable.vue'
import FormRow from '../components/FormRow.vue'
export default {
  components: {
    EditableTable,
    FormRow
  },
  data: () => ({
    city: {
      name: null,
      department: null,
      postalCode: null,
      averagePrice: 1,
      tenants: 1,
      sizeBuildings: [],
      socioProfessionalCat: [],
      parkings: [],
      schools: []
    },
    name: { title: 'Nom de la ville', placeholder: 'Ex: Villejuif' },
    departement: { title: 'Département', placeholder: 'Ex: Val-de-Marne' },
    postalCode: { title: 'Code Postal', placeholder: 'Ex: 94800' },
    prixMoyen: { title: 'Prix moyen', placeholder: 'Ex: 5359' },
    locataires: { title: 'locataires (%)', placeholder: 'Ex: 61.2' },
    sizeBuildings: {
      title: 'Tailles de logement',
      labels: ['Nom', 'Pourcentage', 'Prix (€)'],
      keyObj: ['name', 'percent', 'price'],
      placeHolders: ['Ex: T1', 'Ex: 4.8', 'Ex: 380'],
      typeInputs: ['text', 'number', 'number']
    },
    socioProfessionalCat: {
      title: 'Catégories socio-professionnelles',
      labels: ['Nom', 'Pourcentage'],
      keyObj: ['name', 'percent'],
      placeHolders: ['Ex: Actifs', 'Ex: 53'],
      typeInputs: ['text', 'number']
    },
    schools: {
      title: 'Les établissements scolaires',
      labels: ['Nom', 'Nombre'],
      keyObj: ['name', 'number'],
      placeHolders: ['Ex: école primaire', 'Ex: 23'],
      typeInputs: ['text', 'number']
    },
    parkings: {
      title: 'Parkings',
      labels: ['Nom', 'Pourcentage'],
      keyObj: ['name', 'number'],
      placeHolders: ['Ex: Ménages ayant un parking', 'Ex: 51'],
      typeInputs: ['text', 'number']
    }
  }),
  computed: {
    ...mapState('cities', ['cities']),
    ...mapGetters('cities', ['getCityById'])
  },
  mounted () {
    if (this.$route.params.id) {
      this.city = this.getCityById(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('cities', ['createCity', 'updateCity']),
    ...mapMutations('cities', ['addCity']),
    async addCity () {
      this.city.prixMoyen = parseInt(this.city.prixMoyen, 10)
      this.city.tenants = parseInt(this.city.tenants, 10)
      this.city.owners = 100 - this.city.tenants
      await this.createCity({ city: this.city })
      this.$router.push('/dashcities')
    },
    async editCity () {
      await this.updateCity({ city: this.city })
      this.$router.push('/dashcities')
    }
  }
}
</script>

<style>
#pills {
  display: inline-block;
  margin-right: 10px;
}
</style>
