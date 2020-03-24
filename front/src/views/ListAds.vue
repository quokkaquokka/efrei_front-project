<template>
  <div class="list-ads">
    <h1>Liste des annonces</h1>
    <div v-for="ad in ads" :key="ad._id">
      <AdItem :ad="ad"></AdItem>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AdItem from '../components/AdItem.vue'

export default {
  components: {
    AdItem
  },
  data: () => ({

  }),
  async mounted () {
    await this.fetchAds()
  },
  computed: {
    ...mapState('ads', ['ads'])
  },
  methods: {
    ...mapActions('ads', ['fetchAds'])
  }
}

</script>
