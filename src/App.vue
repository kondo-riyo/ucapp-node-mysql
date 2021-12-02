<template>
<div>
  <!-- <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <router-link to="/" class='link'>Home</router-link>|
    <router-link to="/inputform" class='link'>登録</router-link> |
    <router-link to="/adddata" class='link'>一覧</router-link> 
   
       <v-btn v-show="!$store.state.login_user" @click="login">ログイン</v-btn>

       <v-btn v-show="$store.state.login_user" @click="logout">ログアウト</v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app> -->
  <Header/>
  <Main class="center"/>
  </div>
</template>
<script>
// import {mapActions} from "vuex";
import Header from './components/Header.vue'
import Main from './components/Main.vue'
export default {
  name: 'App',
  components:{
   Header,
   Main
  },
};
</script>
<style scoped>
.link {
  color:white;
}
.app {
  margin-top: 100px;
}
.center{
  display: block;
  margin-left: auto;
  margin-right: auto;
  /* align-items: center; */
}
</style>