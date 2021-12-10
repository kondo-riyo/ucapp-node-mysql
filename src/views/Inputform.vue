<template>
<!-- <v-app>
    <v-form v-model="valid">
        <v-container class="basecard">
        <v-col>
            <div>登録月</div>
            <v-select :items="selectyear" v-model="month.year" @change="yearPush()">
            </v-select>
            <v-select :items="care_selectmonth" v-model="month.month" ></v-select>
        </v-col>
        <v-col>
            <div>水道</div>
          <v-text-field
            v-model.number="month.watercost"
            :rules="costRules"
            :counter="10"
            label="水道"
            required
          ></v-text-field>
        </v-col>

        <v-col>
            <div>ガス</div>
          <v-text-field
            v-model.number="month.gascost"
            :rules="costRules"
            :counter="10"
            label="ガス"
            required
          ></v-text-field>
        </v-col>
        <v-col>
            <div>電気</div>
          <v-text-field
            v-model.number="month.elecost"
            :rules="costRules"
            :counter="10"
            label="電気"
            required
          ></v-text-field>
        </v-col>
        <v-col>
       <v-btn color="" class="" @click="submit()">追加</v-btn>
       </v-col>
        </v-container>
    </v-form>
</v-app> -->
<div>
  <div>
    <div>
      <div>Utility Costs 光熱費登録</div>
      <div class="cp_iptxt">
        <input v-model="costs.year" class="ef " type="text" placeholder="">
        <label>Year</label>
        <span class="focus_line"></span>
      </div>
      <div class="cp_iptxt">
        <input v-model="costs.month" class="ef " type="text" placeholder="">
        <label>Month</label>
        <span class="focus_line"></span>
      </div>
      <div class="cp_iptxt">
        <input v-model="costs.waterCost" class="ef " type="text" placeholder="">
        <label>Water Cost</label>
        <span class="focus_line"></span>
      </div>
      <div class="cp_iptxt">
        <input v-model="costs.gasCost" class="ef " type="text" placeholder="">
        <label>Gas Cost</label>
        <span class="focus_line"></span>
      </div>
      <div class="cp_iptxt">
        <input v-model="costs.eleCost" class="ef " type="text" placeholder="">
        <label>Electricity Cost</label>
        <span class="focus_line"></span>
      </div>
      <div>
        <button @click="submit" class="button button__red">
          登録
        </button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
// import VeeValidate, { Validator } from 'vee-validate'
// import {mapActions, mapState} from 'vuex'
// import Vue from 'vue' 
// import vSelect from 'vue-select'
// import 'vue-select/dist/vue-select.css'; 
// Vue.component("v-select", vSelect);
  export default {
    data (){
        return{
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
          },
      // valid: false,
      // month:{
        //   month:'',
        //   watercost:null,
        //   gascost:null,
        //   elecost:null,
      // },
      // selectyear:[2018,2019,2020,2021],
      // selectmonth:[1,2,3,4,5,6,7,8,9,10,11,12],
      // care_selectmonth:[],
      // removemoon:[],
      // costRules: [
        // v => !!v || '入力必須です',
        // v => v.length <= 10 || '正しい入力をしてください',
        
        // v => v=String || '数字を入力してください'
      // ],
    }
    // console.log(this.month)
    },
    // created(){
    //     // this.hankaku()
    //     const month = this.$store.getters.getMonthById(
    //         this.$route.params.month_id
    //     );
    //     if (month){
    //         this.month = month
    //     }
    // },
    // methods:{
    //     hankaku(str){
    //     str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    //     return String.fromCharCode(s.charCodeAt(0) - 65248);
    //     });
    //     },
    // },
    // computed:{
    //     ...mapState(["costs"])
    // },
    methods:{
        submit(){
          this.colorPush()
          //totalCost--------------------------------
          this.costs.totalCost = Number(this.costs.waterCost) + Number(this.costs.gasCost) + Number(this.costs.eleCost)
          console.log(this.costs.totalCost)
          //costId-----------------------------------
          this.costs.costId = Math.floor(100000000000 + Math.random() * 900000000000)
          //addDate----------------------------------
          this.costs.addDate = new Date()
          console.log(this.costs)
          //storeのactionのaddCostsに送る------------------------------
          this.$store.dispatch('addCosts',this.costs)
          this.$router.push('/')

          //過去の遺物---------------------------------
            // if(this.$route.params.month_id){
            //     this.updateMonth({
            //         id:this.$route.params.month_id,
            //         month:this.month
            //     })
            // }else{
            // this.colorPush()
            // this.month.totalcost=this.month.watercost + this.month.gascost + this.month.elecost
            // this.addMonth(this.month);
            // }
            // this.$router.push({name: "Home"});
            // console.log(this.month)
            // this.month={};
        },
        colorPush(){
          let r=Math.round(Math.random() * 255)
          let g=Math.round(Math.random() * 255)
          let b=Math.round(Math.random() * 255)
          this.costs.color=`${r},${g},${b}`
        },
        yearPush(){
            this.costs.forEach(el =>{
                // this.selectyear.forEach(year=>{
                    this.selectmonth.forEach(moon=>{
                    if(this.month.year==el.year && moon==el.month){
                        this.removemoon.push(moon)
                        // this.care_selectmonth=this.selectmonth.filter(n=>n!=moon)
                        console.log(moon+'月をpush')
                    }
                    // else{
                    //     this.care_selectmonth=this.selectmonth
                    // }
                    })
                    console.log('removemoon= '+this.removemoon)
                    // this.care_selectmonth=this.selectmonth.filter(n=>n!=this.removemoon)
                // })
                // this.selectmonth.forEach(moon =>{
                //     if(el.month!=moon){
                //         this.care_selectmonth.push(moon)
                //     }
                // })
                // if(el.month=)
            })
            console.log('最終的に、'+this.removemoon)
            // this.care_selectmonth=(this.selectmonth-this.removemoon)
                    this.removemoon.forEach(rem=>{
                        this.care_selectmonth=this.selectmonth.filter(n=>(n-rem))
                        // this.removemoon.forEach(rem=>{
                        //     if(rem!=moon){
                        //         this.care_selectmonth.push(moon)
                        //     }
                        // })
                        console.log('remove'+this.care_selectmonth)
                    })
        },

        // total(){
        //   let totalvalue=0
        //     totalvalue = totalvalue+(this.month.watercost + this.month.gascost + this.month.elecost)
        //     // this.month.totalvalue.push(totalvalue)
        //     // console.log(el.month+'月は、'+totalvalue+'円です')
          
        //   return totalvalue
        // },
    //     totalPush(){
    //       let totalvalue=0
    //       this.newcosts.forEach(el=>{
    //         totalvalue=0
    //         totalvalue = totalvalue+(el.watercost + el.gascost + el.elecost)
    //         this.month.totalvalue.push(totalvalue)
    //         console.log(el.month+'月は、'+totalvalue+'円です')
    //       })
    //       return this.month.totalvalue
    // },

        // ...mapActions(["addMonth","updateMonth"]),
    }
}
// console.log(this.month)

</script>
<style lang="scss" scoped>
// .basecard {
//     display: flex;
//     align-content: center;
//     /* width: 1000px;
//     min-width: 500px; */
//     flex-direction:column;
//     justify-content: center; 
// }
</style>