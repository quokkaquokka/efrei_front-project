<template>
  <div class="ad" id="item">
    <h4 style="display: block">{{ dataForm.title }}</h4>
      <div v-for="item in itemToComplete" :key="item" id="pills">
        <button class="badge badge-pill badge-info" id="pill" v-on:click="deletePills(item)">{{ item }}<i class="fas fa-times"></i></button>
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
    },
    deletePills (item) {
      this.itemToComplete.splice(this.itemToComplete.indexOf(item), 1)
    }
  }
}
</script>

<style>
#pill {
  border: 0
}

.fas.fa-times {
  margin-left: 5px;
}
</style>
