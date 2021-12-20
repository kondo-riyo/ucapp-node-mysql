<template>
<div>
  <Header/>
  <Main class="center"/>
  <!-- <button @click="reqLogin()">
    クリック
  </button>
  <div>{{usersData}}</div>
  <div>setLogin_user →{{setLogin_user}}</div> -->
  </div>
</template>
<script>
// import { mapState, mapActions } from 'vuex';
import Header from './components/Header.vue'
import Main from './components/Main.vue'
export default {
  name: 'App',
  components:{
   Header,
   Main
  },
  // created() {
  //   this.$store.dispatch('costs/requestCosts')
  // },

  // data() {
  //   return {
  //     usersData:''
  //   }
  // },
  // created() {
  //   this.reqLogin()
  // },
  // computed: {
  //   setLogin_user() {
  //     return this.$store.state.setLogin_user
  //   },
  //   ...mapState(["login_user"]),
  // },
  // methods: {
  //   reqLogin() {
  //     this.usersData = this.$store.state.login_user
  //   },
  //   // request() {
  //   //   this.axios.get('/api/users')
  //   //   .then((res) => {
  //   //     this.usersData = res.data
  //   //   })
  //   //   .catch((e) => alert(e))
  //   // },

  //   ...mapActions(["requestUsers", "requestCosts"])
  // },
};
</script>
<style lang="scss" scoped >
// .link {
//   color:white;
// }
// .app {
//   margin-top: 100px;
// }
// .center{
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
//   align-items: center;
// }
</style>