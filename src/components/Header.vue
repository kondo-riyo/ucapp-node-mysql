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
                <!-- <div class="header__text">{{loginUserFromStore.userName}}</div> -->
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
        </div>
    </div>
</template>
<script>
import accountModal from '../components/accountModal.vue';
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
      accountModal
  },
  data(){
      return{
        //   badgemsg:13,
          showContent: false,
          mordalOrderInfo: '',
        //   mordalStatus: 1,
      }
  },
  computed:{
    loginUserFromStore() {
        return this.$store.getters['users/setLogin_user']
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
    },
    sendHome() {
        // this.$store.dispatch('costs/requrequestCosts')
        if(this.$route.name != '/'){
            this.$router.push('/').catch(err => {console.log('error =>'+ err)})
        }
    },
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