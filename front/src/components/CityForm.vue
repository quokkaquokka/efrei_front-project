<template>
  <div>
    <div class="ad" id="item">
      <form>
        <h4>Hotels</h4>
        <FormInTab :dataForm="hotels"> </FormInTab>
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
    <ItemArrayForm :dataForm="quartiers" :itemToComplete="citiesUser.quartiers"></ItemArrayForm>
    <ItemArrayForm :dataForm="routes" :itemToComplete="citiesUser.routes"></ItemArrayForm>
    <ItemArrayForm :dataForm="transports" :itemToComplete="citiesUser.transports"></ItemArrayForm>
     <div class="ad" id="item">
      <form>
        <h4>Démographie</h4>
        <div class="form-group row">
          <label class="col-form-label">Commentaire sur la démographie</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" v-model='citiesUser.demographie' placeholder='Ex: Hopital'>
          </div>
        </div>
      </form>
    </div>
    <button type="button" class="btn btn-outline-primary mt-3" @click='save' style="float: right">Enregistrer</button>
  </div>

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ItemArrayForm from '../components/ItemArrayForm.vue'
import FormInTab from '../components/FormInTab.vue'
export default {
  components: {
    ItemArrayForm,
    FormInTab
  },
  props: {
    cityId: String,
    citiesUser: Object
  },
  data: () => ({
    nameHotel: '',
    prixHotel: null,
    nameQuartier: '',
    route: '',
    nameAttractivite: '',
    nbAttractivite: null,
    descriptionAttractivite: '',
    quartiers: {
      titre: 'Quartiers',
      description: 'Ici, vous pouvez sauvegarder les quarties de la ville, les lieux où vous voudrez acheter.',
      label: 'Nom du quartier',
      placeHolder: 'Ex: rue des coquettes'
    },
    routes: {
      titre: 'Routes',
      description: 'Ici, vous pouvez sauvegarder les grands axes routiers qui menent jusqu\'à ville.',
      label: 'Nom de la route',
      placeHolder: 'Ex: A6'
    },
    transports: {
      titre: 'Transports',
      description: 'Ici, vous pouvez sauvegarder les transports de la ville et menant jusqu\'à la ville.',
      label: 'Nom du transport',
      placeHolder: 'Ex: sncf'
    },
    hotels: {
      titre: 'Hotels',
      labels: ['Nom', 'Prix/nuit'],
      keyObj: ['name', 'prix'],
      placeHolders: ['Ex: Ibis', 'Ex: 75€'],
      typeInputs: ['text', 'text'],
      items: []
    }
  }),
  methods: {
    ...mapActions('citiesUser', ['createCityUser']),
    ...mapActions('citiesUser', ['updateCityUser']),
    addHotel () {
      /* this.prixHotel.replace('€', '')
      this.prixHotel.replace(' ', '')
      const prix = parseInt(this.prixHotel, 10) */
      this.citiesUser.hotels.push({ name: this.nameHotel, prix: this.prixHotel })
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
    async save () {
      if (!this.getUser) {
        // display an error message for the connection of the user
        return
      }
      console.log('id user cities', this.citiesUser._id)
      if (this.citiesUser._id) {
        // il existe deja, il faut faire un update
        await this.updateCityUser({ cityUser: this.citiesUser })
      } else {
        // il faut faire un create
        this.citiesUser.userId = this.getUser._id
        this.citiesUser.villeId = this.cityId
        console.log(this.citiesUser)
        await this.createCityUser({ cityUser: this.citiesUser })
      }
    }
  },
  computed: {
    ...mapState('cities', ['cities']),
    ...mapGetters('cities', ['getCityById']),
    ...mapGetters('user', ['getUser']),
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
