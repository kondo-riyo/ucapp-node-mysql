<template>
    <div>
        <div>
            <div>Name</div>
            <input v-model="user_name">
        </div>
        <div>
            <div>MailAddress</div>
            <input v-model="mail">
        </div>
        <div>
            <div>PassWord</div>
            <input v-model="password">
        </div>
        <!-- <div>
            <button @click="login">LOGIN</button>
        </div> -->
        <button @click="sendNewMember">送信</button>
        <!-- <button @click="deleteUser">ユーザー削除</button> -->
    </div>
</template>
<script>
export default {
    name: 'NewMember',
    data() {
        return {
            user_id: '',
            user_name: '',
            mail: '',
            password: '',
            messagePass: ''
        }
    },
    methods: {
        sendNewMember() {
            //ランダムな文字列を作成してuserIdを与える------------------------------
            this.user_id = Math.floor(100000000000 + Math.random() * 900000000000)
            const userInfo = {
                userId: this.user_id,
                userName: this.user_name,
                mail: this.mail,
                password: this.password
            }
            // console.log(userInfo)
            this.$store.dispatch('sendNewMember', userInfo)
        },
        // deleteUser() {
        //     //引数にuserIdべたがきで消せるよ----------------------
        //     this.$store.dispatch('deleteUser')
        // }
    },
}
</script>
<style lang="scss">

</style>