<template>
    <div class="space__top__50 fadeIn__base">
        <div class="card__white center">
            <div class="center title__base">
                {{fetchMonth[0].year}}年 {{fetchMonth[0].month}}月 光熱費
            </div>
            <div class="move_line flex__space-between center input__group__nomove">
                <div class="input--label"><img src="../../assets/watericon.png" class="input__icon__size">Water Cost</div>
                <div>
                    <input 
                     v-model="waterCost" 
                     @change="totalCost_calc()"
                     class="input__none input__text" 
                     type="text" 
                     placeholder=""
                     >
                </div>
            </div>
            <div class="move_line flex__space-between center input__group__nomove">
                <div class="input--label"><img src="../../assets/fireicon.png" class="input__icon__size">Gas Cost</div>
                <div>
                    <input 
                     v-model="gasCost" 
                     @change="totalCost_calc()"
                     class="input__none input__text" 
                     type="text" 
                     placeholder=""
                     >
                </div>
            </div>
            <div class="move_line flex__space-between center input__group__nomove">
                <div class="input--label"><img src="../../assets/eleicon.png" class="input__icon__size">Electricity Cost</div>
                <div>
                    <input 
                     v-model="eleCost" 
                     @change="totalCost_calc()"
                     class="input__none input__text" 
                     type="text" 
                     placeholder=""
                     >
                </div>
            </div>
            <div class="text--bg__gray flex__space-around">
                <div class="text__gray--bold">Total</div>
                <div class="text__brown--bold">{{totalCost_calc}}</div>
            </div>
            <div class="circle__back__update">
                <button @click="updateCost" class="button__id__update">
                    編集を登録
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            waterCost: 0,
            gasCost: 0,
            eleCost: 0,
            totalCost: 0
        }
    },
    computed: {
        fetchMonth() {
            let getMonth = []
            this.$store.getters['costs/getCosts'].forEach(cost => {
                if( cost.costId == this.$route.params.id) {
                    getMonth.push(cost)
                    this.waterCost = getMonth[0].waterCost
                    this.gasCost = getMonth[0].gasCost
                    this.eleCost = getMonth[0].eleCost
                    this.totalCost = getMonth[0].totalCost
                }
            });
            console.log(getMonth[0].waterCost)
            return getMonth
        },
        totalCost_calc() {
            let total = null
            total = Number(this.gasCost) + Number(this.waterCost) + Number(this.eleCost)
            console.log(total)
            return total
        }

    },
    methods: {
        updateCost() {
            
        }
    },
}
</script>
<style lang="scss">
@import '../../scss/position.scss';
@import '../../scss/text.scss';
.input__icon__size {
  width: 20px;
}

//input-------------------------
.input__group__nomove {
margin: 40px 40px 10px 40px;
}
.move_line {
    border-bottom: 3px solid #c2baaf;
}
.input--label {
    margin-left: 20px;
    color: #c2baaf;
}
.input__none {
    outline: none;
}
.input__text {
color: #673a15;
text-align: center;
font-weight: bold;
font-size: 20px;
}

//totalCostの並び-------------------
.text--bg__gray {
    background-color: #c2baaf59;
    padding: 15px;
    margin: 0px 40px;
}
.text__brown--bold {
    color: #673a15;
    font-weight: bold;
    font-size: 20px;
}
.text__gray--bold {
    color: #c2baaf;
    font-weight: bold;
}

.button__id__update {
    margin: 3px;
}
</style>