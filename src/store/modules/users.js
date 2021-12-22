import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

let usersDefaultState = () => {
    return {
        login_user: [],
        setLogin_user: null,
        // setLogin_user: {
        //     userId: '123456789000',
        //     userName: 'ベタaaaaaaaaaaaaaaaaa',
        //     mail: 'beta@gmail.com',
        //     password: 'betabeta'
        // },
        messagePass: ''
    }
}

export default {
    namespaced: true,
    state: usersDefaultState(),
    mutations: {
        //stateの値をリセットする
        reset(state) {
        Object.assign(state, usersDefaultState())
        },
        requestUsersMut(state, user) {
        state.login_user = user
        },
        setLoginUserMut(state, user) {
        state.setLogin_user = user
        },
        loginPassMessage( state, messagePass) {
        state.messagePass = messagePass
        },
        sendNewMemberMut() {
        console.log('sendNewMemberMut')
        },
        deleteUserMut() {
        console.log('deleteUserMut')
        },
        updateUserNameMut(state, userName) {
        state.setLogin_user.userName = userName
        console.log('updateUserNameMut')
        },
    },
    actions: {
        //userテーブルの中身を全て取得-------------------------------
        requestUsers({ commit }) {
            // let userData = []
            axios.get('/api/users')
                .then((res) => {
                    commit('requestUsersMut', res.data)
                })
                .catch((e) => alert(e))
        },
        //ログイン・使用するアカウントをstateに保持---------------------------------
        setLoginUser({ state, commit }, loginUser) {
            //vueファイルから移動-------------
            state.login_user.forEach(user => {
                if (
                    loginUser.mail === user.mail
                ) {
                    console.log('storeのloginUser=> ' + JSON.stringify(loginUser.mail))
                    axios.post('/api/login', {
                        mail: loginUser.mail,
                        password: loginUser.password
                    })
                        .then((res) => {
                            console.log('ログインres=> ' + JSON.stringify(res.data))
                            console.log(loginUser.password + ' + ' + res.data.password)
                            if (res.data.msg != '') {
                                let messagePass = res.data.msg
                                commit('loginPassMessage', messagePass)
                                // commit('setLoginUserMut', res.data.user)
                                // console.log('res.data.user=> '+ JSON.stringify(res.data.user))
                            } else if (res.data.msg === '') {
                                commit('setLoginUserMut', res.data.user)
                                console.log('res.data.user=> ' + JSON.stringify(res.data.user))
                            } else {
                                console.log('失敗！！！')
                            }
                        })
                        .catch((e) => alert('storeのエラーだよ=> ' + e))
                } else {
                    console.log('アカウントがありません(usersテーブルに一致するものがないです)')
                }
            });
        },
        //ログアウト---------------------------------------------------
        logout({ commit, dispatch }) {
            // commit('logoutMut')
            commit('reset')
            dispatch('requestUsers')
        },
        //usersテーブルにユーザー追加------------------------------------
        sendNewMember({ commit }, params) {
            console.log('userInfo=> ' + params)
            axios.post('/api/signIn', {
                userId: params.userId,
                userName: params.userName,
                mail: params.mail,
                password: params.password
            }).then((res) => {
                console.log('res= ' + JSON.stringify(res))
                commit('sendNewMemberMut')
                this.dispatch('requestUsers')
                // this.$router.push('/login')
            })
        },
        //Usersテーブルから完全削除-------------------------------------
        deleteUser({ commit, state }) {
            console.log('state.setLogin_user' + state.setLogin_user)
            const userId = state.setLogin_user.userId
            axios.delete('/api/deleteUser?id=' + userId)
                .then((res) => {
                    console.log('res= ' + JSON.stringify(res))
                    commit('deleteUsermut')
                    this.dispatch('logout')
                })
        },
        //Usersテーブルのデータを編集・更新------------------------------
        updateUserName({ commit }, params) {
            console.log('store/params=> ' + params)
            axios.post('/api/updateUser', {
                userId: params.userId,
                userName: params.userName
            }).then((res) => {
                console.log(res)
                commit('updateUserNameMut', params.userName)
            })
        },
    },
    getters: {
        login_user(state) {
        return state.login_user
        },
        // login_user() {
        //   return [{
        //     userId: '123456789000',
        //     userName: 'ベタ',
        //     mail: 'beta@gmail.com',
        //     password: 'betabeta'
        //   },
        //   {
        //     userId: '111222333444',
        //     userName: 'ベタ２',
        //     mail: 'beta2@gmail.com',
        //     password: 'beta2beta2'
        //   }]
        // },
        // setLogin_user(state) {
        // return state.setLogin_user
        // },
        setLogin_user() {
            return{
            userId: '123456789000',
            userName: 'ベタaaaaaaaaaaaaaaaaa',
            mail: 'beta@gmail.com',
            password: 'betabeta'
          }
        },
        getMessagePass( state ) {
        return state.messagePass;
        }
    }

}