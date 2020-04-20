<template>
  <div class="col-9" id="city">
    <div class="ad" id="item">
      <form>
        <div>
          <h4>Informations générales</h4><br>
          <FormRow :dataForm="name" v-model="city.name" ></FormRow>
          <FormRow :dataForm="departement" v-model="city.departement"></FormRow>
          <FormRow :dataForm="postalCode" v-model="city.postalCode"></FormRow>
          <FormRow :dataForm="prixMoyen" v-model="city.prixMoyen" inputType="number"></FormRow>
          <FormRow :dataForm="locataires" v-model="city.locataires" inputType="number"></FormRow>
        </div>
      </form>
    </div>
    <FormInTab :dataForm="tailleLogement" :toComplete="city.tailleLogement"> </FormInTab>
    <FormInTab :dataForm="catSocioprofessionelle" :toComplete="city.catSocioprofessionelle"> </FormInTab>
    <FormInTab :dataForm="parkings" :toComplete="city.parkings"> </FormInTab>
    <FormInTab :dataForm="eta_scolaires" :toComplete="city.eta_scolaires"> </FormInTab>
    <button v-if="!$route.params.id" type="button" class="btn btn-outline-primary mt-3" @click='addCity' style="float: right">Ajouter la ville</button>
    <button v-if="$route.params.id" type="button" class="btn btn-outline-primary mt-3" @click='editCity' style="float: right">Modifier la ville</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import FormRow from '../components/FormRow.vue'
import FormInTab from '../components/FormInTab.vue'
export default {
  components: {
    FormRow,
    FormInTab
  },
  data: () => ({
    city: {
      name: null,
      departement: null,
      postalCode: null,
      prixMoyen: 1,
      locataires: 1,
      tailleLogement: [],
      catSocioprofessionelle: [],
      parkings: [],
      eta_scolaires: []
    },
    name: { title: 'Nom de la ville', placeholder: 'Ex: Villejuif' },
    departement: { title: 'Département', placeholder: 'Ex: Val-de-Marne' },
    postalCode: { title: 'Code Postal', placeholder: 'Ex: 94800' },
    prixMoyen: { title: 'Prix moyen', placeholder: 'Ex: 5359' },
    locataires: { title: 'locataires (%)', placeholder: 'Ex: 61.2' },
    tailleLogement: {
      titre: 'Tailles de logement',
      labels: ['Nom', 'Pourcentage', 'Prix (€)'],
      keyObj: ['name', 'pourcentage', 'prix'],
      placeHolders: ['Ex: T1', 'Ex: 4.8', 'Ex: 380'],
      typeInputs: ['text', 'number', 'number']
    },
    catSocioprofessionelle: {
      titre: 'Catégories socio-professionnelles',
      labels: ['Nom', 'Pourcentage'],
      keyObj: ['name', 'chiffre'],
      placeHolders: ['Ex: Actifs', 'Ex: 53'],
      typeInputs: ['text', 'number']
    },
    eta_scolaires: {
      titre: 'Les établissements scolaires',
      labels: ['Nom', 'Nombre'],
      keyObj: ['name', 'nb'],
      placeHolders: ['Ex: école primaire', 'Ex: 23'],
      typeInputs: ['text', 'number']
    },
    parkings: {
      titre: 'Parkings',
      labels: ['Nom', 'Pourcentage'],
      keyObj: ['name', 'chiffre'],
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
      this.city.locataires = parseInt(this.city.locataires, 10)
      this.city.proprietaires = 100 - this.city.locataires
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
