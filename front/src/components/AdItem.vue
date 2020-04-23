<template>
  <div class="ad">
    <div class="row">
      <div class="col-4" id="img-size">
        <img :src="getImgUrl(ad)" v-bind:alt="ad.title">
      </div>
      <div class="col-md">
        <span> {{ ad.type }} - {{ ad.buildingArea | numeralFormat }}m²</span>
        <h3 style="margin-top: 20px">
          <router-link :to="`/ad/${ad._id}`">
            {{ ad.title }}
          </router-link>
          <div v-for="label in labelsButton" :key="label.text">
            <button type="button" class="btn btn-outline-primary"  id="favorite" @click="$emit('adUser-action', ad._id, label.text)"><i :class="label.icon"></i> {{ label.text }}</button>
          </div>
        </h3>
        <h4><i class="fas fa-map-marker-alt"></i> {{ ad.city }} </h4><span> {{ ad.postalCode }} </span><br>
        <h2> {{ ad.price | numeralFormat }} €</h2><span> {{ ad.pricem2 | numeralFormat }} €/m²</span>
        <div class="row" style="margin-top: 120px">
          <div class="col-3">
            <p>Surface</p>
            <h3><i class="fas fa-ruler-combined"></i> {{ ad.buildingArea | numeralFormat }}</h3>
          </div>
          <div class="col-3">
            <p>Nb de pièces</p>
            <h3><i class="fas fa-cube"></i> {{ ad.rooms }}</h3>
          </div>
          <div class="col-3">
            <p>Nb de chambres</p>
            <h3><i class="fas fa-bed"></i> {{ ad.bedRooms }}</h3>
          </div>
          <div class="col-3">
            <p>Date de construction</p>
            <h3><i class="far fa-calendar-alt"></i> {{ ad.constructionDate }}</h3>
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
      if (!ad.pictures) {
        return 'https://fr.zenit.org/wp-content/uploads/2018/05/no-image-icon.png'
      }
      if (ad.pictures !== undefined || ad.pictures.length > 0) {
        return ad.pictures[0]
      }
      return 'https://fr.zenit.org/wp-content/uploads/2018/05/no-image-icon.png'
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
