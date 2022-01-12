<template>
    <div class="space__top__50 fadeIn__base">
        <div class="card__white center">
            <div class="center title__base">
                {{fetchMonth.year}}年 {{fetchMonth.month}}月 光熱費
            </div>
            <div class="move_line flex__space-between center input__group__nomove">
                <div class="input--label"><img src="../../assets/watericon.png" class="input__icon__size">Water Cost</div>
                <div>
                    <input 
                     v-model="cost.waterCost" 
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
                     v-model="cost.gasCost" 
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
                     v-model="cost.eleCost" 
                     @change="totalCost_calc()"
                     class="input__none input__text" 
                     type="text" 
                     placeholder=""
                     >
                </div>
            </div>
            <div class="text--bg__gray flex__space-around">
                <div class="text__brown--bold">Total</div>
                <div class="text__brown--bold">{{this.cost.totalCost}}</div>
            </div>
            <div class="circle__back__update">
                <button @click="updateCost" class="button__id__update">
                    編集を登録
                </button>
            </div>
            <push-modal
              :orderInfo="pushModalInfo"
              v-show="showContent"
                @close="closeModal"
            ></push-modal>
        </div>
    </div>
</template>
<script>
import PushModal from '../../components/pushModal.vue';

export default {
    data() {
        return {
            showContent: false,
            pushModalInfo: '',
            cost:{
                costId: '',
                year: '',
                month: '',
                color: '',
                waterCost: 0,
                gasCost: 0,
                eleCost: 0,
                totalCost: 0,
                addDate: '',
                userId: '',
            }
        }
    },
    components: {
      PushModal
    },
    computed: {
        fetchMonth() {
            // let getMonth = []
            this.$store.getters['costs/getCosts'].forEach(cost => {
                if( cost.costId == this.$route.params.id) {
                    this.cost = cost
                }
            });
            console.log(this.cost)
            return this.cost
        },
        newTotalCost() {
            return this.cost.totalCost
        }

    },
    methods: {
        totalCost_calc() {
            this.cost.totalCost = Number(this.cost.gasCost) + Number(this.cost.waterCost) + Number(this.cost.eleCost)
            console.log(this.cost.totalCost)
        },
        async updateCost() {
            console.log(this.cost)
            this.cost.addDate = new Date()
            await this.$store.dispatch('costs/updateCost', this.cost)
            this.showContent = true
            console.log(this.cost)
            this.pushModalInfo = this.cost
            console.log(this.pushModalInfo)
        },
        closeModal() {
          this.showContent = false;
          // await this.$store.dispatch('costs/choiceCosts', this.usersFromStore)
          this.$router.push('/')
        },
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
margin-bottom: 2px;
}
.input__text:hover {
    border-radius: 10px;
background-color: #c2baaf56;
box-shadow: 0px 0px 8px 3px #c2baaf74;
transition: 0.5s;
}

//totalCostの並び-------------------
.text--bg__gray {
    background-color: #c2baaf59;
    padding: 15px;
    margin: 0px 40px;
    box-shadow: 0px 0px 10px 2px #c2baaf74;
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