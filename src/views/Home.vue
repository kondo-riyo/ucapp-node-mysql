<template>
<div class="h__100">
    <Login v-show="!setlogin_userFromStore"/>
    <!-- <Login v-show="!displaySwitch || !setlogin_userFromStore"/> -->
  <!-- <div v-show="setlogin_userFromStore" class="fadeIn__base"> -->
  <!-- <div v-show="displaySwitch" class="fadeIn__base">
    <Barchart :data="chartdata" :options="options" class="chart"/>
  </div> -->
  <home-graph v-show="setlogin_userFromStore" class="fadeIn__base"></home-graph>
</div>
</template>

<script>
import Login from '../views/Login.vue'
import homeGraph from '../components/home/homeGraph.vue'
import store from '../store'
export default {
    name: 'Home',
    components: {
      // Chart,
      // Barchart,
      Login,
      homeGraph
    },
    store,
  // data () {
  //   return {
  //   }
  // },
  // async fetch() {
  //   console.log('setlogin_userFromStore=> '+this.setlogin_userFromStore)
  //     if(this.setlogin_userFromStore.length != 0) {
  //       await Promise.all(
  //         this.$store.dispatch('costs/choiceCosts'),
  //       )
  //       console.log('到達してるよ')
  //     }
      
  // },
  async fetch() {
      await this.$store.dispatch('costs/choiceCosts')
      console.log('到達してるよ')
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
  // methods:{
  //   //yearを監視--------------------------------------------------------
  //   selectYear() {
  //     let selectYear = []
  //     this.$store.getters['costs/getCosts'].forEach(cost => {
  //       if(selectYear.length===0) {
  //           selectYear.push(cost.year)
  //       }else {
  //       selectYear.forEach(year => {
  //         if(cost.year != year) {
  //           selectYear.push(cost.year)
  //         }else {
  //           console.log('弾かれた！')
  //         }
  //       })
  //       }
  //     })

  //     this.selectYears = selectYear
  //     console.log(this.selectYears)
  //   },
  //   costsFromStore() {
  //     console.log('costsFromStore=> '+this.$store.state.costs.costs)
  //     let costsFromStore = this.$store.state.costs.costs
  //     return costsFromStore
  //   },

  //   //costsを順番通りにnewcostsにpush-------------------------------------
  //   async newCost(){
  //     console.log('newCost')
  //     console.log('this.choiceYear=> '+this.choiceYear)
  //     // let getCostsFromStore = this.$store.getters['costs/getCosts']
  //     let allCosts = []
  //     // let sortCost = this.$store.state.costs.costs
  //     let sortCost = await this.costsFromStore()
  //     allCosts.push([...sortCost.sort((a, b) => a.month - b.month)]);
  //     allCosts.forEach(costs => {
  //       costs.forEach( cost => {
  //       if(this.choiceYear === cost.year) {
  //         this.newcosts.push(cost)
  //       }
  //       })
  //     })
  //     // this.labelsPush()
  //     // this.waterPush()
  //     // this.gasPush()
  //     // this.elePush()
  //     // this.totalPush()
  //     // this.colorPush()

  //     console.log('/home/newCost()=> '+this.newcosts)
  //     this.displaySwitch = true
  //     return this.newcosts
  //   },
  //   //横軸のラベルをlabelsにpush-------------------------------------------
  //   labelsPush(){
  //         this.newcosts.forEach(el => {
  //         this.chartdata.labels.push(el.month)
  //         // console.log('el.month=> '+el.month)
  //         // console.log(this.labels)
  //       })
  //       return this.chartdata.labels 
  //   },
  //   waterPush(){
  //         this.newcosts.forEach(el => {
  //         this.chartdata.datasets[0].data.push(el.waterCost)
  //         // console.log(el.waterCost)
  //       })
  //       return this.chartdata.datasets[0].data
  //   },
  //   gasPush(){
  //         this.newcosts.forEach(el => {
  //         this.chartdata.datasets[1].data.push(el.gasCost)
  //         // console.log(el.gasCost)
  //       })
  //       return this.chartdata.datasets[1].data
  //   },
  //   elePush(){
  //         this.newcosts.forEach(el => {
  //         this.chartdata.datasets[2].data.push(el.eleCost)
  //         // console.log(el.eleCost)
  //       })
  //       return this.chartdata.datasets[2].data
  //   },
  //   totalPush(){
  //         // let totalvalue=0
  //         this.newcosts.forEach(el=>{
  //           // totalvalue=0
  //           // totalvalue = totalvalue+(el.watercost + el.gascost + el.elecost)
  //           this.chartdata.datasets[3].data.push(el.totalCost)
  //           // console.log(el.month+'月は、'+el.totalCost+'円です')
  //         })
  //         return this.chartdata.datasets[3].data
  //   },
  //   colorPush(){
  //         // let colorArray=[]
  //         this.newcosts.forEach((el) => {
  //         this.chartdata.datasets[3].backgroundColor.push('rgba('+el.color+',0.2)')
  //         this.chartdata.datasets[3].borderColor.push('rgba('+el.color+',1)')
  //       })
  //       return this.chartdata.datasets[2].data
  //   }
  // }
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


