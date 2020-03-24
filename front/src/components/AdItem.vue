<template>
    <div class="ad">
        <h2> {{ ad.type }} - {{ ad.surface }}m2</h2>
        <h1> {{ ad.titre }} </h1>
        <h1> {{ ad.ville }} {{ad.cp}}</h1>
        <h2> {{ ad.prix }} </h2>
        <p v-html="`${ ad.description }`"></p>
    </div>
</template>

<script>
export default {
  props: {
    ad: Object
  }
}
</script>

<style>
.ad {
    background: gray

}
</style>
