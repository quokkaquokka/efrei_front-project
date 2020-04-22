<template>
  <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand">{{ search.title }}</a>
    <form class="form-inline col-9">
      <input class="form-control mr-sm-2 col-8" type="search" :placeholder="`${ search.placeHolder }`" v-model="search.itemSearch">
      <button class="btn btn btn-outline-info" type="submit" @click="action"><i class="fas fa-search"></i> Recherche</button>
    </form>
    <div class="ml-2 col-2 float-right" v-if="rightButton" style="display: contents">
      <button class="btn btn btn-outline-info" type="submit" @click="righAction"><i :class="`${ rightButton.icon }`"></i> {{ rightButton.text }}</button>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    action: Function,
    righAction: Function,
    rightButton: Object,
    search: Object
  },
  methods: {
    async submit () {
      this.function()
    }
  }
}
</script>
