<template>
    <div class="ad">
        <div class="row">
            <div class="col-4" id="img-size">
              <img :src="getImgUrl(ad)" v-bind:alt="ad">
            </div>
            <div class="col-md">
                <span> {{ ad.type }} - {{ ad.surface }}m2</span>
                <h3> {{ ad.titre }} </h3>
                <h4><i class="fas fa-map-marker-alt"></i> {{ ad.ville }} </h4><span> {{ad.cp}} </span>
                <h2> {{ ad.prix }} €</h2>
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
    }
  }
}
</script>

<style>
.ad {
    background-color: #F9F9F9;
    border: 1px solid #d3d3d3;
    margin: 20px;
    text-align: left;
}
#img-size img{
  width: 100%;
  height: 100%;
}
span {
  color: #333
}
h3 {
  color: #00648E
}
h4 {
  color: #00A0C6;
  width: max-content;
  display: inline-block;
  margin-right: 10px;
}
h2{
  color: #086429
}
</style>
