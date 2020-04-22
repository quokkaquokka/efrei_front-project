<template>
  <div class="ad" id="item">
    <h4>{{ dataForm.titre }}</h4>
    <table class="table">
      <thead>
        <tr>
          <th scope="col" v-for="(n,i) in dataForm.labels.length" :key="i">{{ dataForm.labels[i] }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in toComplete" :key="i">
          <td v-for="(label, j) in dataForm.keyObj" :key="j">
            <template v-if="dataForm.typeInputs[j] === 'number'">
              {{ item[label] | numeralFormat }}
            </template>
            <template v-if="dataForm.typeInputs[j] !== 'number'">
              {{ item[label] }}
            </template>
          </td>
            <td v-if="dataForm.keyObj[label] !== 'number'">{{ item[label] }}</td>
          <td><button type="button" class="btn btn-outline-primary"  id="delete" @click="deleteItem"><i class="fas fa-trash"></i> Supprimer</button></td>
        </tr>
      </tbody>
    </table>
    <form style="display: inline-block;">
    <div class="form-group row" v-for="(n,i) in dataForm.labels.length" :key="i" style="display: inline-block">
      <label :class="sizeLabel" style="display: inline-block">{{ dataForm.labels[i] }} </label>
      <div :class="sizeInput" style="display: inline-block">
        <input :type="dataForm.typeInputs[i]" class="form-control" v-model='item[dataForm.keyObj[i]]' :placeholder="`${ dataForm.placeHolders[i] }`">
      </div>
    </div>
    </form>
    <div class="col-sm-1 mb-3" style="display: inline-block">
      <button type="button" class="btn btn-outline-info" @click="addItem">Ajouter</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: Object,
    toComplete: {
      type: Array
    },
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
      for (let i = 0; i < this.dataForm.typeInputs.length; i++) {
        if (this.dataForm.typeInputs[i] === 'number') {
          const key = this.dataForm.keyObj[i]
          this.item[key] = parseInt(this.item[key], 10)
        }
      }
      this.toComplete.push(this.item)
      this.item = {}
    },
    deleteItem (item) {
      this.toComplete.splice(item, 1)
    }
  }
}
</script>
