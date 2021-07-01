import { Bar } from 'vue-chartjs';
// import { mapState } from 'vuex';

export default {
  extends: Bar,
  name: 'chart',
  props:['data', 'options'],
//   data () {
//     return {
//       data: {
//         // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//         labels: [1,2,3,4],
//         datasets: [
//           {
//             label: 'Bar Dataset',
//             data: [10, 20, 30, 40],
//           },
//           {
//             label: 'Line Dataset',
//             data: [10, 50, 20, 30],
//             borderColor: '#CFD8DC',
//             fill: false,
//             type: 'line',
//             lineTension: 0.3,
//           },
//         ]
//       },
//       options: {
//         scales: {
//           xAxes: [{
//             scaleLabel: {
//               display: true,
//               labelString: 'Month'
//             }
//           }],
//           yAxes: [{
//             ticks: {
//               beginAtZero: true,
//               stepSize: 10,
//             }
//           }]
//         }
//       },
//     }
//   },

  mounted () {
    this.renderChart(this.data, this.options)
  }
}
