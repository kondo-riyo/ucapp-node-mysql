<template>
<div>
  <!-- <Chart class="chart"/> -->
  <Barchart :data="chartdata" :options="options" class="chart"/>
    <!-- <Chart :chart-data="datacollection"></Chart>
    <button @click="fillData()">Randomize</button> -->
    <button @click="deleteUser">ユーザー削除</button>
</div>
</template>

<script>
  // import Chart from '@/components/Chart.vue'
import Barchart from '../components/Barchart.js'
import { mapState } from 'vuex'
import store from '../store'
export default {
    name: 'Home',
    components: {
      // Chart,
      Barchart
    },
    store,
  data () {
    // let newcosts=[...this.costs].sort((a, b) => a.month - b.month);
    //   console.log(this.newcosts)
    return {
      newcosts:[],
      chartdata: {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        labels: [],
        datasets: [
          {
            // label: 'Bar Dataset',
            // data: [],
            label: 'water cost',
            data: [],
            fill: false,
            type: 'line',
            borderColor:'#7fbfff',
            lineTension: 0.3,
          },
          {
            label: 'gas cost',
            data: [],
            fill: false,
            type: 'line',
            borderColor:'#ff7f7f',
            lineTension: 0.3,
          },
          {
            label: 'element cost',
            data: [],
            fill: false,
            type: 'line',
            borderColor:'#ffde59',
            lineTension: 0.3,
          },
          {
            label: 'Total cost',
            backgroundColor:[],
            borderColor:[],
            data: [],
            borderWidth: 1
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
              labelString: '円',
              beginAtZero: true,
              stepSize: 1000,
            }
          }]
        }
      },
    }
  },
  // created(){
  //   //labels[]取得
  //   this.newCost()
  //   this.labelsPush()
  //   this.waterPush()
  //   this.gasPush()
  //   this.elePush()
  //   this.totalPush()
  //   this.colorPush()
  //   // this.borderColorPush()
  // },
  computed:{
    ...mapState(["costs"]),
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
    waterPush(){
          this.newcosts.forEach(el => {
          this.chartdata.datasets[0].data.push(el.watercost)
          console.log(el.watercost)
        })
        return this.chartdata.datasets[0].data
    },
    gasPush(){
          this.newcosts.forEach(el => {
          this.chartdata.datasets[1].data.push(el.gascost)
          console.log(el.gascost)
        })
        return this.chartdata.datasets[1].data
    },
    elePush(){
          this.newcosts.forEach(el => {
          this.chartdata.datasets[2].data.push(el.elecost)
          console.log(el.elecost)
        })
        return this.chartdata.datasets[2].data
    },
    totalPush(){
          let totalvalue=0
          this.newcosts.forEach(el=>{
            totalvalue=0
            totalvalue = totalvalue+(el.watercost + el.gascost + el.elecost)
            this.chartdata.datasets[3].data.push(totalvalue)
            console.log(el.month+'月は、'+totalvalue+'円です')
          })
          return this.chartdata.datasets[3].data
    },
    colorPush(){
          // let colorArray=[]
          this.newcosts.forEach((el) => {
          this.chartdata.datasets[3].backgroundColor.push('rgba('+el.color+',0.2)')
          this.chartdata.datasets[3].borderColor.push('rgba('+el.color+',1)')
        })
        return this.chartdata.datasets[2].data
    },
    deleteUser() {
      //引数にuserIdべたがきで消せるよ----------------------
      
      this.$store.dispatch('deleteUser')
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


