<template>
    <div class="space__rigth__300 space__top__50 fadeIn__base">
        <!-- <div>
            {{fetchYear}}
        </div> -->
        <div class="flex__center">
            <div class="flex__year base__title__year">
                <div>{{fetchYear[0].year}}</div>
                <div>
                    <img src="../../assets/watericon.png" class="icon__size__year">
                </div>
                <div>
                    <img src="../../assets/fireicon.png" class="icon__size__year">
                </div>
                <div>
                    <img src="../../assets/eleicon.png" class="icon__size__year">
                </div>
                <div>Total</div>
                <div></div>
            </div>
        </div>
        <div v-for="cost in fetchYear" :key="cost.costId" class="base__body__year">
            <div class="flex__year card__rectangle" @click="send_id(cost.costId)">
                <div class="circle__back__base">{{cost.month}}</div>
                <div class="circle__back__blue">{{cost.waterCost}}</div>
                <div class="circle__back__red">{{cost.gasCost}}</div>
                <div class="circle__back__yellow">{{cost.eleCost}}</div>
                <div class="circle__back__base">{{cost.totalCost}}</div>
            </div>
            <div @click="deleteCost(cost)">
                <img src="../../assets/dust_box.png" class="icon__size__dust_box">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        fetchYear() {
            // let fetchYear = this.$route.params.year
            // return fetchYear
            // let costs = this.$store.getters['costs/getCosts']
            let getYear = []
            // this.$store.getters['costs/getCosts'].forEach(cost => {
            this.$store.state.costs.costs.forEach(cost => {
                if( cost.year == this.$route.params.year) {
                    getYear.push(cost)
                }
            });
            let setYear = [...getYear].sort((a,b) => b.month - a.month)
            return setYear
        }
    },
    methods: {
        send_id(costId) {
            this.$router.push({name: 'allList_id',params: {id:costId}})
        },
        deleteCost(cost) {
            if(window.confirm(`${cost.year}年${cost.month}月分のデータを消去しますか？`)){
                this.$store.dispatch('costs/deleteCost', cost.costId)
            }
        }
    },
}
</script>
<style lang="scss">
@import '../../scss/space.scss';
.flex__year {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.flex__center {
    display: flex;
    justify-content: center;
}
.base__title__year {
    width: 50%;
    padding: 0px;
    font-weight: bold;
    color: #673a15;
}
.base__body__year {
    margin: 10px;
    display: flex;
}
.icon__size__year {
    width: 60px;
}
.icon__size__dust_box {
    cursor: pointer;
    width: 40px;
    margin: 15px 5px 5px 5px;
}
</style>