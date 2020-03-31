<template>
  <div class="ad">
    <div class="row">
      <div class="col-md" id="item">
        <div class="description">
          <span id="departement">{{ city.departement }}</span> <br>
          <button type="button" class="btn btn-outline-primary"  id="favorite" @click="addItemFavori"><i class="far fa-star"></i> Suivre cette ville</button>
          <router-link :to="`/city/${city._id}`">
            <h3 id="myH3">{{ city.name }}</h3><span id="postalCode">({{ city.postalCode }})</span>
          </router-link>
        </div>
        <h4 id="myH4">Prix moyen: {{ city.prixMoyen }} €</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    city: Object
  },
  methods: {
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
.description {
    margin-top: 20px;
}
#img-size img{
  width: 100%;
  height: 100%;
}
#postalCode {
    color: #333;
    margin-left:10px;
}
#myH3 {
  color: #00648E;
  display: inline-block;
  width: max-content;
}
#myH4 {
  color: #00A0C6;
  width: max-content;
  margin-right: 10px;
}
#departement {
    color: #086429;
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
#item {
    padding-left: 50px;
}
</style>
