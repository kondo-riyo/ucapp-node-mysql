<template>
    <div>
        <div id="overlay" @click.self="$emit('close'), updateCancel()">
            <div id="content">
                <div class="flex">
                    <div class="text__title">
                        アカウント情報
                    </div>
                    <div title="アカウント情報を変更" v-show="!userStatus" @click="openInput(orderInfo)" class="inputicon_back">
                        <img src="../assets/inputicon.png" class="inputicon">
                    </div>
                </div>
                <div v-show="userStatus">
                    ※ アカウントの名前とメールアドレスを変更できます
                </div>
                <div class="flex">
                <div class="">
                    <div class="text__a">Name</div>
                    <div class="text__a">MailAddress</div>
                    <div class="text__a">PassWord</div>
                </div>
                <div v-show="!userStatus">
                    <div class="text__b">{{orderInfo.userName}}</div>
                    <div class="text__b">{{orderInfo.mail}}</div>
                    <div class="text__b">表示できません</div>
                </div>
                <div v-show="userStatus">
                    <div>
                        <input class="text__b account__input" v-model="userInfo.userName"/>
                    </div>
                    <div>
                        <input class="text__b account__input" v-model="userInfo.mail"/>
                    </div>
                    <!-- <input class="text__b" v-model="userInfo.password"/> -->
                    <div class="text__b">変更できません</div>
                </div>
                </div>
                <div v-show="userStatus">
                    <button @click="updateUserName" class="button button__brown">
                        ユーザー情報を変更
                    </button>
                </div>
                <div v-show="userStatus">
                    <button @click="updateCancel" class="button button__brown">
                        変更をキャンセル
                    </button>
                </div>
                <div v-show="!userStatus">
                    <button @click="logout" class="button button__brown">
                        ログアウト
                    </button>
                </div>
                <div v-show="!userStatus">
                    <button @click="deleteUser" class="button button__red">
                        ユーザー削除
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: [ 'orderInfo' ],
    data() {
        return {
            // showContent: false,
            showContent: this.showContentFromStore,
            userInfo:{
                userId: '',
                userName: '',
                mail: '',
                password: '',
            },
            userStatus: false
        };
    },
    // computed: {
        // showContentFromStore() {
        //     return this.$store.state.users.showContent
        // }
    // },
    methods: {
        deleteUser() {
            //ログインしているユーザーをデータベースから削除----------------------
          if (confirm("アカウントを消去してよろしいでしょうか？")){
            this.$store.dispatch('users/deleteUser')
          }
        },
        async logout() {
          if (confirm("ログアウトしますか？")){
            console.log('ログアウト')
            await this.$store.dispatch('users/logout')
            await this.$store.dispatch('costs/logout')
            // this.showContent = false
            this.$router.push('/')
          }
        },
        openInput(orderInfo) {
            this.userInfo.userId = orderInfo.userId
            this.userInfo.userName = orderInfo.userName
            this.userInfo.mail = orderInfo.mail
            this.userInfo.password = '変更できません'
            this.userStatus = true
            console.log('click!')
        },
        updateUserName(){
            console.log('sendUser=> '+ this.userInfo)
            this.$store.dispatch('users/updateUserName', this.userInfo)
        },
        updateCancel() {
            this.userStatus = false
        }
    },
}
</script>
<style lang="scss" scoped>
@import "../scss/index.scss";

#overlay {
  /*要素を重ねた時の順番*/
  z-index: 1;
  /*画面全体を覆う設定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.446);
  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  z-index: 2;
  width: 50%;
  max-width: 600px;
  min-width: 350px;
  height: auto;
  padding: 1em;
  background-color: rgba(240, 233, 224, 0.727);
  color: #673A15;
//   font-weight: bold;
  box-sizing: border-box;
  border-radius: 20px;
  text-align: center;
  font-weight: bold;
//   border-color: rgba(153, 134, 117, 0.26);
//   border-width: 4px;
  border: 3px solid #673A15;
  box-shadow: 20px;
}
.flex {
    display: flex;
    justify-content: center;
    padding: 30px;
}
.text__title {
    font: 20px sans-serif;
    font-weight: bold;
}
.text__a {
    margin: 0px 10px;
    font: 15px sans-serif;
    font-weight: bold;
    text-align: start;
    padding: 5px;

}
.text__b {
    margin: 0px 10px;
    font: 15px sans-serif;
    font-weight: normal;
    text-align: start;
    color: #673A15;
    padding: 5px;
}
.account__input {
    background-color: #f6f5f1;
    border-radius: 10px;
    // outline: 2px solid $base_brown;
    // border: none;
}
.account__input:focus {
    outline: 2px solid $base_brown;
}
// .margin--left {
//     margin-left: 50px;
// }
.inputicon_back {
    // background-color: $base_red;
    width: 30px;
    height: 30px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    transition: 0.5s;
    cursor: pointer;
}
.inputicon_back:hover {
    background-color: $base_red--50;
}
.inputicon {
    width: 20px;
    height: 20px;
    // margin: 0 10px;
    // padding: 0px 2px;
    // margin: 0 auto;
    transition: 0.5s;
}
// .inputicon:hover {
//     // width: 24px;
//     // height: auto;
//     // padding: 1px;
//     // margin-left: 10px;
//     background-color: #ef6158;
//     border-radius: 9999px;
// }
</style>