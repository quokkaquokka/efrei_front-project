<template>
  <div class="ad">
    <div class="row">
      <div class="col-4" id="img-size">
        <img :src="getImgUrl(ad)" v-bind:alt="ad">
      </div>
      <div class="col-md">
        <span> {{ ad.type }} - {{ ad.surface }}m²</span>
        <h3>
          <router-link :to="`/ad/${ad._id}`">
            {{ ad.titre }}
          </router-link>
          <button type="button" class="btn btn-outline-primary"  id="favorite" @click="addItemFavori"><i class="far fa-star"></i> Suivre ce bien</button>
        </h3>
        <h4><i class="fas fa-map-marker-alt"></i> {{ ad.ville }} </h4><span> {{ad.cp}} </span><br>
        <h2> {{ ad.prix }} €</h2><span> {{ ad.prixm2 }} €/m²</span>
        <p v-html="`${ ad.description }`"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ad: Object
  },
  methods: {
    getImgUrl (ad) {
      return ad.img[0]
    },
    addItemFavori () {
      // TODO: implement
      // add in user the item
    }
  }
}
</script>

<style>
.ad {
  background-color: #F9F9F9;
  border: 1px solid #d3d3d3;
  margin: 20px 0 0 0;
  text-align: left;
}
#img-size img{
  width: 100%;
  height: 100%;
}
span {
  color: #333;
}
a {
  color: #00648E;
}
h4 {
  color: #00A0C6;
  width: max-content;
  display: inline-block;
  margin-right: 10px;
}
h2 {
  color: #086429;
  display: inline-block;
  margin-right: 10px;
}
#favorite {
  float: right;
  margin-right: 10px;
  color:#00648E;
  border-color: #00648E;
}

#favorite:hover {
  background-color: #00648E;
  color:white
}
</style>
