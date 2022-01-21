<template>
<div>
  <div>
    <div class="card__inputForm fadeIn__base space__top__50">
      <div class="center title__base">Utility Costs 光熱費登録</div>
      <div>
      <div class="cp_iptxt">
        <input v-model="costs.year" class="ef " type="text" placeholder="">
        <label>Year</label>
        <span class="focus_line"></span>
      </div>
      <div v-show="validate_year" class="err__msg">2000年以降のデータを入力できます</div>
      <div class="cp_iptxt">
        <input v-model="costs.month" class="ef " type="text" placeholder="">
        <label>Month</label>
        <span class="focus_line"></span>
      </div>
      <div v-show="validate_month_a" class="err__msg">正しい月を入力してください</div>
      <div v-show="validate_month_b" class="err__msg">{{costs.year}}年{{costs.month}}月の光熱費は入力済みです</div>
      <div class="cp_iptxt">
        <input v-model="costs.waterCost" class="ef " type="text" placeholder="">
        <label><img src="../assets/watericon.png" class="input__icon__size">Water Cost</label>
        <span class="focus_line"></span>
      </div>
      <div v-show="validate_waterCost" class="err__msg">10桁以下の数字を入力してください</div>
      <div class="cp_iptxt">
        <input v-model="costs.gasCost" class="ef " type="text" placeholder="">
        <label><img src="../assets/fireicon.png" class="input__icon__size">Gas Cost</label>
        <span class="focus_line"></span>
      </div>
      <div v-show="validate_gasCost" class="err__msg">10桁以下の数字を入力してください</div>
      <div class="cp_iptxt">
        <input v-model="costs.eleCost" class="ef " type="text" placeholder="">
        <label><img src="../assets/eleicon.png" class="input__icon__size">Electricity Cost</label>
        <span class="focus_line"></span>
      </div>
      </div>
      <div v-show="validate_eleCost" class="err__msg">10桁以下の数字を入力してください</div>
      <div class="center">
        <button @click="submit()" class="button button__red">
          登録
        </button>
        <push-modal
          :orderInfo="pushModalInfo"
          v-show="showContent"
          @close="closeModal"
        ></push-modal>
      </div>
      <div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import PushModal from '../components/pushModal.vue'
  export default {
    data (){
        return{
          showContent: false,
          pushModalInfo: '',
          costs: {
              costId: '',
              year: '',
              month: '',
              color: '',
              waterCost: null,
              eleCost: null,
              gasCost: null,
              totalCost: null,
              addDate: '',
              userId: ''
            },
          validate_year: false,
          validate_month_a: false,
          validate_month_b: false,
          validate_waterCost: false,
          validate_gasCost: false,
          validate_eleCost: false,
    }
    },
    components: {
      PushModal
    },
    computed: {
      costsFromStore() {
        return this.$store.getters['costs/getCosts']
      },
      usersFromStore() {
        return this.$store.state.users.setLogin_user
      }
    },
    methods:{
        submit(){
          this.validate_year = false;
          this.validate_month_a = false;
          this.validate_month_b = false;
          this.validate_waterCost = false;
          this.validate_gasCost = false;
          this.validate_eleCost = false;
          let year_check = this.costs.year.match(/20[0-9]{2}/g)
          //yearが一致しているデータを取得-----
          let yearPull = this.costsFromStore.filter(cost => cost.year === this.costs.year)
          //yearとmonthが不一致か調べる-------
          let monthMatch = yearPull.map(cost => cost.month != this.costs.month)
          let water_check = this.costs.waterCost.match(/^[1-9]{1}[0-9]{1,9}/g)
          let gas_check = this.costs.gasCost.match(/^[1-9]{1}[0-9]{1,9}/g)
          let ele_check = this.costs.eleCost.match(/^[1-9]{1}[0-9]{1,9}/g)
          if( year_check ) {
            if( this.costs.month >= 1 && this.costs.month <=12) {
              if( !monthMatch.includes(false) ) {
                if(water_check && gas_check && ele_check) {
                  //userId------------------------------------
                  this.costs.userId = this.usersFromStore.userId
                  //modalをオープンする-------------------------
                  this.colorPush()
                  //totalCost--------------------------------
                  this.costs.totalCost = Number(this.costs.waterCost) + Number(this.costs.gasCost) + Number(this.costs.eleCost)
                  console.log(this.costs.totalCost)
                  //costId-----------------------------------
                  this.costs.costId = Math.floor(100000000000 + Math.random() * 900000000000)
                  //addDate----------------------------------
                  this.costs.addDate = new Date()
                  //storeのactionのaddCostsに送る------------------------------
                  this.$store.dispatch('costs/addCosts',this.costs)
                  //modalをオープン-----------------------------
                  this.showContent = true
                  this.pushModalInfo = this.costs
                }else if(!water_check){
                  this.validate_waterCost = true
                }else if(!gas_check) {
                  this.validate_gasCost = true
                }else if(!ele_check) {
                  this.validate_eleCost = true
                }else{console.log('cost errorですよ')}
              }else {
                this.validate_month_b = true
              }
            }else {
              this.validate_month_a = true
            }
          }else {
            this.validate_year = true
            console.log(year_check)
          }
        },
        // openModal() {
        //   this.showContent = true
        //   console.log('this.showContent=> '+this.showContent)
        // },
        closeModal() {
          this.showContent = false;
          // await this.$store.dispatch('costs/choiceCosts', this.usersFromStore)
          this.$router.push('/')
        },
        colorPush(){
          let r=Math.round(Math.random() * 255)
          let g=Math.round(Math.random() * 255)
          let b=Math.round(Math.random() * 255)
          this.costs.color=`${r},${g},${b}`
        },
    }
}

</script>
<style lang="scss" scoped>
  @import '../scss/index.scss';
// .basecard {
//     display: flex;
//     align-content: center;
//     /* width: 1000px;
//     min-width: 500px; */
//     flex-direction:column;
//     justify-content: center; 
// }
.center {
  text-align: center;
}
// .title__base {
//   font-size: 18px;
//   color: #673a15;
//   font-weight: bold;
// }
.input__icon__size {
  width: 20px;
}
.err__msg {
  margin-left: 3rem;
  color: $base_red;
  font-size: 0.8rem;
  font-weight: 600;
}
</style>