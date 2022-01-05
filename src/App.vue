<template>
<div>
  <Header/>
  <Main class="main"/>
  </div>
</template>
<script>
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
<style lang="scss" scoped >
  .main {
    padding:0;
    margin:0 auto;
    // height: 650px;
    max-height: auto;
  }
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