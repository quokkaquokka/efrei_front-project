<template>
  <div>
    <EditableTable :dataForm="hotels" :toComplete="citiesUser.hotels"></EditableTable>
    <div class="ad" id="item">
      <form>
        <h4>Nombre d'hôtels</h4>
        <div class="form-group row">
          <label class="col-form-label">Nombre d'hôtels dans la ville</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" v-model='citiesUser.nbHotels'>
          </div>
        </div>
      </form>
    </div>
    <EditableTable :dataForm="attractivites" :toComplete="citiesUser.attractivites"></EditableTable>
    <PillsTabForm :dataForm="quartiers" :itemToComplete="citiesUser.quartiers"></PillsTabForm>
    <PillsTabForm :dataForm="routes" :itemToComplete="citiesUser.routes"></PillsTabForm>
    <PillsTabForm :dataForm="transports" :itemToComplete="citiesUser.transports"></PillsTabForm>
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
import PillsTabForm from '../components/PillsTabForm.vue'
import EditableTable from '../components/EditableTable.vue'
export default {
  components: {
    PillsTabForm,
    EditableTable
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
      titre: 'Hôtels',
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
      if (this.citiesUser._id) {
        // il existe deja, il faut faire un update
        await this.updateCityUser({ cityUser: this.citiesUser })
      } else {
        // il faut faire un create
        this.citiesUser.userId = this.getUser._id
        this.citiesUser.villeId = this.cityId
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
