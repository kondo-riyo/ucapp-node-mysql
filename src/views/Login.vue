<template>
    <div class="">
        <div class="card__login">
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
                        <div class="cp_iptxt">
                            <input v-model="password" class="ef" type="password" placeholder="">
                            <label>PassWord</label>
                            <span class="focus_line"></span>
                        </div>
                    </div>
                    <div>
                        <button 
                         @click="login" 
                         :disabled="invalid"
                         class="button__circle__stitch"
                        >
                            LOGIN
                        </button>
                    </div>
                </div>
            <!-- </ValidationObserver> -->
            <div class="link__newmember">
                <router-link to="/newmember">
                新規会員登録はこちら
                </router-link>
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
            messagePass: ''
        }
    },
    // components: {
    //     ValidationProvider,
    //     ValidationObserver,
    // },
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
                    // this.$store.dispatch('requestCosts')
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
@import '../scss/input.scss';
@import '../scss/button.scss';

// .bg__flower {
//     background-image: url(../assets/bg_orange.webp);
//     width: 100%;
//     height: auto;
// }
.card__login {
    width: 50%;
    min-width: 500px;
    height: auto;
    background-color: #c2baaf4a;
    padding: 20px;
    // margin: 30px 10px;
    margin:0 auto;
    //border---------------------------
    border: 3px solid #c2baaf;
    border-radius: 10px;
}
.flex {
    display: flex;
    align-items: center;
}
.link__newmember {
    display: block;
    text-align: center;
    font: sans-serif #673a15;
}
.link__newmember p:after {
    content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	width: 0;
	height: 10px;
	background-color: rgba(185,155,0,0.5);
	transition: width 0.3s;
}
.link__newmember p:hover::after {
    width: 100%;
}
.input__group {
    width: 80%;
}
</style>