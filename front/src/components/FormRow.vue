<template>
  <div class="form-group row">
    <label :class="sizeLabel.label">{{ dataForm.title }}</label>
    <div :class="sizeLabel.input">
      <input :type="inputType" class="form-control" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :placeholder="`${ dataForm.placeholder }`">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataForm: {
      type: Object
    },
    sizeLabel: {
      type: Object,
      default: () => {
        return {
          label: 'col-2',
          input: 'col-sm-7'
        }
      }
    },
    value: [String, Number],
    inputType: {
      type: String,
      default: 'text'
    }
  }
}
</script>
