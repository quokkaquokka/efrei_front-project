<template>
  <nav class="navbar navbar-light bg-light">
  <a class="navbar-brand">{{ search.title }}</a>
  <form class="form-inline col-9">
    <input class="form-control mr-sm-2 col-8" type="search" :placeholder="`${ search.placeHolder }`" v-model="search.searchItem">
    <button class="btn btn btn-outline-info my-2 my-sm-0" type="submit" @click="$emit('search-city', search.searchItem)"><i class="fas fa-search"></i> Recherche</button>
  </form>
  </nav>
</template>

<script>
export default {
  props: {
    search: Object
  }
}
</script>
