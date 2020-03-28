<template>
  <div class="searchItem">
    <form>
      <div class="form-group">
        <label>Etat</label><br>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="switchAncien" v-model="ancien" @click="submit">
          <label class="custom-control-label" for="switchAncien">Ancien</label>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="switchNeuf" v-model="neuf" @click="submit">
          <label class="custom-control-label" for="switchNeuf">Neuf</label>
        </div>
      </div>
      <div class="form-group">
        <label>Type</label><br>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="switchMaison" v-model="ancien">
          <label class="custom-control-label" for="switchMaison">Maison</label>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="switchAppartement" v-model="appartement">
          <label class="custom-control-label" for="switchAppartement">Appartement</label>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="switchTerrain" v-model="terrain">
          <label class="custom-control-label" for="switchTerrain">Terrain</label>
        </div>
      </div>
      <div class="form-group">
        <label>Prix : {{ price }} €</label>
        <input type="range" class="custom-range" min="0" max="10000000" step="10000" v-model="price">
      </div>
      <div class="form-group">
        <label>Surface : {{ surface }} m²</label>
        <input type="range" class="custom-range" min="0" max="1000" step="10" v-model="surface">
      </div>
      <div class="form-group">
        <label>prix : {{ prixm2 }} €/m²</label>
        <input type="range" class="custom-range" min="0" max="10000" step="10" v-model="prixm2">
      </div>
      <button type="button" class="btn btn-outline-primary" style="float: right;" @click="submit">Rechercher</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    city: String
  },
  data: () => ({
    price: 0,
    surface: 0,
    prixm2: 0,
    ancien: true,
    neuf: true,
    maison: true,
    appartement: true,
    terrain: true
  }),
  methods: {
    submit () {
      // TODO : implement function search with price, city ...
      console.log('tt', this.price, this.city)
    }
  }
}
</script>

<style>
.searchItem{
  margin:0 20px;
}

form {
  margin-left: 20px;
}
</style>
