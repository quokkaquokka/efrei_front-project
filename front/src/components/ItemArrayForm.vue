<template>
  <div class="ad" id="item">
    <h4>{{ dataForm.titre }}</h4>
    <p>{{ dataForm.description }}</p>
    <form>
      <div v-for="item in dataForm.items" :key="item" id="pills">
      <div class="badge badge-pill badge-info"> {{ item }}</div>
      </div>
    </form>
    <div class="form-group row">
      <label class="col-form-label">{{ dataForm.label }}</label>
      <div class="col-sm-4">
        <input type="text" class="form-control" v-model='newItem' :placeholder='`${ dataForm.placeHolder }`'>
      </div>
      <div class="col-sm-2">
        <button type="button" class="btn btn-outline-info" @click='addItem'>Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: Object
  },
  data: () => ({
    newItem: ''
  }),
  methods: {
    addItem () {
      this.dataForm.items.push(this.newItem)
      this.newItem = ''
    }
  }
}
</script>
