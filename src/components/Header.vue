<template>
    <div class="header">
        <div>
          <p> 
            <router-link to="/" class='link'>
             <img src="../assets/brown.png" class="mainicon">
            </router-link>
          </p>
        </div>
        <div>
            <div v-if="!loginUserFromStore">
                <router-link to="/login" class='link'>
                    <img src="../assets/login.png" class="iconsize">
                </router-link>
            </div>
            <div v-if="loginUserFromStore">
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
        <!-- <tr>
            <td rowspan="2">
                <p> <router-link to="/" class='link'><img src="../assets/brown.png" class="mainicon"></router-link></p>
            </td>
            <td> </td>
            <td class="left">
                <div>
                <p title="ログイン" v-show="!$store.state.login_user" @click="login"><a href="" class="btn-border btn--radius">LOGIN</a></p>
                <p title="ログアウト" v-show="$store.state.login_user" @click="logout"><a href="" class="btn-border btn--radius">LOGOUT</a></p>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="flex_wge">
                    <p title="水道料金の表示"><router-link to="/waterchart" class="link"><img src="../assets/watericon.png" class="iconsize"></router-link></p>
                    <p title="ガス料金の表示"><router-link to="/gaschart" class="link"><img src="../assets/fireicon.png" class="iconsize"></router-link></p>
                    <p title="電気料金の表示"><router-link to="/elementchart" class="link"><img src="../assets/eleicon.png" class="iconsize"></router-link></p>
                </div>
            </td>
            <td>
                <div class="flex_add">
                <p title="登録"><router-link to="/inputform" class='link'><img src="../assets/inputicon.png" class="iconsize"></router-link></p>
                <p title="一覧"><router-link to="/adddata" class='link'><img src="../assets/addicon.png" class="iconsize"></router-link></p>
                </div>
            </td>
        </tr> -->
    </div>
</template>
<script>
import accountModal from '../components/accountModal.vue';
import {mapActions} from "vuex";
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
        return this.$store.state.setLogin_user
    }
  },
  methods:{
    logout() {
        this.$store.dispatch('logout')
    },
    modalOpen(loginUser) {
        this.showContent = true
        this.mordalOrderInfo = loginUser
    },
    closeModal() {
      this.showContent = false;
    },

    // ...mapActions(["login","setLoginUser","logout","deleteLoginUser","fetchMonths"])
    ...mapActions(["requestUsers"])
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