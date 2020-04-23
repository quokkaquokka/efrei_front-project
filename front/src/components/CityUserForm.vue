<template>
  <div>
    <EditableTable :dataForm="hotels" :toComplete="citiesUser.hotels"></EditableTable>
    <div class="ad" id="item">
      <form>
        <h4>Nombre d'hôtels</h4>
        <div class="form-group row">
          <label class="col-form-label">Nombre d'hôtels dans la ville</label>
          <div class="col-sm-5">
            <input type="text" class="form-control" v-model='citiesUser.hotelsCount'>
          </div>
        </div>
      </form>
    </div>
    <EditableTable :dataForm="attractivities" :toComplete="citiesUser.attractivities"></EditableTable>
    <PillsTabForm :dataForm="streets" :itemToComplete="citiesUser.streets"></PillsTabForm>
    <PillsTabForm :dataForm="roads" :itemToComplete="citiesUser.roads"></PillsTabForm>
    <PillsTabForm :dataForm="publicTransports" :itemToComplete="citiesUser.publicTransports"></PillsTabForm>
     <div class="ad" id="item">
      <form>
        <h4>Démographie</h4>
        <div class="form-group row">
          <label class="col-form-label">Commentaire sur la démographie</label>
          <div class="col-sm-7">
            <input type="text" class="form-control" v-model='citiesUser.demography' placeholder='Ex: Hopital'>
          </div>
        </div>
      </form>
    </div>
    <button type="button" class="btn btn-outline-primary mt-3" @click='save' style="float: right">Enregistrer</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import router from '../router/index'
import EditableTable from '../components/EditableTable.vue'
import PillsTabForm from '../components/PillsTabForm.vue'

export default {
  components: {
    EditableTable,
    PillsTabForm
  },
  props: {
    cityId: String,
    citiesUser: {
      type: Object
    }
  },
  data: () => ({
    streets: {
      title: 'Quartiers',
      description: 'Ici, vous pouvez sauvegarder les quarties de la ville, les lieux où vous voudrez acheter.',
      label: 'Nom du quartier',
      placeHolder: 'Ex: rue des coquettes'
    },
    roads: {
      title: 'Routes',
      description: 'Ici, vous pouvez sauvegarder les grands axes routiers qui menent jusqu\'à ville.',
      label: 'Nom de la route',
      placeHolder: 'Ex: A6'
    },
    publicTransports: {
      title: 'Transports',
      description: 'Ici, vous pouvez sauvegarder les transports de la ville et menant jusqu\'à la ville.',
      label: 'Nom du transport',
      placeHolder: 'Ex: sncf'
    },
    hotels: {
      title: 'Hôtels',
      labels: ['Nom', 'Prix/nuit'],
      keyObj: ['name', 'price'],
      placeHolders: ['Ex: Ibis', 'Ex: 75€'],
      typeInputs: ['text', 'text']
    },
    attractivities: {
      title: 'Attractivités',
      labels: ['Nom', 'Nombre', 'Description'],
      keyObj: ['name', 'number', 'description'],
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
        router.replace('/home')
      } else {
        // il faut faire un create
        this.citiesUser.userId = this.getUser._id
        this.citiesUser.cityId = this.cityId
        await this.createCityUser({ cityUser: this.citiesUser })
        router.replace('/cities')
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
