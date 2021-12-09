<template>
    <div>
        <div class="card__login">
            <div class="flex">
                <div class="input__group">
                    <div class="cp_iptxt">
                        <input v-model="user_name" class="ef " type="text" placeholder="">
                        <label>Name</label>
                        <span class="focus_line"></span>
                    </div>
                    <div class="cp_iptxt">
                        <input v-model="mail" class="ef" type="text" placeholder="">
                        <label>MailAddress</label>
                        <span class="focus_line"></span>
                    </div>
                    <div class="cp_iptxt">
                        <input v-model="password" class="ef" type="password" placeholder="">
                        <label>PassWord</label>
                        <span class="focus_line"></span>
                    </div>
                </div>
                <div>
                    <button @click="sendNewMember" class="button__circle__stitch">
                        登録
                    </button>
                </div>
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
@import '../scss/input.scss';
@import '../scss/button.scss';

.card__login {
    width: 50%;
    min-width: 500px;
    height: auto;
    background-color: #c2baaf4a;
    padding: 20px;
    margin: 30px 10px;
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