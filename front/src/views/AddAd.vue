<template>
  <div>
    <form>
    <div class="col-9" id="city">
      <AddAdForm :ad="ad"></AddAdForm>
    </div>
    <div id="caroussel">
      <Caroussel :pictures="ad.pictures"></Caroussel>
    </div>
    <div class="col-10">
      <button type="button" class="btn btn-outline-primary mt-3" @click='addAd' style="float: right">Enregistrer l'annonce</button>
    </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddAdForm from '../components/AdAddForm.vue'
import Caroussel from '../components/Caroussel.vue'

export default {
  components: {
    AddAdForm,
    Caroussel
  },
  data: () => ({
    sizeLabel: {
      label: 'col-4',
      input: 'col-8'
    },
    ad: {
      title: null,
      pictures: [],
      equipments: [],
      idAd: null,
      city: null,
      price: null,
      postalCode: null,
      buildingArea: null,
      pricem2: null,
      description: null,
      // newBuilding: { title: 'Code postale', model: null, placeholder: 'Ex: 56100' },
      areaLand: null,
      rooms: null,
      bedrooms: null,
      permalink: null,
      phone: null,
      source: null,
      constructionDate: null
    }
  }),
  computed: {
    ...mapGetters('ads', ['getAdById'])
  },
  mounted () {
    if (this.$route.params.id) {
      this.ad = this.getAdById(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('ads', ['createAd', 'updateAd']),
    async addAd () {
      if (this.ad._id) {
        await this.updateAd({ ad: this.ad })
        this.$router.push('/dashads')
      } else {
        await this.createAd({ ad: this.ad })
        this.$router.push('/dashads')
      }
    }
  }
}
</script>

<style>
#pills {
  display: inline-block;
  margin-right: 10px;
}

#caroussel {
  display: block;
  width: 80%;
  margin: auto;
  margin-top: 20px;
}
</style>
