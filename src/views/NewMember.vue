<template>
    <div class="bg__img flex">
        <div class="card__login fadeIn__base">
            <div class="flex">
                <div class="input__group">
                    <div class="login__input">
                        <label class="login__input__ef" >
                            <input v-model="user_name" type="text" placeholder="Name">
                        </label>
                    </div>
                    <div v-show="validate_name">名前は10文字以下で入力してください</div>
                    <div class="login__input">
                        <label class="login__input__ef" >
                            <input v-model="mail" type="text" placeholder="MailAddress">
                        </label>
                    </div>
                    <div v-show="validate_mail">メールアドレスを入力してください</div>
                    <div class="login__input">
                        <label class="login__input__ef" >
                            <input v-model="password" type="password" placeholder="PassWord">
                        </label>
                    </div>
                    <div v-show="validate_pass">半角英数字６桁以上を入力してください</div>
                </div>
                <div>
                    <button @click="sendNewMember" class="button__circle__stitch">
                        登録
                    </button>
                </div>
            </div>
            <div @click="sendLogin" class="link__newmember">
                <button>
                    会員登録がお済みの方はこちら
                </button>
            </div>
        </div>
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
            messagePass: '',
            validate_name: false,
            validate_mail: false,
            validate_pass: false
        }
    },
    // computed: {
    //     validate(user) {
    //         console.log(user)
    //         return user.match(/[0-9]{3,10}/g)
    //     }
    // },
    methods: {
        sendNewMember() {
            //バリデーション----------------------------------------------------
            this.validate_name = false;
            this.validate_mail = false;
            this.validate_pass = false;
            let mail_check = this.mail.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/)
            let pass_check = this.password.match(/[A-Za-z0-9]{6,}/g)
            if(this.user_name.length > 0 && this.user_name.length <= 10) {
                if(mail_check) {
                    if(pass_check) {
                        //ランダムな文字列を作成してuserIdを与える------------------------------
                        this.user_id = Math.floor(100000000000 + Math.random() * 900000000000)
                        const userInfo = {
                            userId: this.user_id,
                            userName: this.user_name,
                            mail: this.mail,
                            password: this.password
                        }
                        // console.log(userInfo)
                        if(confirm('新規アカウント登録してよろしいですか？')){
                            this.$store.dispatch('users/sendNewMember', userInfo)
                            this.$router.push('/')
                        }
                    }else {
                        this.validate_pass = true
                    }
                }else {
                    this.validate_mail = true
                }
            }else {
                this.validate_name = true
            }

        },
        sendLogin() {
            this.$router.push('/')
        },
    }
}
</script>
<style lang="scss">
@import '../scss/input.scss';
@import '../scss/button.scss';
@import '../scss/animation.scss';
@import '../scss/card.scss';

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
.link__newmember {
    text-align: center;
    color: #ef6158;
    font-size: 15px;
    font-weight: bold;
    margin: 0px 70px;
    padding: 5px 0px;
    transition: 0.5s;
}
.link__newmember:hover {
    background-color: #ef625893;
    color: white;
    border-radius: 10px;
}

// .link__newmember {
//     display: block;
//     text-align: center;
//     font: sans-serif #673a15;
// }
// .link__newmember p:after {
//     content: '';
// 	position: absolute;
// 	bottom: 0;
// 	left: 0;
// 	width: 0;
// 	height: 10px;
// 	background-color: rgba(185,155,0,0.5);
// 	transition: width 0.3s;
// }
// .link__newmember p:hover::after {
//     width: 100%;
// }
.input__group {
    width: 80%;
}

</style>