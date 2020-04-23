<template>
  <div class="ad">
    <div class="row">
      <div class="col-md" id="item">
        <div class="description">
          <span id="departement">{{ city.department }}</span><br>
          <button v-if="dash" type="button" class="btn btn-outline-primary"  id="delete" @click="$emit('city-deleted', city._id)">
            <i class="fas fa-trash"></i>
            Supprimer
          </button>
          <button v-if="dash" type="button" class="btn btn-outline-primary"  id="edit" @click="editCity">
            <i class="fas fa-edit"></i>
            Modifier
          </button>
          <button v-if="!dash" type="button" class="btn btn-outline-primary"  id="favorite" @click="$emit('cityUser-action', city._id)">
            <i :class="labelItem.icon"></i>
            {{ labelItem.text }}
          </button>
          <router-link :to="`/city/${city._id}`">
            <h3 id="myH3">{{ city.name }}</h3><span id="postalCode">({{ city.postalCode }})</span>
          </router-link>
        </div>
        <h4 id="myH4">Prix moyen: {{ city.averagePrice | numeralFormat }} €</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    city: Object,
    dash: Boolean,
    labelItem: {
      type: Object,
      default: function () {
        return {
          icon: 'far fa-star',
          text: 'Suivre cette ville'
        }
      }
    }
  },
  computed: {
    ...mapGetters('citiesUser', ['getCityUserByCityId'])
  },
  methods: {
    ...mapActions('citiesUser', ['createCityUser', 'deleteCityUser']),
    editCity () {
      this.$router.push(`/addcity/${this.city._id}`)
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

#delete, #edit {
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
