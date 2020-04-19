<template>
  <div class="col-9" id="city">
    <div class="ad" id="item">
      <form>
        <div>
          <h4>Informations générales</h4><br>
          <FormRow :dataForm="name" ></FormRow>
          <FormRow :dataForm="departement" ></FormRow>
          <FormRow :dataForm="postalCode" ></FormRow>
          <FormRow :dataForm="prixMoyen" ></FormRow>
          <FormRow :dataForm="locataires" ></FormRow>
        </div>
      </form>
    </div>
    <FormInTab :dataForm="tailleLogement" :toComplete="city.tailleLogement"> </FormInTab>
    <FormInTab :dataForm="catSocioprofessionelle" :toComplete="city.catSocioprofessionelle"> </FormInTab>
    <FormInTab :dataForm="parkings" :toComplete="city.parkings"> </FormInTab>
    <FormInTab :dataForm="eta_scolaires" :toComplete="city.eta_scolaires"> </FormInTab>
    <button type="button" class="btn btn-outline-primary mt-3" @click='addCity' style="float: right">Ajouter la ville</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import FormRow from '../components/FormRow.vue'
import FormInTab from '../components/FormInTab.vue'
export default {
  components: {
    FormRow,
    FormInTab
  },
  data: () => ({
    city: {
      tailleLogement: [],
      catSocioprofessionelle: [],
      parkings: [],
      eta_scolaires: []
    },
    name: { title: 'Nom de la ville', model: null, placeholder: 'Ex: Villejuif' },
    departement: { title: 'Département', model: null, placeholder: 'Ex: Val-de-Marne' },
    postalCode: { title: 'Code Postal', model: null, placeholder: 'Ex: 94800' },
    prixMoyen: { title: 'Prix moyen', model: null, placeholder: 'Ex: 5359' },
    locataires: { title: 'locataires (%)', model: null, placeholder: 'Ex: 61.2' },
    tailleLogement: {
      titre: 'Tailles de logement',
      labels: ['Nom', 'Pourcentage', 'Prix'],
      keyObj: ['name', 'pourcentagge', 'prix'],
      placeHolders: ['Ex: T1', 'Ex: 4.8', 'Ex: 380 €'],
      typeInputs: ['text', 'number', 'text']
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
    ...mapState('cities', ['cities'])
  },
  methods: {
    ...mapActions('cities', ['createCity']),
    ...mapMutations('cities', ['addCity']),
    async addCity () {
      const city = {
        name: this.name.model,
        departement: this.departement.model,
        postalCode: this.postalCode.model,
        prixMoyen: this.prixMoyen.model,
        locataires: this.locataires.model
      }
      await this.createCity({ city: city })
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
