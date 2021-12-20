<template>
    <div>
        <div id="overlay" @click.self="$emit('close'), updateCancel()">
            <div id="content">
                <div class="flex">
                    <div class="text__title">
                        アカウント情報
                    </div>
                    <div title="アカウント情報を変更" v-show="!userStatus" @click="openInput(orderInfo)" class="icon">
                        <img src="../assets/inputicon.png" class="inputicon">
                    </div>
                </div>
                <div class="flex">
                <div class="">
                    <div class="text__a">Name</div>
                    <div class="text__a">MailAddress</div>
                    <div class="text__a">PassWord</div>
                </div>
                <div v-show="!userStatus">
                    <div class="text__b">{{orderInfo[0].userName}}</div>
                    <div class="text__b">{{orderInfo[0].mail}}</div>
                    <!-- <div class="text__b">{{orderInfo[0].password}}</div> -->
                    <div class="text__b">表示できません</div>
                </div>
                <div v-show="userStatus">
                    <input class="text__b" v-model="userInfo.userName"/>
                    <input class="text__b" v-model="userInfo.mail"/>
                    <input class="text__b" v-model="userInfo.password"/>
                </div>
                <!-- <div> -->
                    <!-- <div v-show="!userNameStatus" @click="openInput(orderInfo.userId, orderInfo.userName)"><img src="../assets/inputicon.png" class="inputicon"></div> -->
                    <!-- <div v-show="userNameStatus"><button @click="updateUserName">update</button></div> -->
                    <!-- <div><img src="../assets/inputicon.png" class="inputicon"></div>
                    <div><img src="../assets/inputicon.png" class="inputicon"></div> -->
                <!-- </div> -->
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
            showContent: false,
            userInfo:{
                userId: '',
                userName: '',
                mail: '',
                password: '',
            },
            userStatus: false
        };
    },
    methods: {
        deleteUser() {
            //ログインしているユーザーをデータベースから削除----------------------
            this.$store.dispatch('users/deleteUser')
        },
        logout() {
            console.log('ログアウト')
            this.$store.dispatch('users/logout')
            this.showContent = false
        },
        openInput(orderInfo) {
            this.userInfo.userId = orderInfo[0].userId
            this.userInfo.userName = orderInfo[0].userName
            this.userInfo.mail = orderInfo[0].mail
            this.userInfo.password = '変更できません'
            this.userStatus = true
            console.log('click!')
        },
        updateUserName(){
            // const sendUser = {
            //     userId: this.userId,
            //     userName: this.userName
            // }
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
// .button {
//     border-radius: 20px;
//     padding: 5px 15px 5px 15px;
//     margin: 5px;
// }
// .button__brown {
//     background-color: #673A15;
//     color: white;
// }
// .button__red {
//     background-color: #ef6158;
//     color: white;
// }
.text__title {
    font: 20px sans-serif;
    font-weight: bold;
}
.text__a {
    margin: 0px 10px;
    font: 15px sans-serif;
    font-weight: bold;
    text-align: start;
}
.text__b {
    margin: 0px 10px;
    font: 15px sans-serif;
    font-weight: normal;
    text-align: start;
}
.inputicon {
    width: 20px;
    height: auto;
    // margin-left: 10px;
    padding: 0px 2px;
    margin-left: 10px;
}
.inputicon:hover {
    width: 24px;
    height: auto;
    padding: 0px;
    margin-left: 10px;
    background-color: #ef6158;
    border-radius: 50%;
}
</style>