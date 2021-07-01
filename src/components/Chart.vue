<script>

import { Bar } from 'vue-chartjs';
// import { mapState } from 'vuex';

export default {
  extends: Bar,
  name: 'chart',
  props:['data', 'options'],

  mounted () {
    this.renderChart(this.data, this.options)
  }
}
</script>