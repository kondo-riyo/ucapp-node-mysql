<template>
    <div>
        <div id="overlay" @click.self="$emit('close')">
            <div id="content">
                <div>アカウント情報</div>
                <div class="flex">
                <div>
                    <div>Name</div>
                    <div>MailAddress</div>
                    <div>PassWord</div>
                </div>
                <div>
                    <div>{{orderInfo.userName}}</div>
                    <div>{{orderInfo.mail}}</div>
                    <div>{{orderInfo.password}}</div>
                </div>
                </div>
                <div>
                    <button @click="logout" class="button button__logout">ログアウト</button>
                </div>
                <div>
                    <button @click="deleteUser" class="button button__delete">ユーザー削除</button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    props: [ 'orderInfo' ],
    methods: {
      deleteUser() {
        //ログインしているユーザーをデータベースから削除----------------------
        this.$store.dispatch('deleteUser')
      },
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
  padding: 1em;
  background-color: rgba(194, 186, 175, 0.24);
  color: #673A15;
//   font-weight: bold;
  box-sizing: border-box;
  border-radius: 20px;
//   border-color: rgba(153, 134, 117, 0.26);
//   border-width: 4px;
  border: 3px solid #673A15;
  box-shadow: 20px;
}
.flex {
    display: flex;
    // justify-content: center;
    // margin: 10px;
}
.button {
    border-radius: 20px;
    padding: 5px 15px 5px 15px;
    margin: 5px;
}
.button__logout {
    background-color: #673A15;
    color: white;
}
.button__delete {
    background-color: #ef6158;
    color: white;
}
</style>