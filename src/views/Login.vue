<template>
    <div class="">
        <div class="card__login fadeIn__base">
            <!-- <ValidationObserver v-slot="{ invalid }"> -->
                <div class="flex">
                    <div class="input__group">
                        <div class="cp_iptxt">
                            <!-- <ValidationProvider
                            v-slot="{ errors }"
                            name="メールアドレス"
                            rules="required|email"
                            > -->
                                <input v-model="mail" class="ef" type="text" placeholder="">
                                <label>MailAddress</label>
                                <span class="focus_line"></span>
                                <!-- <span>
                                    {{ errors[0] }}
                                </span> -->
                            <!-- </ValidationProvider> -->
                        </div>
                        <div class="err__text">{{messageMail}}</div>
                        <div class="cp_iptxt">
                            <input v-model="password" class="ef" type="password" placeholder="">
                            <label>PassWord</label>
                            <span class="focus_line"></span>
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
            <!-- </ValidationObserver> -->
            <div @click="sendNewMember" class="link__login">
                <button>
                    新規会員登録はこちら
                </button>
            </div>
        </div>

    </div>    
</template>
<script>
// import { ValidationProvider, ValidationObserver } from 'vee-validate';

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
    // components: {
    //     ValidationProvider,
    //     ValidationObserver,
    // },
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
                    let loginUser = {mail: this.mail, password: this.password}
                    this.$store.dispatch('users/setLoginUser', loginUser)
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
@import '../scss/animation.scss';

// .bg__flower {
//     background-image: url(../assets/bg_orange.webp);
//     width: 100%;
//     height: auto;
// }
// .card__login {
//     width: 50%;
//     min-width: 500px;
//     height: auto;
//     background-color: #c2baaf4a;
//     padding: 20px;
//     // margin: 30px 10px;
//     margin:0 auto;
//     //border---------------------------
//     border: 3px solid #c2baaf;
//     border-radius: 10px;
// }

.flex {
    display: flex;
    align-items: center;
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