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
        //     password: '$2b$10$.jEOqyGzNniOmJgG58M2kOQQAY9KRdvn4LbHfvonjIZ7OYU9LXS4u'
        // },
        messagePass: '',
        showContent: false
    }
}

export default {
    namespaced: true,
    state: usersDefaultState(),
    mutations: {
        //stateの値をリセットする
        reset(state) {
            console.log('store/usersのreset')
        Object.assign(state, usersDefaultState())
        },
        requestUsersMut(state, user) {
            state.login_user = user
            console.log(state.login_user)
        },
        setLoginUserMut(state, user) {
            state.setLogin_user = user
            console.log('setLogin_user')
        },
        loginPassMessage( state, messagePass) {
        state.messagePass = messagePass
        },
        sendNewMemberMut(state, params) {
            console.log(params)
            state.login_user.push(params)
        },
        deleteUserMut() {
        console.log('deleteUserMut')
        },
        updateUserNameMut(state, userName) {
        state.setLogin_user.userName = userName
        console.log('updateUserNameMut')
        },
        modalOpenShowContent(state, show) {
            state.showContent = show
            console.log(state.showContent)
        }
    },
    actions: {
        //userテーブルの中身を全て取得-------------------------------
        async requestUsers({ commit }) {
            // let userData = []
            await axios.get('/api/users')
                .then((res) => {
                    commit('requestUsersMut', res.data)
                })
                .catch((e) => alert(e))
        },
        //ログイン・使用するアカウントをstateに保持---------------------------------
        async setLoginUser({ commit, dispatch}, loginUser) {
            await axios.post('/api/login', {
                mail: loginUser.mail,
                password: loginUser.password
                })
                .then(async (res) => {
                    if (res.data.msg != '') {
                        let messagePass = res.data.msg
                        commit('loginPassMessage', messagePass)
                    } else if (res.data.msg === '') {
                        // await dispatch('costs/requestCosts' )
                        // await dispatch('costs/choiceCosts', res.data.user[0].userId, { root: true })
                        await dispatch('costs/choiceCosts', res.data.user[0], { root: true })
                        // commit('setLoginUserMut', res.data.user)
                        } else {
                        console.log('失敗！！！')
                    }
                })
                // .catch((e) => alert('storeのエラーだよ=> ' + e))
        },
        //ログアウト---------------------------------------------------
        async logout({ commit, dispatch, state }) {
            // commit('logoutMut')
            await commit('reset')
            console.log(state)
            dispatch('requestUsers')
            // commit('costs/reset')
        },
        //usersテーブルにユーザー追加------------------------------------
        sendNewMember({ commit }, params) {
            axios.post('/api/signIn', {
                userId: params.userId,
                userName: params.userName,
                mail: params.mail,
                password: params.password
            }).then((res) => {
                console.log(res)
                console.log(params)
                commit('sendNewMemberMut', params)
                // dispatch('requestUsers')
                // this.$router.push('/login')
            })
        },
        //Usersテーブルから完全削除-------------------------------------
        deleteUser({ commit, state }) {
            const userId = state.setLogin_user.userId
            axios.delete('/api/deleteUser?id=' + userId)
                .then((res) => {
                    console.log(res)
                    commit('deleteUsermut')
                    this.dispatch('logout')
                })
        },
        //Usersテーブルのデータを編集・更新------------------------------
        updateUserName({ commit }, params) {
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
        setLogin_user(state) {
        return state.setLogin_user
        },
        // setLogin_user() {
        //     return{
        //     userId: '123456789000',
        //     userName: 'ベタaaaaaaaaaaaaaaaaa',
        //     mail: 'beta@gmail.com',
        //     password: 'betabeta'
        //   }
        // },
        getMessagePass( state ) {
        return state.messagePass;
        }
    }

}