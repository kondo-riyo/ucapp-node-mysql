<template>
    <div>
        <Barchart :data="setChartDataFromStore" :options="options" class="chart"/>
    </div>
</template>
<script>
import Barchart from '../Barchart.js'
export default {
    components: {
        Barchart
    },
    data() {
        return {
            selectYears: [],
            choiceYear: '2021',
            newcosts:[],
            chartdata: {
                // labels: [],
                // datasets: [
                // {
                //     // label: 'Bar Dataset',
                //     // data: [],
                //     label: 'water cost',
                //     data: [],
                //     fill: false,
                //     type: 'line',
                //     borderColor:'#7fbfff',
                //     lineTension: 0.3,
                // },
                // {
                //     label: 'gas cost',
                //     data: [],
                //     fill: false,
                //     type: 'line',
                //     borderColor:'#ff7f7f',
                //     lineTension: 0.3,
                // },
                // {
                //     label: 'element cost',
                //     data: [],
                //     fill: false,
                //     type: 'line',
                //     borderColor:'#ffde59',
                //     lineTension: 0.3,
                // },
                // {
                //     label: 'Total cost',
                //     backgroundColor:[],
                //     borderColor:[],
                //     data: [],
                //     borderWidth: 1
                // },
                // ]
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
                }]}
            },
        }
    },
    // mounted() {
    // beforeMount() {
    //     this.newCost()
    //     this.labelsPush()
    //     this.waterPush()
    //     this.gasPush()
    //     this.elePush()
    //     this.totalPush()
    //     this.colorPush()
    // },
    computed:{
        setlogin_userFromStore() {
        return this.$store.getters['users/setLogin_user']
        },
        setChartDataFromStore() {
            console.log('setChartDataFromStore')
            return this.$store.state.costs.chartdata
        }
        
    }
    // methods:{
        //yearを監視--------------------------------------------------------
        // selectYear() {
        // let selectYear = []
        // this.$store.getters['costs/getCosts'].forEach(cost => {
        //     if(selectYear.length===0) {
        //         selectYear.push(cost.year)
        //     }else {
        //     selectYear.forEach(year => {
        //     if(cost.year != year) {
        //         selectYear.push(cost.year)
        //     }else {
        //         console.log('弾かれた！')
        //     }
        //     })
        //     }
        // })

        // this.selectYears = selectYear
        // console.log(this.selectYears)
        // },
        // costsFromStore() {
        // console.log('costsFromStore=> '+this.$store.state.costs.costs)
        // let costsFromStore = this.$store.state.costs.costs
        // return costsFromStore
        // },

        //costsを順番通りにnewcostsにpush-------------------------------------
    //     async newCost(){
    //         console.log('newCost')
    //         console.log('this.choiceYear=> '+this.choiceYear)
    //         // let getCostsFromStore = this.$store.getters['costs/getCosts']
    //         let allCosts = []
    //         let sortCost = await this.$store.state.costs.costs
    //         // let sortCost = this.costsFromStore()
    //         allCosts.push([...sortCost.sort((a, b) => a.month - b.month)]);
    //         allCosts.forEach(costs => {
    //             costs.forEach( cost => {
    //             if(this.choiceYear === cost.year) {
    //             this.newcosts.push(cost)
    //             }
    //             })
    //         })
    //         // this.labelsPush()
    //         // this.waterPush()
    //         // this.gasPush()
    //         // this.elePush()
    //         // this.totalPush()
    //         // this.colorPush()

    //         console.log('/home/newCost()=> '+this.newcosts)
    //         this.displaySwitch = true
    //         return this.newcosts
    //     },
    //     labelsPush(){
    //         this.newcosts.forEach(el => {
    //         this.chartdata.labels.push(el.month)
    //         // console.log('el.month=> '+el.month)
    //         // console.log(this.labels)
    //         })
    //         return this.chartdata.labels 
    //     },
    //     waterPush(){
    //         this.newcosts.forEach(el => {
    //         this.chartdata.datasets[0].data.push(el.waterCost)
    //         // console.log(el.waterCost)
    //         })
    //         return this.chartdata.datasets[0].data
    //     },
    //     gasPush(){
    //         this.newcosts.forEach(el => {
    //         this.chartdata.datasets[1].data.push(el.gasCost)
    //         // console.log(el.gasCost)
    //         })
    //         return this.chartdata.datasets[1].data
    //     },
    //     elePush(){
    //         this.newcosts.forEach(el => {
    //         this.chartdata.datasets[2].data.push(el.eleCost)
    //         // console.log(el.eleCost)
    //         })
    //         return this.chartdata.datasets[2].data
    //     },
    //     totalPush(){
    //         // let totalvalue=0
    //         this.newcosts.forEach(el=>{
    //             // totalvalue=0
    //             // totalvalue = totalvalue+(el.watercost + el.gascost + el.elecost)
    //             this.chartdata.datasets[3].data.push(el.totalCost)
    //             // console.log(el.month+'月は、'+el.totalCost+'円です')
    //         })
    //         return this.chartdata.datasets[3].data
    //     },
    //     colorPush(){
    //         // let colorArray=[]
    //         this.newcosts.forEach((el) => {
    //         this.chartdata.datasets[3].backgroundColor.push('rgba('+el.color+',0.2)')
    //         this.chartdata.datasets[3].borderColor.push('rgba('+el.color+',1)')
    //         })
    //         return this.chartdata.datasets[2].data
    // }

}
</script>
<style lang="scss">
.chart{
  max-width: 700px;
}

</style>