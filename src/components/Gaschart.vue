<template>
<div>
  <!-- <Chart class="chart"/> -->
  <Barchart :data="chartdata" :options="options" class="chart"/>
    <!-- <Chart :chart-data="datacollection"></Chart>
    <button @click="fillData()">Randomize</button> -->
</div>
</template>

<script>
  // import Chart from '@/components/Chart.vue'
import Barchart from '../components/Barchart.js'
import { mapState } from 'vuex'
import store from '../store'
export default {
    name: 'Gaschart',
    components: {
      // Chart,
      Barchart
    },
    store,
  data () {
    return {
      newcosts:[],
      futuremonth:null,
      futurevalue:0,
      chartdata: {
        labels: [],
        datasets: [
          {
            label: 'ガス料金',
            data: [],
            fill: false,
            type: 'line',
            borderColor:'#ff7f7f',
            lineTension: 0.3,

          },
        ]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: '月'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 500,
            }
          }]
        }
      },
    }
  },
  created(){
    //labels[]取得
    this.newCost()
    this.labelsPush()
    this.gasPush()
    this.futurePush()
    // this.borderColorPush()
  },
  computed:{
    ...mapState(["costs/costs"]),
  },
  methods:{
    newCost(){
      this.newcosts=[...this.costs].sort((a, b) => a.month - b.month);
      console.log(this.newcosts)
      return this.newcosts
    },
    labelsPush(){
          this.newcosts.forEach(el => {
          this.chartdata.labels.push(el.month)
          console.log(el.month)
          // console.log(this.labels)
        })
        return this.chartdata.labels 
    },
    gasPush(){
          this.newcosts.forEach(el => {
          this.chartdata.datasets[0].data.push(el.gascost)
          console.log(el.gascost)
        })
        return this.chartdata.datasets[0].data
    },
    futurePush(){
        this.newcosts.forEach(el=>{
            this.futurevalue+=el.gascost
        })
        this.futurevalue=(this.futurevalue/this.newcosts.length)-400
        this.chartdata.datasets[0].data.push(this.futurevalue)
        // console.log(this.futurevalue)
        let futurenum=this.chartdata.labels.length-1
        console.log('num '+futurenum)
        this.futuremonth=`${this.chartdata.labels[futurenum]+1} (目標)`
        console.log('futuremonth'+this.futuremonth)
        this.chartdata.labels.push(this.futuremonth)
    }
  }
  }

</script>
<style scoped>
/* .chart{
  width: 500px;
  height: 500px;
} */
</style>


