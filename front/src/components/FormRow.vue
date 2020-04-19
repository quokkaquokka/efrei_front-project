<template>
  <div class="form-group row">
    <label :class="sizeLabel.label">{{ dataForm.title }}</label>
    <div :class="sizeLabel.input">
      <input type="text" class="form-control" v-model="dataForm.model" :placeholder="`${ dataForm.placeholder }`">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: {
      type: Object,
      default: function () {
        return { col: 'col-2' }
      }
    },
    sizeLabel: {
      type: Object,
      default: () => {
        return {
          label: 'col-2',
          input: 'col-sm-7'
        }
      }
    }
  }
}
</script>
