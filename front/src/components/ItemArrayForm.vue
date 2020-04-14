<template>
  <div class="ad" id="item">
    <h4 style="display: block">{{ dataForm.titre }}</h4>
      <div v-for="item in itemToComplete" :key="item" id="pills">
      <div class="badge badge-pill badge-info"> {{ item }}</div>
      </div>
    <form @submit="addItem" class="mt-2">
      <div class="form-group row">
        <label class="col-form-label">{{ dataForm.label }}</label>
        <button type="button" class="btn btn-light" data-toggle="tooltip" data-placement="top" :title="`${ dataForm.description }`"><i class="far fa-question-circle"></i>
        </button>
        <div class="col-sm-4">
          <input type="text" class="form-control" v-model='newItem' :placeholder='`${ dataForm.placeHolder }`'>
        </div>
        <div class="col-sm-2">
          <button type="submit" class="btn btn-outline-info">Ajouter</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: Object,
    itemToComplete: Array
  },
  data: () => ({
    newItem: ''
  }),
  methods: {
    addItem () {
      this.itemToComplete.push(this.newItem)
      this.newItem = ''
    }
  }
}
</script>
