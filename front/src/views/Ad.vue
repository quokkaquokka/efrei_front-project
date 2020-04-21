<template>
  <div class="adDetails">
    <div class="caroussel">
      <Caroussel :imgs="ad.img" :index="ad.img.lenght"></Caroussel>
    </div>
    <div class="details">
      <div class="row" style="float:center">
      <div class="col-6">
        <div class="descriptif">
          <h3>{{ ad.titre }}</h3>
          <h4><i class="fas fa-map-marker-alt"></i> {{ ad.ville }} </h4><span>( {{ad.cp}} )</span><br>
          <h2> {{ ad.prix }} €</h2><span> {{ ad.prixm2 }} €/m²</span>
          <div class="row">
            <div class="col-3">
              <p>Surface</p>
              <h3><i class="fas fa-ruler-combined"></i> {{ ad.surface }}</h3>
            </div>
            <div class="col-3">
              <p>Nb de pièces</p>
              <h3><i class="fas fa-cube"></i> {{ ad.nbchambres }}</h3>
            </div>
            <div class="col-3">
              <p>Nb de chambres</p>
              <h3><i class="fas fa-bed"></i> {{ ad.nbchambres }}</h3>
            </div>
            <div class="col-3">
              <p>Date de construction</p>
              <h3><i class="far fa-calendar-alt"></i> {{ ad.date_construction }}</h3>
            </div>
          </div>
        </div>
        <div class="descriptif">
          <h3> Descriptif </h3>
          <p v-html="`${ ad.description }`"></p>
          <h3> Equipement </h3>
          <div v-for="item in ad.equipement" :key="item" id="pills">
            <h4><span class="badge badge-secondary">{{ item }}</span></h4>
          </div>
        </div>
        <div class="descriptif">
          <h3>Source</h3>
          <p><a :href="ad.permalien">Lien: {{ ad.source }}</a></p>
          <p>id de l'annonce: {{ ad.id_annonce }}</p>
          <p>contact: {{ ad.phone }}</p>
        </div>
      </div>
      <div class="col-6">
        <div class="descriptif" style="height: 290px">
          <FormRow :dataForm="adresse" v-model="adUser.adresse" :sizeLabel="sizeLabel"></FormRow>
          <FormRow :dataForm="prixProposition" v-model="adUser.prixProposition" :sizeLabel="sizeLabel"></FormRow>
          <h4 style="float:right" v-if="adUser.prixProposition"> - {{ calculBaissePrix() }} % du prix initial</h4>
        </div>
        <FormInTab :dataForm="travauxGeneraux" :toComplete="adUser.travauxGeneraux" id="formInTab"></FormInTab>
        <FormInTab :dataForm="pieces" :toComplete="adUser.pieces" id="formInTab"></FormInTab>
        <div class="descriptif">
          <h4>Coût total des travaux</h4>
          <h3 style="float:right">6789 €</h3>
        </div>
        <div class="descriptif">
          <h4>Types d'exploitation</h4>
          <h6>Location nue</h6>
          <h6>Colocation</h6>
          <h6>Location mixte (meublé + courte durée)</h6>
          <h6>Location courte durée</h6>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Caroussel from '../components/Caroussel.vue'
import FormRow from '../components/FormRow.vue'
import FormInTab from '../components/FormInTab'
export default {
  components: {
    Caroussel,
    FormRow,
    FormInTab
  },
  data () {
    return {
      ad: null,
      adUser: {
        adresse: null,
        prixProposition: null,
        autre: '',
        pieces: [],
        travauxGeneraux: [],
        locationType: []
      },
      adresse: { title: 'Adresse', placeholder: 'Ex: N° rue' },
      prixProposition: { title: 'Proposition au prix', placeholder: 'Ex: 250000€' },
      travauxGeneraux: {
        titre: 'Travaux généraux',
        labels: ['Intitulé', 'Prix (€)'],
        keyObj: ['intitule', 'prix'],
        placeHolders: ['Ex: électricité', 'Ex: 30 000'],
        typeInputs: ['text', 'number']
      },
      pieces: {
        titre: 'Travaux généraux',
        labels: ['Intitulé', 'Surface ( m² )', 'Travaux', 'Prix (€)'],
        keyObj: ['intitule', 'surface', 'travaux', 'prix'],
        placeHolders: ['Ex: chambre 1', '9', 'sol + peinture', 'Ex: 2 000'],
        typeInputs: ['text', 'number', 'text', 'number']
      },
      sizeLabel: {
        label: 'col-3',
        input: 'col-sm-7'
      }
    }
  },
  async mounted () {
    this.ad = await this.getAdById(this.$route.params.id)
  },
  computed: {
    ...mapState('ads', ['ads']),
    ...mapGetters('ads', ['getAdById'])
  },
  methods: {
    ...mapActions('ads', ['fetchAd']),
    calculBaissePrix () {
      if (this.adUser.prixProposition) {
        this.adUser.prixProposition = parseInt(this.adUser.prixProposition, 10)
        const delta = this.ad.prix - this.adUser.prixProposition
        return Math.round(delta / this.ad.prix * 100)
      }
      return 0
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
  margin-top: 10px;
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
