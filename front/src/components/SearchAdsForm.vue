<template>
  <div class="searchItem">
    <form>
      <div class="form-group">
        <label>Etat</label><br>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="switchAncien" v-model="details.ancien" @click="submit">
          <label class="custom-control-label" for="switchAncien">Ancien</label>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="switchNeuf" v-model="details.neuf" @click="submit">
          <label class="custom-control-label" for="switchNeuf">Neuf</label>
        </div>
      </div>
      <div class="form-group">
        <label>Type</label><br>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="switchMaison" v-model="details.maison">
          <label class="custom-control-label" for="switchMaison">Maison</label>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="switchAppartement" v-model="details.appartement">
          <label class="custom-control-label" for="switchAppartement">Appartement</label>
        </div>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="switchTerrain" v-model="details.terrain">
          <label class="custom-control-label" for="switchTerrain">Terrain</label>
        </div>
      </div>
      <div class="form-group">
        <label>Prix : {{ details.prix }} €</label>
        <input type="range" class="custom-range" min="0" max="1000000" step="10000" v-model="details.prix">
      </div>
      <div class="form-group">
        <label>Surface : {{ details.surface }} m²</label>
        <input type="range" class="custom-range" min="0" max="1000" step="10" v-model="details.surface">
      </div>
      <div class="form-group">
        <label>prix : {{ details.prixm2 }} €/m²</label>
        <input type="range" class="custom-range" min="0" max="10000" step="10" v-model="details.prixm2">
      </div>
      <button type="button" class="btn btn-outline-primary" style="float: right;" @click="submit">Rechercher</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    action: { type: Function },
    city: String,
    details: Object
  },
  methods: {
    submit () {
      this.action()
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
