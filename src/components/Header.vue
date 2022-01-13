<template>
    <div class="header">
        <div @click="sendHome">
             <img src="../assets/noback_main.png" class="mainicon">
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
                        v-show="showContentFromStore"
                        @close="closeModal"
                    ></account-modal>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import accountModal from '../components/accountModal.vue';
import yearSelect from '../components/yearSelect.vue';
export default {
  name: 'Header',
  components:{
      accountModal,
      yearSelect
  },
  data(){
      return{
          showContent: this.showContentFromStore,
          mordalOrderInfo: '',
          showCalendar: false,
          calendarInfo: ''
      }
  },
  computed:{
    loginUserFromStore() {
        return this.$store.getters['users/setLogin_user']
    },
    costsFromStore() {
        return this.$store.getters['costs/getCosts']
    },
    showContentFromStore() {
        return this.$store.state.users.showContent
    }
  },
  methods:{
    modalOpen(loginUser) {
        this.mordalOrderInfo = loginUser
        console.log('this.modalOrderInfo=> '+JSON.stringify( this.mordalOrderInfo))
        this.$store.commit('users/modalOpenShowContent', true)
    },
    closeModal() {
    this.$store.commit('users/modalOpenShowContent', false)
      this.showCalendar = false;
    },
    sendHome() {
        if(this.$route.name != '/'){
            this.$router.push('/').catch(err => {console.log('error =>'+ err)})
        }
    },
    async calendarOpen(costsFromStore) {
        //重複しない年をthis.calendarInfoに追加
        let years = []
        await costsFromStore.forEach(cost => {
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
        this.showCalendar = true
    }
  },
};

</script>
<style lang="scss">
.header {
    // background-color: rgba(194, 186, 175, 0.8);
    background: linear-gradient(to bottom, rgba(240, 233, 224, 1) 50%, rgba(194, 186, 175, 0));
    // background: linear-gradient(to bottom, rgba(194, 186, 175, 1) 50%, rgba(194, 186, 175, 0));
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.mainicon {
    width: 50px;
    height: 100%;
    min-width: 100px;
    margin-left: 10px;
    cursor: pointer;

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
    cursor: pointer;
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