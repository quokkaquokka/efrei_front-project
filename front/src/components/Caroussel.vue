<template>
  <div class="container justify-content-center">
    <div id="carouselIndicators" class="carousel slide" data-ride="carousel">
      <template v-for="(n,i) in imgs.length">
        <div :key="i">
          <ol class="carousel-indicators">
            <li data-target="#carouselIndicators" :data-slide-to="`${i}`" class="active"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item" v-bind:class="{ active: index === i }">
              <img class="d-inline-block" :src="`${ imgs[i] }`">
              <img v-if="i + 1 < imgs.length" class="d-inline-block" :src="`${ imgs[i + 1] }`">
              <img v-if="i + 2 < imgs.length" class="d-inline-block" :src="`${ imgs[i + 2] }`">
              <a class="carousel-control-prev" href="#carouselIndicators" v-on:click="prev" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#carouselIndicators" v-on:click="next" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgs: Array,
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    prev () {
      this.index = (this.index - 1 < 0) ? 0 : this.index - 1
      return this.index
    },
    next () {
      this.index = (this.index + 1 >= this.imgs.length - 3) ? this.imgs.length - 3 : this.index + 1
      return this.index
    }
  }
}
</script>

<style scoped>
img {
  width: 560px;
  height: 350px;
  margin: 10px;
}

.container {
  width: 1800px;
  max-width: 1800px;
}
</style>
