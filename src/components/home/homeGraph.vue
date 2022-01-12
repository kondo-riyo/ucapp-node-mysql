<template>
    <div class="home_graph">
            <div 
             v-show="!setChartDataFromStore.showGraph"
             class="home_graph__msg"
            >
               <div>ようこそ！{{setlogin_userFromStore.userName}}さん</div>
               <div>今年の光熱費はまだ登録されていません</div>
               <div class="home_graph__btn">
                   <button
                    class="button__brown"
                    @click="send_inputForm"
                   >
                    光熱費の登録はこちら
                   </button>
               </div>
            </div>
         <div v-show="setChartDataFromStore.showGraph">
             <!-- {{setChartDataFromStore.datasets[0].data.year}} -->
            <div class="home_graph__title">
                <img src="../../assets/2.png" class="home_graph__icon">
                {{setChartDataFromStore.year}} 年の光熱費
            </div>
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
    methods: {
        send_inputForm() {
            this.$router.push('/inputform')
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
  width: 70%;
  min-width: 600px;
//   height: 500px;
  margin:0 auto;
}
.home_graph__msg {
    // justify-content: center;
    text-align: center;
    font-size: 1.5rem;
    color: #673a15;
    font-weight: 700;
    margin-top: 70px;
}
.home_graph__btn {
    margin-top: 20px;
}
.home_graph__title {
    text-align: center;
    font-size: 1.5rem;
    color: #673a15;
    font-weight: 700;
    margin-top: 30px;
    margin-bottom: 20px;
}
.home_graph__icon {
    width: 5rem;
    margin-bottom: -1.5rem;
}
</style>