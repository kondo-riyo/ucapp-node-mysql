import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  name: 'chart',
  props:['data', 'options'],

  mounted () {
    this.renderChart(this.data, this.options)
  }
}
