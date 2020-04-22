<template>
  <div>
    <canvas :id="`${ dataChart.id }`" width="400" height="400"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  data: () => ({
    myChart: null
  }),
  props: {
    dataChart: Object
  },
  async mounted () {
    const data = {
      datasets: [{
        data: this.dataChart.values,
        backgroundColor: this.dataChart.colors
      }],
      labels: this.dataChart.labels
    }

    const options = {
      responsive: true,
      title: {
        display: true,
        text: this.dataChart.title
      }
    }
    var ctx = document.getElementById(this.dataChart.id).getContext('2d')
    this.myChart = new Chart(ctx, {
      type: this.dataChart.type,
      data: data,
      options: options
    })
  }

}
</script>
