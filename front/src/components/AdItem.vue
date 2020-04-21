<template>
  <div class="ad">
    <div class="row">
      <div class="col-4" id="img-size">
        <img :src="getImgUrl(ad)" v-bind:alt="ad.titre">
      </div>
      <div class="col-md">
        <span> {{ ad.type }} - {{ ad.surface }}m²</span>
        <h3 style="margin-top: 20px">
          <router-link :to="`/ad/${ad._id}`">
            {{ ad.titre }}
          </router-link>
          <div v-for="label in labelsButton" :key="label.text">
            <button type="button" class="btn btn-outline-primary"  id="favorite" @click="$emit('adUser-action', ad._id, label.text)"><i :class="label.icon"></i> {{ label.text }}</button>
          </div>
        </h3>
        <h4><i class="fas fa-map-marker-alt"></i> {{ ad.ville }} </h4><span> {{ad.cp}} </span><br>
        <h2> {{ ad.prix }} €</h2><span> {{ ad.prixm2 }} €/m²</span>
        <div class="row" style="margin-top: 120px">
          <div class="col-3">
            <p>Surface</p>
            <h3><i class="fas fa-ruler-combined"></i> {{ ad.surface }}</h3>
          </div>
          <div class="col-3">
            <p>Nb de pièces</p>
            <h3><i class="fas fa-cube"></i> {{ ad.nbchambres }}</h3>
          </div>
          <div class="col-3">
            <p>Nb de chambres</p>
            <h3><i class="fas fa-bed"></i> {{ ad.nbchambres }}</h3>
          </div>
          <div class="col-3">
            <p>Date de construction</p>
            <h3><i class="far fa-calendar-alt"></i> {{ ad.date_construction }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    ad: Object,
    labelsButton: {
      type: Array,
      default: () => {
        return [
          {
            icon: 'far fa-star',
            text: 'Suivre ce bien'
          }
        ]
      }
    }
  },
  methods: {
    getImgUrl (ad) {
      if (!ad.img) {
        return 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.zenit.org%2Farticles%2Fcoree-le-no-man-s-land-devient-un-oasis-de-paix%2F&psig=AOvVaw01U01Wij-rkON3J4kphisS&ust=1587570532277000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODj6J_v-egCFQAAAAAdAAAAABAD'
      }
      if (ad.img !== undefined || ad.img.length > 0) {
        return ad.img[0]
      }
      return 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.zenit.org%2Farticles%2Fcoree-le-no-man-s-land-devient-un-oasis-de-paix%2F&psig=AOvVaw01U01Wij-rkON3J4kphisS&ust=1587570532277000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODj6J_v-egCFQAAAAAdAAAAABAD'
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
