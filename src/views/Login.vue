<template>
    <div>
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
        <div>
            <router-link to="/newmember">
             新規会員登録はこちら
            </router-link>
        </div>
    </div>    
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            mail:'',
            password:'',
            messagePass: ''
        }
    },
    computed:{
        login_user() {
            return this.$store.state.login_user
        }
    },
    methods: {
        login() {
            // this.$router.push('/')
            this.$store.state.login_user.forEach(user => {
                if(
                    this.mail === user.mail &&
                    this.password === user.password
                ){
                    this.$store.dispatch('setLoginUser',user)
                    this.$router.push('/')
                }else if(
                    this.mail ===user.mail
                ){
                    this.messagePass = 'パスワードが違います'
                    console.log(this.messagePass)
                }else{
                    console.log('アカウントがありません(usersテーブルに一致するものがないです)')
                }
            });
        }
    },
}
</script>
<style lang="scss">

</style>