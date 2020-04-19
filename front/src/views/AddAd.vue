<template>
  <div class="col-9" id="city">
    <div class="ad" id="item">
      <form>
        <h4>Informations générales</h4>
          <FormRow :dataForm="titre"></FormRow>
        <div class="form-row">
          <FormRow :dataForm="prix"></FormRow>
          <FormRow :dataForm="prixm2" :sizeLabel="sizeLabel"></FormRow>
        </div>
        <div class="form-row">
          <FormRow :dataForm="ville"></FormRow>
          <FormRow :dataForm="cp" :sizeLabel="sizeLabel"></FormRow>
        </div>
        <FormRow :dataForm="surface"></FormRow>
        <FormRow :dataForm="description"></FormRow>
      </form>
    </div>
    <div class="ad" id="item">
      <form>
        <h4>...</h4>
          <FormRow :dataForm="permalien"></FormRow>
          <FormRow :dataForm="id_annonce"></FormRow>
          <FormRow :dataForm="source"></FormRow>
          <FormRow :dataForm="phone"></FormRow>
      </form>
    </div>
    <div class="ad" id="item">
      <form>
        <h4>Détails</h4>
          <FormRow :dataForm="surface_terrain"></FormRow>
          <FormRow :dataForm="nbpieces"></FormRow>
          <FormRow :dataForm="nbchambres"></FormRow>
          <FormRow :dataForm="date_construction"></FormRow>
      </form>
    </div>
    <ItemArrayForm :dataForm="equipments" :itemToComplete="ad.equipment"></ItemArrayForm>
    <ItemArrayForm :dataForm="imgs" :itemToComplete="ad.img"></ItemArrayForm>
    <button type="button" class="btn btn-outline-primary mt-3" @click='addAd' style="float: right">Ajouter l'annonce</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import ItemArrayForm from '../components/ItemArrayForm.vue'
import FormRow from '../components/FormRow.vue'
export default {
  components: {
    FormRow,
    ItemArrayForm
  },
  data: () => ({
    sizeLabel: {
      label: 'col-4',
      input: 'col-8'
    },
    ad: {
      img: [],
      equipment: []
    },
    equipments: {
      titre: 'Equipements',
      description: 'Ici, vous pouvez sauvegarder les équipements de l\'annonce.',
      label: 'Equipement',
      placeHolder: 'Ex: parking, four, ...'
    },
    imgs: {
      titre: 'Images',
      description: 'Ici, vous pouvez sauvegarder les url des images de l\'annonce.',
      label: 'Url de l\'image',
      placeHolder: ''
    },
    titre: { title: 'Titre', model: null, placeholder: 'Ex: Maison/villa de 118m² - 5 chambres - Lorient' },
    id_annonce: { title: 'id', model: null, placeholder: 'Ex: 744931 pour iad' },
    ville: { title: 'Ville', model: null, placeholder: 'Ex: Lorient' },
    prix: { title: 'Prix', model: null, placeholder: 'Ex: 335000' },
    cp: { title: 'Code postale', model: null, placeholder: 'Ex: 56100' },
    surface: { title: 'Surface', model: null, placeholder: 'Ex: 118' },
    prixm2: { title: 'prix au m²', model: null, placeholder: 'Ex: 2839' },
    description: { title: 'Description', model: null, placeholder: '' },
    // neuf: { title: 'Code postale', model: null, placeholder: 'Ex: 56100' },
    surface_terrain: { title: 'Surface de terrain', model: null, placeholder: 'Ex: 430' },
    nbpieces: { title: 'Nombre de pièces', model: null, placeholder: 'Ex: 6' },
    nbchambres: { title: 'Nombre de chambres', model: null, placeholder: 'Ex: 5' },
    permalien: { title: 'Lien de l\'annonce', model: null, placeholder: 'Ex: https://source.fr/' },
    phone: { title: 'Numéro de téléphone de l\'agence', model: null, placeholder: 'Ex: 00 00 00 00 00' },
    source: { title: 'Source', model: null, placeholder: 'Ex: iad' },
    date_construction: { title: 'Date de construction', model: null, placeholder: 'Ex: 1986' }
  }),
  computed: {
    ...mapState('ads', ['ads'])
  },
  methods: {
    ...mapActions('ads', ['createAd']),
    ...mapMutations('cities', ['addCity']),
    async addAd () {
      const ad = {
        img: this.ad.img,
        equipment: this.ad.equipment,
        titre: this.titre.model,
        id_annonce: this.id_annonce.model,
        ville: this.ville.model,
        prix: this.prix.model,
        cp: this.cp.model,
        surface: this.surface.model,
        prixm2: this.prixm2.model,
        description: this.description.model,
        // neuf: neuf.model,
        surface_terrain: this.surface_terrain.model,
        nbpieces: this.nbpieces.model,
        nbchambres: this.nbchambres.model,
        permalien: this.permalien.model,
        phone: this.phone.model,
        source: this.source.model,
        date_construction: this.date_construction.model
      }
      console.log('ad', ad)
      this.createAd({ ad: ad })
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
