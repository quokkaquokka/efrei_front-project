<template>
  <div>
    <div class="ad" id="item">
      <form>
        <h4>Hotels</h4>
        <div class="form-group row">
          <label class="col-form-label">Nombre d'hotels dans la ville</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" v-model='citiesUser.nbHotels'>
          </div>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Prix</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="hotel in citiesUser.hotels" :key="hotel.name">
                <th scope="row">{{ hotel.name }}</th>
                <td>{{ hotel.prix }}</td>
              </tr>
            </tbody>
          </table>

        </div>
        <div class="form-group row">
          <label class="col-form-label">Nom</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model='nameHotel' placeholder='Ex: Ibis'>
          </div>
          <label class="col-form-label">Prix / nuit</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model='prixHotel' placeholder='Ex: 75 €'>
          </div>
          <div class="col-sm-2">
            <button type="button" class="btn btn-outline-info" @click='addHotel'>Ajouter</button>
          </div>
        </div>
      </form>
    </div>
    <div class="ad" id="item">
      <form>
        <h4>Attractivités</h4>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Nombre</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="attractivite in citiesUser.attractivites" :key="attractivite.name">
                <th scope="row">{{ attractivite.name }}</th>
                <td>{{ attractivite.nb }}</td>
                <td>{{ attractivite.description }}</td>
              </tr>
            </tbody>
          </table>

        </div>
        <div class="form-group row">
          <label class="col-form-label">Nom</label>
          <div class="col-sm-3">
            <input type="text" class="form-control" v-model='nameAttractivite' placeholder='Ex: Hopital'>
          </div>
          <label class="col-form-label">Nombre</label>
          <div class="col-sm-1">
            <input type="number" class="form-control" v-model='nbAttractivite' placeholder='Ex: 1'>
          </div>
          <label class="col-form-label">Description</label>
          <div class="col-sm-3">
            <input type="text" class="form-control" v-model='descriptionAttractivite' placeholder='Ex: spécialisé en détection de tumeur'>
          </div>
          <div class="col-sm-2">
            <button type="button" class="btn btn-outline-info" @click='addAttractivite'>Ajouter</button>
          </div>
        </div>
      </form>
    </div>
    <ItemArrayForm :dataForm="quartiers"></ItemArrayForm>
    <ItemArrayForm :dataForm="routes"></ItemArrayForm>
    <ItemArrayForm :dataForm="transports"></ItemArrayForm>
     <div class="ad" id="item">
      <form>
        <h4>Démographie</h4>
        <div class="form-group row">
          <label class="col-form-label">Commentaire sur la démographie</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" v-model='nameAttractivite' placeholder='Ex: Hopital'>
          </div>
          <div class="col-sm-2">
            <button type="button" class="btn btn-outline-info" @click='addAttractivite'>Ajouter</button>
          </div>
        </div>
      </form>
    </div>
    <button type="button" class="btn btn-outline-primary mt-3" @click='save' style="float: right">Enregistrer</button>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ItemArrayForm from '../components/ItemArrayForm.vue'
export default {
  components: {
    ItemArrayForm
  },
  props: {
    cityId: String
  },
  data: () => ({
    nameHotel: '',
    prixHotel: null,
    nameQuartier: '',
    route: '',
    nameAttractivite: '',
    nbAttractivite: null,
    descriptionAttractivite: '',
    citiesUser: {
      villeId: null,
      userId: null,
      nbHotels: null,
      hotels: [],
      quartiers: [],
      attractivites: [],
      routes: [],
      transports: [],
      demographie: null
    },
    quartiers: {
      titre: 'Quartiers',
      description: 'Ici, vous pouvez sauvegarder les quarties de la ville, les lieux où vous voudrez acheter.',
      items: [],
      label: 'Nom du quartier',
      placeHolder: 'Ex: rue des coquettes'
    },
    routes: {
      titre: 'Routes',
      description: 'Ici, vous pouvez sauvegarder les grands axes routiers qui menent jusqu\'à ville.',
      items: [],
      label: 'Nom de la route',
      placeHolder: 'Ex: A6'
    },
    transports: {
      titre: 'Transports',
      description: 'Ici, vous pouvez sauvegarder les transports de la ville et menant jusqu\'à la ville.',
      items: [],
      label: 'Nom du transport',
      placeHolder: 'Ex: sncf'
    }
  }),
  methods: {
    addHotel () {
      this.prixHotel.replace('€', '')
      this.prixHotel.replace(' ', '')
      const prix = parseInt(this.prixHotel, 10)
      this.citiesUser.hotels.push({ name: this.nameHotel, prix: prix })
      this.nameHotel = ''
      this.prixHotel = null
    },
    addAttractivite () {
      this.citiesUser.attractivites.push(
        {
          name: this.nameAttractivite,
          nb: this.nbAttractivite,
          description: this.descriptionAttractivite
        })
      this.nameAttractivite = ''
      this.nbAttractivite = null
      this.descriptionAttractivite = null
    },
    initUserCity () {
      // si jamais la ville est deja une ville de l'utilisateur la charger
    },
    save () {
      console.log(this.quartiers)
      console.log(this.routes)
      // sauvegarder dans le user le city user
    }
  },
  computed: {
    ...mapState('cities', ['cities']),
    ...mapGetters('cities', ['getCityById']),
    // charger la liste des villes de l'utilisateur
    city () {
      return this.getCityById(this.cityId) || { name: 'Loading..' }
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
