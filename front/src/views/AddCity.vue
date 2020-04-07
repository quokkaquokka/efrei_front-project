<template>
  <div>
    <div class="ad" id="item">
      <form>
        <div>
            <h4>Informations générales</h4><br>
            <label class="col-form-label">Nom de la ville</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" v-model='city.name' placeholder="Ex: Paris">
            </div>
            <label class="col-form-label">Code Postal</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" v-model='city.postalCode' placeholder="Ex: 94800">
            </div>
            <label class="col-form-label">Prix moyen</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" v-model='city.prixMoyen' placeholder="Ex: 120000">
            </div>
            <label class="col-form-label">Nombre de locataires</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" v-model='city.locataires' placeholder="Ex: 42">
            </div>
            <label class="col-form-label">Nombre de propriétaires</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" v-model='city.propriétaires' placeholder="Ex: 24">
            </div>
        </div>
        <br>
        <div>
          <h4>Tailles de logement</h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Pourcentage</th>
                <th scope="col">Prix</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="taille in city.tailleLogement" :key="taille.name">
                <th scope="row">{{ taille.name }}</th>
                <td>{{ taille.pourcentage }}</td>
                <td>{{ taille.prix }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form-group row">
          <label class="col-form-label">Nom</label>
          <div class="col-sm-2">
            <input type="text" class="form-control" v-model='nameTaille' placeholder='Ex: T1'>
          </div>
          <label class="col-form-label">Pourcentage</label>
          <div class="col-sm-2">
            <input type="text" class="form-control" v-model='prixTaille' placeholder='Ex: 4.8'>
          </div>
          <label class="col-form-label">Prix</label>
          <div class="col-sm-2">
            <input type="text" class="form-control" v-model='prixTaille' placeholder='Ex: 380 €'>
          </div>
          <div class="col-sm-2">
            <button type="button" class="btn btn-outline-info" @click='addTaille'>Ajouter</button>
          </div>
        </div>
      </form>
    </div>
    <div class="ad" id="item">
      <form>
        <h4>Catégories socio-professionnelles</h4>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Chiffre</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in city.catSocioprofessionelle" :key="category.name">
                <th scope="row">{{ category.name }}</th>
                <td>{{ attractivite.chiffre }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form-group row">
          <label class="col-form-label">Nom</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model='nameCat' placeholder='Ex: Actifs'>
          </div>
          <label class="col-form-label">Chiffre</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model='chiffreCat' placeholder='Ex: 48.6'>
          </div>
          <div class="col-sm-2">
            <button type="button" class="btn btn-outline-info" @click='addCat'>Ajouter</button>
          </div>
        </div>
      </form>
    </div>
    <div class="ad" id="item">
      <form>
        <h4>Parkings</h4>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Chiffre</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="parking in city.parkings" :key="parking.name">
                <th scope="row">{{ parking.name }}</th>
                <td>{{ parking.chiffre }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="form-group row">
          <label class="col-form-label">Nom</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" v-model='nameParking' placeholder='Ex: Actifs'>
          </div>
          <label class="col-form-label">Chiffre</label>
          <div class="col-sm-4">
            <input type="number" class="form-control" v-model='chiffreParking' placeholder='Ex: 48.6'>
          </div>
          <div class="col-sm-2">
            <button type="button" class="btn btn-outline-info" @click='addParking'>Ajouter</button>
          </div>
        </div>
      </form>
    </div>
    <button type="button" class="btn btn-outline-primary mt-3" @click='addCity' style="float: right">Ajouter la ville</button>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    city: {
      name: '',
      postalCode: null,
      prixMoyen: null,
      tailleLogement: [],
      locataires: null,
      propriétaires: null,
      catSocioprofessionelle: [],
      eta_scolaires: [],
      parkings: []
    },
    nameTaille: '',
    pourcentageTaille: null,
    prixTaille: null,
    nameCat: '',
    chiffreCat: null,
    nameParking: null,
    chiffreParking: ''
  }),
  methods: {
    ...mapActions('cities', ['createCity']),
    addTaille () {
      this.prixTaille.replace('€', '')
      this.prixTaille.replace(' ', '')
      this.pourcentageTaille.replace('%', '')
      this.pourcentageTaille.replace(' ', '')
      const prix = parseInt(this.prixTaille, 10)
      const pourcentage = parseInt(this.pourcentageTaille, 10)
      this.citiesUser.hotels.push({ name: this.nameTaille, pourcentage: pourcentage, prix: prix })
      this.nameTaille = ''
      this.pourcentageHotel = null
      this.prixHotel = null
    },
    addCat () {
      this.chiffreCat.replace('%', '')
      this.chiffreCat.replace(' ', '')
      const chiffre = parseInt(this.chiffreCat, 10)
      this.city.catSocioprofessionelle.push({ name: this.nameCat, chiffre: chiffre })
      this.nameCat = ''
      this.chiffreCat = null
    },
    addParking () {
      this.chiffreParking.replace('%', '')
      this.chiffreParking.replace(' ', '')
      const chiffre = parseInt(this.chiffreParking, 10)
      this.city.parkings.push({ name: this.nameParking, chiffre: chiffre })
      this.nameParking = ''
      this.chiffreParking = null
    },
    async addCity () {
      // console.log(this.city)
      await this.createCity({ city: this.city })
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
