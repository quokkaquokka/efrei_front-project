<template>
  <div class="col-9" id="city">
    <form>
      <div class="ad" id="item">
        <h4>Informations générales</h4>
          <FormRow :dataForm="title" v-model="ad.title" ></FormRow>
        <div class="form-row">
          <FormRow :dataForm="prix" v-model="ad.price"></FormRow>
          <FormRow :dataForm="prixm2" v-model="ad.pricem2" :sizeLabel="sizeLabel"></FormRow>
        </div>
        <div class="form-row">
          <FormRow :dataForm="ville" v-model="ad.city"></FormRow>
          <FormRow :dataForm="cp" v-model="ad.postalCode" :sizeLabel="sizeLabel"></FormRow>
        </div>
        <FormRow :dataForm="surface" v-model="ad.buildingArea"></FormRow>
        <FormRow :dataForm="description" v-model="ad.description"></FormRow>
      </div>
      <div class="ad" id="item">
        <h4>...</h4>
          <FormRow :dataForm="permalien" v-model="ad.permalink"></FormRow>
          <FormRow :dataForm="id_annonce" v-model="ad.idAd"></FormRow>
          <FormRow :dataForm="source" v-model="ad.source"></FormRow>
          <FormRow :dataForm="phone" v-model="ad.phone"></FormRow>
      </div>
      <div class="ad" id="item">
        <h4>Détails</h4>
          <FormRow :dataForm="surface_terrain" v-model="ad.areaLand"></FormRow>
          <FormRow :dataForm="nbpieces" v-model="ad.rooms" inputType="number"></FormRow>
          <FormRow :dataForm="nbchambres" v-model="ad.bedRooms"></FormRow>
          <FormRow :dataForm="date_construction" v-model="ad.constructionDate"></FormRow>
      </div>
      <PillsTabForm :dataForm="equipments" :itemToComplete="ad.equipments"></PillsTabForm>
      <PillsTabForm :dataForm="pictures" :itemToComplete="ad.pictures"></PillsTabForm>
      <div id="caroussel">
        <Caroussel :pictures="ad.pictures" :index="ad.pictures.lenght"></Caroussel>
      </div>
      <button type="button" class="btn btn-outline-primary mt-3" @click='addAd' style="float: right">Enregistrer l'annonce</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Caroussel from '../components/Caroussel.vue'
import FormRow from '../components/FormRow.vue'
import PillsTabForm from '../components/PillsTabForm.vue'

export default {
  components: {
    Caroussel,
    FormRow,
    PillsTabForm
  },
  data: () => ({
    sizeLabel: {
      label: 'col-4',
      input: 'col-8'
    },
    ad: {
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
      // neuf: { title: 'Code postale', model: null, placeholder: 'Ex: 56100' },
      areaLand: null,
      rooms: null,
      bedroomss: null,
      permalink: null,
      phone: null,
      source: null,
      constructionDate: null
    },
    equipments: {
      title: 'Equipements',
      description: 'Ici, vous pouvez sauvegarder les équipements de l\'annonce.',
      label: 'Equipement',
      placeHolder: 'Ex: parking, four, ...'
    },
    pictures: {
      title: 'Images',
      description: 'Ici, vous pouvez sauvegarder les url des images de l\'annonce.',
      label: 'Url de l\'image',
      placeHolder: ''
    },
    title: { title: 'Titre', placeholder: 'Ex: Maison/villa de 118m² - 5 chambres - Lorient' },
    id_annonce: { title: 'id', placeholder: 'Ex: 744931 pour iad' },
    ville: { title: 'Ville', placeholder: 'Ex: Lorient' },
    prix: { title: 'Prix', placeholder: 'Ex: 335000' },
    cp: { title: 'Code postale', placeholder: 'Ex: 56100' },
    surface: { title: 'Surface', placeholder: 'Ex: 118' },
    prixm2: { title: 'prix au m²', placeholder: 'Ex: 2839' },
    description: { title: 'Description', placeholder: '' },
    // neuf: { title: 'Code postale', model: null, placeholder: 'Ex: 56100' },
    surface_terrain: { title: 'Surface de terrain', placeholder: 'Ex: 430' },
    nbpieces: { title: 'Nombre de pièces', placeholder: 'Ex: 6' },
    nbchambres: { title: 'Nombre de chambres', placeholder: 'Ex: 5' },
    permalien: { title: 'Lien de l\'annonce', placeholder: 'Ex: https://source.fr/' },
    phone: { title: 'Numéro de téléphone de l\'agence', placeholder: 'Ex: 00 00 00 00 00' },
    source: { title: 'Source', placeholder: 'Ex: iad' },
    date_construction: { title: 'Date de construction', placeholder: 'Ex: 1986' }
  }),
  computed: {
    ...mapGetters('ads', ['getAdById'])
  },
  mounted () {
    if (this.$route.params.id) {
      this.ad = this.getAdById(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('ads', ['createAd', 'updateAd']),
    async addAd () {
      if (this.ad._id) {
        await this.updateAd({ ad: this.ad })
        this.$router.push('/dashads')
      } else {
        await this.createAd({ ad: this.ad })
        this.$router.push('/dashads')
      }
    }
  }
}
</script>

<style>
#pills {
  display: inline-block;
  margin-right: 10px;
}

#caroussel {
  display: block;
  width: 80%;
  margin: auto;
  margin-top: 20px;
}
</style>
