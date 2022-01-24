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
            <div class="home_graph__title">
                <img src="../../assets/2.png" class="home_graph__icon">
                {{setChartDataFromStore.year}} 年の光熱費
            </div>
            <Barchart :data="setChartDataFromStore" :options="options" class="chart"/>
         </div>
         <div
            class="send_inputform"
            @click="send_inputForm"
         >
            <div>
                <img src="../../assets/sendAddData.png" class="send_inputform__icon">            </div>
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
@import '../../scss/index.scss';
.home_graph {
    display: flex;
    justify-content: center;
}
.chart{
  width: 70%;
  min-width: 600px;
  margin:0 auto;
}
.home_graph__msg {
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

.send_inputform {
    position: fixed;
    right: 10px;
    bottom: 10px;
    width: 6rem;
    height: 6rem;
    margin-bottom: 2rem;
    cursor: pointer;
    border-radius: 9999px;
    //centerにする
    display: flex;
    justify-content: center;
    align-items: center;
    //アニメーション
    animation:1.5s ease-in 1s infinite alternate forwards running blinking;
}
@keyframes blinking {
  0% {
    background-color: $base_brown;
  }
  100% {
    background-color: $base_brown--25;
  }
}
.send_inputform:hover {
    animation-play-state: paused;
}
.send_inputform__icon {
    width: 5rem;
}
</style>