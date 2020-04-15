<template>
  <div>
    <FormInTab :dataForm="hotels" :toComplete="citiesUser.hotels"></FormInTab>
    <div class="ad" id="item">
      <form>
        <h4>Nombre d'hotel</h4>
        <div class="form-group row">
          <label class="col-form-label">Nombre d'hotels dans la ville</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" v-model='citiesUser.nbHotels'>
          </div>
        </div>
      </form>
    </div>
    <FormInTab :dataForm="attractivites" :toComplete="citiesUser.attractivites"></FormInTab>
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
    citiesUser: {
      type: Object
    }
  },
  data: () => ({
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
      typeInputs: ['text', 'text']
    },
    attractivites: {
      titre: 'Attractivités',
      labels: ['Nom', 'Nombre', 'Description'],
      keyObj: ['name', 'nb', 'description'],
      placeHolders: ['Ex: Hopital', 'Ex: 1', 'Ex: spécilisé en détection de tumeur'],
      typeInputs: ['text', 'number', 'text']
    }
  }),
  methods: {
    ...mapActions('citiesUser', ['createCityUser']),
    ...mapActions('citiesUser', ['updateCityUser']),
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
