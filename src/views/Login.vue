<template>
    <div class="bg__img flex">
        <div class="card__login fadeIn__base">
                <div class="flex">
                    <div class="input__group">
                        <div class="login__input">
                                <label class="login__input__ef" >
                                    <input v-model="mail" type="text" placeholder="MailAddress">
                                </label>
                        </div>
                        <div class="err__text">{{messageMail}}</div>
                        <div class="login__input">
                                <label class="login__input__ef" >
                                    <input v-model="password" type="password" placeholder="PassWord">
                                </label>
                        </div>
                        <div class="err__text">{{messagePass}}</div>
                    </div>
                    <div>
                        <button 
                         @click="login" 
                         class="button__circle__stitch"
                        >
                            LOGIN
                        </button>
                    </div>
                </div>
            <div @click="sendNewMember" class="link__login">
                <button>
                    新規会員登録はこちら
                </button>
            </div>
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
            messageMail: '',
            messagePass: ''
        }
    },
    computed:{
        login_user() {
            return this.$store.getters['users/login_user']
        },
        passMessage() {
            return this.$store.getters['users/getMessagePass']
        }
    },
    updated() {
        if(this.$store.getters['users/setLogin_user']) {
            return this.$router.push('/')
        }
        if(this.passMessage !='' ) {
            this.messagePass = this.passMessage
            console.log(this.passMessage)
        }
    },
    methods: {
        login() {
            console.log('ログイン')
            if(this.mail != '' ) {
                if(this.password != '') {
                    // if(this.login_user.mail === this.mail) {
                        this.login_user.forEach(user => {
                            if(user.mail === this.mail) {
                                let loginUser = {mail: this.mail, password: this.password}
                                this.$store.dispatch('users/setLoginUser', loginUser)
                                // console.log(loginUser)
                            }else {
                                console.log('Login.vue アカウントがありません(usersテーブルに一致するものがないです)')
                            }
                        });
                }else {
                    this.messagePass = 'パスワードを入力してください'
                }
            }else {
                this.messageMail = 'メールアドレスの入力が必要です'
            }
        },
        sendNewMember() {
            this.$router.push('/newmember')
        }
    },
}
</script>
<style lang="scss">
@import '../scss/input.scss';
@import '../scss/button.scss';
@import '../scss/animation.scss';

.bg__img {
    // background-image: url(../assets/bg_orange.webp);
    background-image: url(../assets/leaf2__back.jpg);
    background-size: cover;
    width: 100%;
    height: 100%;
    // margin-top: -30px;
}
.flex {
    display: flex;
    align-items: center;
    justify-content: center;
}
.link__login {
    text-align: center; 
    color: #ef6158;
    font-size: 15px;
    font-weight: bold;
    margin: 0px 70px;
    padding: 5px 0px;
    border-radius: 10px;
    transition: 0.5s;
}
.link__login:hover {
    background-color: #ef625893;
    color: white;
}
.input__group {
    width: 80%;
}
</style>