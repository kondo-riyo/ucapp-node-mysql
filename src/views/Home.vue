<template>
<div class="h__100">
  <!-- <div v-show="!setlogin_userFromStore"> -->
    <Login v-show="!setlogin_userFromStore"/>
  <!-- </div> -->
  <!-- <div>
    <select v-model="choiceYear" @change="newCost">
      <option v-for="(year, index) in selectYears" :value="year" :key="index">
        {{year}}
      </option>
    </select>
  </div> -->
  <div v-show="setlogin_userFromStore" class="fadeIn__base">
    <Barchart :data="chartdata" :options="options" class="chart"/>
  </div>
    <!-- <Chart :chart-data="datacollection"></Chart>
    <button @click="fillData()">Randomize</button> -->
</div>
</template>

<script>
// import { mapActions } from 'vuex'
  // import Chart from '@/components/Chart.vue'
import Barchart from '../components/Barchart.js'
import Login from '../views/Login.vue'
// import { mapState } from 'vuex'
import store from '../store'
export default {
    name: 'Home',
    components: {
      // Chart,
      Barchart,
      Login
    },
    store,
  data () {
    // let newcosts=[...this.costs].sort((a, b) => a.month - b.month);
    //   console.log(this.newcosts)
    return {
      selectYears: [],
      choiceYear: '2019',
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
  // created() {
  // // beforeMount() {
  //   this.$store.dispatch('costs/requestCosts')
  // },
  // beforeMount() {
    updated() {
    // mounted() {
    // this.$store.dispatch('costs/requestCosts')
    // this.selectYear()
    this.newCost()
    this.labelsPush()
    this.waterPush()
    this.gasPush()
    this.elePush()
    this.totalPush()
    this.colorPush()
  },
  computed:{
    setlogin_userFromStore() {
      return this.$store.getters['users/setLogin_user']
    },

  },
  // watch:{
  //   //初期の読み込み
  //   startCost() {
  //     this.newcosts = this.$store.getters['costs/getCosts']
  //   }
  // },
  methods:{
    //yearを監視--------------------------------------------------------
    selectYear() {
      let selectYear = []
      this.$store.getters['costs/getCosts'].forEach(cost => {
        if(selectYear.length===0) {
            selectYear.push(cost.year)
        }else {
        selectYear.forEach(year => {
          if(cost.year != year) {
            selectYear.push(cost.year)
          }else {
            console.log('弾かれた！')
          }
        })
        }
      })

      this.selectYears = selectYear
      console.log(this.selectYears)
    },
    //costsを順番通りにnewcostsにpush-------------------------------------
    newCost(){
      console.log('newCost')
      console.log('this.choiceYear=> '+this.choiceYear)
      // console.log('getters/getCosts=> '+JSON.stringify(this.$store.state.costs))
      // let getCostsFromStore = this.$store.getters['costs/getCosts']
      let allCosts = []
      let sortCost = this.$store.state.costs.costs
      console.log('sort=> '+JSON.stringify(sortCost))
      allCosts.push([...sortCost.sort((a, b) => a.month - b.month)]);
      allCosts.forEach(costs => {
        costs.forEach( cost => {
        if(this.choiceYear === cost.year) {
          this.newcosts.push(cost)
        }
        })
      })
      // this.labelsPush()
      // this.waterPush()
      // this.gasPush()
      // this.elePush()
      // this.totalPush()
      // this.colorPush()

      // console.log('chart=> '+JSON.stringify(this.chartdata))
      console.log('/home/newCost()=> '+this.newcosts)
      return this.newcosts
    },
    //横軸のラベルをlabelsにpush-------------------------------------------
    labelsPush(){
          this.newcosts.forEach(el => {
          this.chartdata.labels.push(el.month)
          // console.log('el.month=> '+el.month)
          // console.log(this.labels)
        })
        return this.chartdata.labels 
    },
    waterPush(){
          this.newcosts.forEach(el => {
          this.chartdata.datasets[0].data.push(el.waterCost)
          // console.log(el.waterCost)
        })
        return this.chartdata.datasets[0].data
    },
    gasPush(){
          this.newcosts.forEach(el => {
          this.chartdata.datasets[1].data.push(el.gasCost)
          // console.log(el.gasCost)
        })
        return this.chartdata.datasets[1].data
    },
    elePush(){
          this.newcosts.forEach(el => {
          this.chartdata.datasets[2].data.push(el.eleCost)
          // console.log(el.eleCost)
        })
        return this.chartdata.datasets[2].data
    },
    totalPush(){
          // let totalvalue=0
          this.newcosts.forEach(el=>{
            // totalvalue=0
            // totalvalue = totalvalue+(el.watercost + el.gascost + el.elecost)
            this.chartdata.datasets[3].data.push(el.totalCost)
            // console.log(el.month+'月は、'+el.totalCost+'円です')
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
    }
  }
  }

</script>
<style scoped>
@import '../scss/animation.scss';
@import '../scss/space.scss';
.h__100 {
  height: 100%;
  /* background-color: blanchedalmond; */
}
.chart{
  max-width: 700px;
}

</style>


