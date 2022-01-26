<template>
<div>
  <Header class="header"/>
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
  .header {
    z-index: 9998;
    position: fixed;
  }
  .main {
    padding:100px 0 0 0;
    margin:0 auto;
    // height: 650px;
    max-height: auto;
  }
</style>