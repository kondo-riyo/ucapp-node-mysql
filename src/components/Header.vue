<template>
    <div class="header">
        <div class="link" @click="sendHome">
            <!-- <router-link to="/" class='link'> -->
             <img src="../assets/brown.png" class="mainicon">
            <!-- </router-link> -->
        </div>
        <div>
            <div v-if="!loginUserFromStore">
                <router-link to="/login" class='link'>
                    <img src="../assets/login.png" class="iconsize">
                </router-link>
            </div>
            <div v-if="loginUserFromStore" class="flex">
                <div>
                    <router-link to="/inputform">
                        <img src="../assets/inputicon2.png" class="iconsize">
                    </router-link>
                </div>
                <div @click="calendarOpen(costsFromStore)">
                    <img src="../assets/calendar.png" class="iconsize">
                </div>
                <div>
                    <year-select
                        :orderInfo="calendarInfo"
                        v-show="showCalendar"
                        @close="closeModal"
                    ></year-select>
                </div>
                <div @click="modalOpen(loginUserFromStore)">
                    <img src="../assets/account.png" class="iconsize">
                </div>
                <div>
                    <account-modal
                        :orderInfo="mordalOrderInfo"
                        v-show="showContent"
                        @close="closeModal"
                    ></account-modal>
                </div>
            </div>
            {{loginUserFromStore}}
        </div>
    </div>
</template>
<script>
import accountModal from '../components/accountModal.vue';
import yearSelect from '../components/yearSelect.vue';
// import {mapActions} from "vuex";
// import Logo from '../parts/Logo.vue';
// import LoginButton from '../parts/LoginButton.vue'
// import CostButton from '../parts/CostButton.vue'
export default {
  name: 'Header',
//   components:{
//     Logo,
//     LoginButton,
//     CostButton
//   },
  components:{
      accountModal,
      yearSelect
  },
  data(){
      return{
        //   badgemsg:13,
          showContent: false,
          mordalOrderInfo: '',
          showCalendar: false,
          calendarInfo: ''
        //   mordalStatus: 1,
      }
  },
  computed:{
    loginUserFromStore() {
        return this.$store.getters['users/setLogin_user']
    },
    costsFromStore() {
        return this.$store.getters['costs/getCosts']
    }
  },
  methods:{
    logout() {
        this.$store.dispatch('users/logout')
    },
    modalOpen(loginUser) {
        this.showContent = true
        this.mordalOrderInfo = loginUser
        console.log('this.modalOrderInfo=> '+JSON.stringify(this.mordalOrderInfo))
    },
    closeModal() {
      this.showContent = false;
      this.showCalendar = false;
    },
    sendHome() {
        // this.$store.dispatch('costs/requrequestCosts')
        if(this.$route.name != '/'){
            this.$router.push('/').catch(err => {console.log('error =>'+ err)})
        }
    },
    calendarOpen(costsFromStore) {
        this.showCalendar = true
        //重複しない年をthis.calendarInfoに追加
        let years = []
        costsFromStore.forEach(cost => {
                if(years.length === 0) {
                    years.push(cost.year)
                }else if(years.length != 0) {
                    if( !years.includes(cost.year)) {
                        years.push(cost.year)
                    }else {
                        console.log(cost.year+'は弾かれました')
                    }
                }
        });
        this.calendarInfo=[...years].sort((a, b) => b - a);
        console.log('this.calendarInfo=> '+this.calendarInfo)
    }
    // ...mapActions(["users/requestUsers","costs/requestCosts"])
  },
};

</script>
<style lang="scss">
// @import "../parts/circleButton.css";
/* @import "../parts/squareButton.css"; */
/* @import "../parts/ibiButton.css";
@import "../parts/gizaButton.css"; */
.header {
    background-color: #c2baaf;
    width: 100%;
    /* max-width: 500px; */
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.mainicon {
    width: 50px;
    height: 100%;
    min-width: 100px;
    margin-left: 10px;
}
.flex {
    display: flex;
}
// .flex_wge {
//     display: flex;
//     justify-content:center;
//     flex-direction: row;
//     /* align-items:center; */
// }
// .flex_add{
//     display: flex;
//     justify-content: center;
//     flex-direction: row;
//     /* align-items: center; */
// }
.iconsize{
    // width: 30px;
    // height: 100%;
    // min-width: 100px;
    width: 50px;
    height: 50px;
    min-width: 40px;
    min-height: 40px;
    margin-right: 10px;
    margin-bottom: 5px;
    /* align-items: flex-end; */
}
.header__text {
    color:#673a15;
    font-weight: bold;
    margin-bottom: 5px;
}
// /* .iconsize:hover{
//    width: 60px;;
//    height: 60px;
// } */
// .btn {
//     justify-content: flex-end;
// }
// .circlebutton-size{
//     width: 30px;
//     height: 30px;
// }
// .left{
//     display: flex;
//     justify-content:flex-end;
// }
</style>