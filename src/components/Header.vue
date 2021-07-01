<template>
    <table class="header">
        <tr>
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
                <!-- <p>
                    <router-link to="/adddata" class='link'>
                    <v-badge avatar color="primary" :content="badgemsg" :value="badgemsg" overlap bordered>
                        <v-avatar size="40">
                        <v-img src="../assets/bell2.png" />
                        </v-avatar>
                    </v-badge>
                    </router-link>
                </p> -->
                </div>
            </td>
        </tr>
    </table>
</template>
<script>
import {mapActions} from "vuex";
import firebase from 'firebase';
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
  data(){
      return{
          badgemsg:13
      }
  },
  created(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.setLoginUser(user)
        this.fetchMonths()
      }else{
        this.deleteLoginUser()
      }
    })
  },
  methods:{
    ...mapActions(["login","setLoginUser","logout","deleteLoginUser","fetchMonths"])
  },
};

</script>
<style scoped>
@import "../parts/circleButton.css";
/* @import "../parts/squareButton.css"; */
/* @import "../parts/ibiButton.css";
@import "../parts/gizaButton.css"; */
.header {
    background-color: #c2baaf;
    width: 100%;
    /* max-width: 500px; */
    height: 10%;
}
.mainicon {
    width: 40%;
    height: 100%;
    min-width: 100px;
    margin-left: 10%;
}
.flex_wge {
    display: flex;
    justify-content:center;
    flex-direction: row;
    /* align-items:center; */
}
.flex_add{
    display: flex;
    justify-content: center;
    flex-direction: row;
    /* align-items: center; */
}
.iconsize{
    width: 20%;
    height: 20%;
    min-width: 40px;
    min-height: 40px;
    /* align-items: flex-end; */
}
/* .iconsize:hover{
   width: 60px;;
   height: 60px;
} */
.btn {
    justify-content: flex-end;
}
.circlebutton-size{
    width: 30px;
    height: 30px;
}
.left{
    display: flex;
    justify-content:flex-end;
}
</style>