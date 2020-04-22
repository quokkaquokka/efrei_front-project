<template>
  <div class="adDetails">
    <div class="caroussel">
      <Caroussel :imgs="ad.img" :index="ad.img.lenght"></Caroussel>
    </div>
    <div class="details">
        <div class="col-10 descriptif">
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
        <div class="col-10 descriptif">
          <h3> Descriptif </h3>
          <p v-html="`${ ad.description }`"></p>
          <h3> Equipement </h3>
          <div v-for="item in ad.equipement" :key="item" id="pills">
            <h4><span class="badge badge-secondary">{{ item }}</span></h4>
          </div>
        </div>
        <div class="col-10 descriptif">
          <h3>Source</h3>
          <p><a :href="ad.permalien">Lien: {{ ad.source }}</a></p>
          <p>id de l'annonce: {{ ad.id_annonce }}</p>
          <p>contact: {{ ad.phone }}</p>
        </div>
        <div class="col-10 descriptif">
          <FormRow :dataForm="adresse" v-model="adUser.adresse" :sizeLabel="sizeLabel"></FormRow>
          <FormRow :dataForm="prixProposition" v-model="adUser.prixProposition" :sizeLabel="sizeLabel" inputType="number"></FormRow>
          <h4 style="float:right" v-if="adUser.prixProposition"> - {{ calculBaissePrix() }} % du prix initial</h4>
        </div>
        <div class="col-10 descriptifTab">
          <EditableTable :dataForm="travauxGeneraux" :toComplete="adUser.travauxGeneraux" id="formInTab"></EditableTable>
        </div>
        <div class="col-10 descriptifTab">
          <EditableTable :dataForm="pieces" :toComplete="adUser.pieces" id="formInTab"></EditableTable>
        </div>
        <div class="col-10 descriptif">
          <h4>Coût total des travaux</h4>
          <h3 style="float:right"> {{ caculPrixTravaux() }} €</h3>
        </div>
        <div class="col-10 descriptif">
          <h4>Potentiel locatif</h4>
          <h3 style="float:right"> Cashflow par mois</h3>
          <div class="mb-5">
            <h5>Location longue durée vide</h5>
            <FormRow :dataForm="prixExploitation" v-model="adUser.locationType.LN.prix" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <h3 v-if="adUser.locationType.LN.prix" class="float-right">{{ calculprixLN(adUser.locationType.LN.prix) }} € / mois</h3>
          </div>
          <div class="mb-5">
          <h6>Colocation</h6>
            <FormRow :dataForm="nbChambres" v-model="adUser.locationType.LC.nbChambres" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <FormRow :dataForm="prixColocation" v-model="adUser.locationType.LC.prixChambre" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <h3 v-if="adUser.locationType.LC.prixChambre" class="float-right">{{ calculprixLC() }} € / mois</h3>
          </div>
          <div class="mb-5">
            <h6>Location longue durée meublé</h6>
            <FormRow :dataForm="prixExploitation" v-model="adUser.locationType.LM.prix" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <h3 v-if="adUser.locationType.LM.prix" class="float-right">{{ calculprixLN(adUser.locationType.LM.prix) }} € / mois</h3>
          </div>
          <div class="mb-5">
            <h6>Location mixte (meublé + courte durée)</h6>
            <h7>Longue durée</h7>
            <FormRow :dataForm="prixExploitation" v-model="adUser.locationType.LM_LCD.prixLongueDuree" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <h7>Courte durée</h7>
            <FormRow :dataForm="nbMois" v-model="adUser.locationType.LM_LCD.nbMoisCourteDuree" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <FormRow :dataForm="minNbNuit" v-model="adUser.locationType.LM_LCD.minNbNuit" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <FormRow :dataForm="nbChambres" v-model="adUser.locationType.LM_LCD.nbChambres" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <FormRow :dataForm="prixColocation" v-model="adUser.locationType.LM_LCD.prixNuit" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <h3 v-if="adUser.locationType.LM_LCD.prixNuit" class="float-right">{{ calculprixLM_LCD() }} € / an</h3>
            <h4 v-if="adUser.locationType.LM_LCD.prixNuit" class="float-right">{{ Math.round(calculprixLM_LCD() / 12) }} € / mois - </h4>
          </div>
          <div class="mb-5">
            <h6>Location courte durée meublé</h6>
            <FormRow :dataForm="minNbNuit" v-model="adUser.locationType.LCD.minNbNuit" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <p>Vos types de logements</p>
            <EditableTable :dataForm="typeLogements" :toComplete="adUser.locationType.LCD.typeLogements" id="formInTab"></EditableTable>
            <h3 v-if="adUser.locationType.LCD.typeLogements.length > 0" class="float-right">{{ calculprixLCD() }} € / mois</h3>
          </div>
        </div>
        <div class="col-10 descriptif">
          <h4>Crédit</h4>
            <p> prix du bien <button type="button" class="btn btn-link" data-toggle="tooltip" data-placement="top" title="Le prix est caculé en fonction de la proposition de prix ou du prix du bien avec les travaux"><i class="far fa-question-circle"></i></button>: {{ calculprixBien() }} € </p>
            <p> Frais de notaire<button type="button" class="btn btn-link" data-toggle="tooltip" data-placement="top" title="Le prix est caculé en fonction de la proposition de prix ou du prix du bien sans les travaux, sur une marge haute de 10%"><i class="far fa-question-circle"></i></button>: {{ calculprixNotaire() }} €</p>
            <FormRow :dataForm="montantApport" v-model="credit.apport" :sizeLabel="sizeLabel" inputType="number"></FormRow>
            <div class="form-group row">
            <label :class="sizeLabel.label">Durée du crédit</label>
            <div :class="sizeLabel.input">
              <select id="inputState" class="form-control" v-model="credit.tauxInteret">
                <option value="0.95">Durée 7 ans - Taux d'intérêt 0.95 %</option>
                <option value="1.01">Durée 10 ans - Taux d'intérêt 1.01 %</option>
                <option value="1.17">Durée 15 ans - Taux d'intérêt 1.17 %</option>
                <option selected value="1.32">Durée 20 ans - Taux d'intérêt 1.32 %</option>
                <option value="1.65">Durée 25 ans - Taux d'intérêt 1.65 %</option>
              </select>
            </div>
          </div>
          <h3 class="float-right d-block">{{ calculprixTotal() }} €</h3>
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
import { mapState, mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import Caroussel from '../components/Caroussel.vue'
import FormRow from '../components/FormRow.vue'
import EditableTable from '../components/EditableTable'
export default {
  components: {
    Caroussel,
    FormRow,
    EditableTable
  },
  data () {
    return {
      ad: null,
      credit: {
        prixBien: null,
        notaire: null,
        tauxInteret: 1.32,
        apport: 0,
        total: null,
        mensualite: null
      },
      adUser: {
        adresse: null,
        prixProposition: null,
        autre: '',
        pieces: [],
        travauxGeneraux: [],
        locationType: {
          LN: {
            name: 'Location longue durée vide',
            prix: null
          },
          LC: {
            name: 'Colocation',
            prixChambre: null,
            nbChambres: null
          },
          LM: {
            name: 'Location longue durée meublé',
            prix: null
          },
          LM_LCD: {
            name: 'Location mixte (meublé + courte durée)',
            prixLongueDuree: null,
            prixNuit: null,
            nbChambres: null,
            nbMoisCourteDuree: 2,
            minNbNuit: 20
          },
          LCD: {
            name: 'Location courte durée meublé',
            typeLogements: [],
            minNbNuit: 20
          }
        }
      },
      adresse: { title: 'Adresse', placeholder: 'Ex: N° rue' },
      prixProposition: { title: 'Proposition au prix (€)', placeholder: 'Ex: 250000' },
      travauxGeneraux: {
        titre: 'Travaux généraux',
        labels: ['Intitulé', 'Prix (€)'],
        keyObj: ['intitule', 'prix'],
        placeHolders: ['Ex: électricité', 'Ex: 30 000'],
        typeInputs: ['text', 'number']
      },
      pieces: {
        titre: 'Travaux par pièce',
        labels: ['Intitulé', 'Surface ( m² )', 'Travaux', 'Prix (€)'],
        keyObj: ['intitule', 'surface', 'travaux', 'prix'],
        placeHolders: ['Ex: chambre 1', '9', 'sol + peinture', 'Ex: 2 000'],
        typeInputs: ['text', 'number', 'text', 'number']
      },
      sizeLabel: {
        label: 'col-3',
        input: 'col-sm-7'
      },
      prixExploitation: { title: 'Prix envisagé (€)', placeholder: 'Ex: 250' },
      prixColocation: { title: 'Prix envisagé (€)/ chambres', placeholder: 'Ex: 250' },
      nbChambres: { title: 'Nombre de chambre', placeholder: 'Ex: 3' },
      nbMois: { title: 'Nombre de mois', placeholder: '' },
      minNbNuit: { title: 'Nombre de nuit minimum', placeholder: '' },
      montantApport: { title: 'Votre apport (€)', placeholder: '' },
      typeLogements: {
        titre: '',
        labels: ['Type', 'Quantité', 'Prix (€)'],
        keyObj: ['type', 'quantite', 'prix'],
        placeHolders: ['Ex: studio', 'Ex: 2', 'Ex: 20'],
        typeInputs: ['text', 'number', 'number']
      }
    }
  },
  async mounted () {
    const adId = this.$route.params.id
    this.ad = this.getAdById(adId)
    if (this.isAuthenticated) {
      await this.fetchAdUser({ uid: this.user._id, aid: adId })
      this.adUser = this.getAdUserByAdId(adId)
    }
  },
  computed: {
    ...mapState('ads', ['ads']),
    ...mapState('user', ['user']),
    ...mapGetters('ads', ['getAdById']),
    ...mapGetters('user', ['getUser', 'isAuthenticated']),
    ...mapGetters('adsUser', ['getAdUserByAdId'])
  },
  methods: {
    ...mapActions('ads', ['fetchAd']),
    ...mapActions('adsUser', ['createAdUser', 'fetchAdUser', 'updateAdUser']),
    calculBaissePrix () {
      if (this.adUser.prixProposition) {
        this.adUser.prixProposition = parseInt(this.adUser.prixProposition, 10)
        const delta = this.ad.prix - this.adUser.prixProposition
        return Math.round(delta / this.ad.prix * 100)
      }
      return 0
    },
    caculPrixTravaux () {
      let prix = _.reduce(this.adUser.pieces, (acc, o) => {
        return o.prix + acc
      }, 0)
      prix = prix + _.reduce(this.adUser.travauxGeneraux, (acc, o) => {
        return o.prix + acc
      }, 0)
      return prix
    },
    calculprixBien () {
      if (this.adUser.prixProposition) {
        this.credit.prixBien = parseInt(this.adUser.prixProposition) + this.caculPrixTravaux() - parseInt(this.credit.apport)
      } else {
        this.credit.prixBien = this.ad.prix + this.caculPrixTravaux() - parseInt(this.credit.apport)
      }
      return this.credit.prixBien
    },
    calculprixNotaire () {
      if (this.adUser.prixProposition) {
        this.credit.notaire = parseInt(this.adUser.prixProposition) * 10 / 100
      } else {
        this.credit.notaire = this.ad.prix * 10 / 100
      }
      return this.credit.notaire
    },
    calculprixTotal () {
      this.credit.total = this.credit.prixBien * parseFloat(this.credit.tauxInteret)
      this.credit.mensualite = this.credit.total / 12 / 20
      return this.credit.total
    },
    calculprixLN (prix) {
      if (prix) {
        return parseInt(prix) - this.credit.mensualite
      }
      return 0
    },
    calculprixLC () {
      if (this.adUser.locationType.LC.prixChambre && this.adUser.locationType.LC.nbChambres) {
        this.adUser.locationType.LC.prixChambre = parseInt(this.adUser.locationType.LC.prixChambre)
        this.adUser.locationType.LC.nbChambres = parseInt(this.adUser.locationType.LC.nbChambres)
        return this.adUser.locationType.LC.prixChambre * this.adUser.locationType.LC.nbChambres - this.credit.mensualite
      }
      return 0
    },
    calculprixLM_LCD () {
      const bool = this.adUser.locationType.LM_LCD.prixLongueDuree && this.adUser.locationType.LM_LCD.prixNuit && this.adUser.locationType.LM_LCD.nbChambres
      if (bool) {
        this.adUser.locationType.LM_LCD.nbMoisCourteDuree = parseInt(this.adUser.locationType.LM_LCD.nbMoisCourteDuree)
        this.adUser.locationType.LM_LCD.prixLongueDuree = parseInt(this.adUser.locationType.LM_LCD.prixLongueDuree)
        this.adUser.locationType.LM_LCD.nbChambres = parseInt(this.adUser.locationType.LM_LCD.nbChambres)
        this.adUser.locationType.LM_LCD.prixNuit = parseInt(this.adUser.locationType.LM_LCD.prixNuit)
        this.adUser.locationType.LM_LCD.minNbNuit = parseInt(this.adUser.locationType.LM_LCD.minNbNuit)
        const moisNormal = 12 - this.adUser.locationType.LM_LCD.nbMoisCourteDuree
        const prixNormal = moisNormal * this.adUser.locationType.LM_LCD.prixLongueDuree
        const prixCourteDuree = this.adUser.locationType.LM_LCD.nbChambres * this.adUser.locationType.LM_LCD.prixNuit * this.adUser.locationType.LM_LCD.nbMoisCourteDuree * this.adUser.locationType.LM_LCD.minNbNuit
        const prixTotal = prixNormal + prixCourteDuree
        return prixTotal - this.credit.total / 20
      }
      return 0
    },
    calculprixLCD () {
      if (this.adUser.locationType.LCD.typeLogements.length > 0) {
        this.adUser.locationType.LCD.minNbNuit = parseInt(this.adUser.locationType.LCD.minNbNuit)
        const prix = _.reduce(this.adUser.locationType.LCD.typeLogements, (acc, o) => {
          return o.prix * o.quantite + acc
        }, 0)
        return prix * this.adUser.locationType.LCD.minNbNuit - this.credit.mensualite
      }
      return 0
    },
    async addAdUser () {
      if (this.adUser.locationType.LN.prix) {
        this.adUser.locationType.LN.prix = parseInt(this.adUser.locationType.LN.prix)
      }
      if (this.adUser.locationType.LM.prix) {
        this.adUser.locationType.LM.prix = parseInt(this.adUser.locationType.LN.prix)
      }
      if (this.adUser._id) {
        await this.updateAdUser({ adUser: this.adUser })
      } else {
        await this.createAdUser({ adUser: this.adUser })
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
