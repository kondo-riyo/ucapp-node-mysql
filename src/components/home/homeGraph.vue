<template>
    <div class="home_graph">
            <div 
             v-show="!setChartDataFromStore.showGraph"
             class="home_graph__msg"
            >
               <div>ようこそ！{{setlogin_userFromStore.userName}}さん</div>
               <div>今年の光熱費はまだ登録されていません</div>
               <div>
                   <button
                    class="square-button"
                   >
                    光熱費の登録はこちら
                   </button>
            </div>
         </div>
         <div v-show="setChartDataFromStore.showGraph">
            <Barchart :data="setChartDataFromStore" :options="options" class="chart"/>
         </div>
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
            newcosts:[],
            chartdata: {},
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
    computed:{
        setlogin_userFromStore() {
        return this.$store.getters['users/setLogin_user']
        },
        setChartDataFromStore() {
            return this.$store.state.costs.chartdata
        }
        
    },
}
</script>
<style lang="scss">
    @import '../../scss/button.scss';
    .home_graph {
        display: flex;
        justify-content: center;
    }
.chart{
  max-width: 700px;
  margin:0 auto;
}
.home_graph__msg {
    // justify-content: center;
    text-align: center;
    font-size: 1.5rem;
    color: #673a15;
    font-weight: 700;
    margin-top: 50px;
}
</style>