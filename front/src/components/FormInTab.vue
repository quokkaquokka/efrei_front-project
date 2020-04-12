<template>
  <div class="ad" id="item">
    <h4>{{ dataForm.titre }}</h4>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" v-for="item of dataForm.labels" :key="item">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dataForm.items" :key="item">
          <th scope="row" v-for="label in dataForm.keyObj" :key="label">{{ item[label] }}</th>
          <td><button type="button" class="btn btn-outline-primary"  id="delete" @click="deleteItem"><i class="fas fa-trash"></i> Supprimer</button></td>
        </tr>
      </tbody>
    </table>
    <form>
    <div class="form-group row" v-for="(n,i) in dataForm.labels.length" :key="i" style="display: inline-block">
      <label :class="sizeLabel" style="display: inline-block">{{ dataForm.labels[i] }} </label>
      <div :class="sizeInput" style="display: inline-block">
        <input :type="dataForm.typeInputs[i]" class="form-control" v-model='item[dataForm.keyObj[i]]' :placeholder="`${ dataForm.placeHolders[i] }`">
      </div>
    </div>
    </form>
    <div class="col-sm-2 mb-3" style="display: inline-block">
      <button type="button" class="btn btn-outline-info" @click='addItem'>Ajouter</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: Object,
    sizeLabel: {
      type: String,
      default: 'col-sm-4 col-form-label'
    },
    sizeInput: {
      type: String,
      default: 'col-sm-10'
    }
  },
  data: () => ({
    item: {}
  }),
  methods: {
    addItem () {
      console.log(this.item)
      this.dataForm.items.push(this.item)
      this.item = {}
    },
    deleteItem (taille) {
      this.dataForm.items.splice(taille, 1)
    }
  }
}
</script>
