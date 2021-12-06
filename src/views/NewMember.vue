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
        <div>
            <button @click="login">LOGIN</button>
        </div>
        <button @click="sendNewMember">送信</button>
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
                // userId: "111222333445",
                // userName: "ニュー",
                // mail: "new@gmail.com",
                // password: "newnew"
                userId: this.user_id,
                userName: this.user_name,
                mail: this.mail,
                password: this.password
            }
            // console.log(userInfo)
            this.$store.dispatch('sendNewMember', userInfo)
        }
    },
}
</script>
<style lang="scss">

</style>