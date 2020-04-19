<template>
  <div class="form-group row">
    <label :class="sizeLabel">{{ dataForm.title }}</label>
    <div class="col-sm-7">
      <input type="text" class="form-control" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :placeholder="`${ dataForm.placeholder }`">
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
      type: String,
      default: 'col-2'
    },
    value: [String, Number]
  }
}
</script>
