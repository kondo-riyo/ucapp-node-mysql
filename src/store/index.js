import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    //usersテーブルの全て-----------------------------------
    login_user:
      // []
      [{
        userId: '123456789000',
        userName: 'ベタ',
        mail: 'beta@gmail.com',
        password: 'betabeta'
      },
      {
        userId: '111222333444',
        userName: 'ベタ２',
        mail: 'beta2@gmail.com',
        password: 'beta2beta2'
      }]
    ,
    //ログインしたユーザー---------------------------------------
    setLogin_user: null
      // {
      //   userId: '123456789000',
      //   userName: 'ベタaaaaaaaaaaaaaaaaa',
      //   mail: 'beta@gmail.com',
      //   password: 'betabeta'
      // }
      // costs:[],
//     login_user: null,
  },
  mutations: {
    requestUsersMut(state, user) {
      state.login_user = user
    },
    setLoginUserMut(state, user) {
      state.setLogin_user = user
    },
    logoutMut(state) {
      state.setLogin_user = null
    },
    sendNewMemberMut() {
      console.log('sendNewMemberMut')
    },
    deleteUserMut() {
      console.log('deleteUserMut')
    }
//     deleteLoginUser(state){
//       state.login_user = null
//     },
//     addMonth(state, {id, month}){
//       month.id =id;
//       state.costs.push(month)
//     },
//     updateMonth(state,{id,month}){
//       const index =state.costs.findIndex((month)=>month.id ===id);
//       state.costs[index] = month;
//     },
//     deleteMonth(state, {id}){
//       const index = state.costs.findIndex(month => month.id === id)
//       state.costs.splice(index,1)
//     }
  },
  actions: {
    requestUsers({commit}) {
      // let userData = []
      axios.get('/api/users')
        .then((res) => {
          commit('requestUsersMut',  res.data )
        })
        .catch((e) => alert(e))
    },
    setLoginUser({ commit }, user) {
      console.log('storeにいるよ')
      commit('setLoginUserMut' , user)
    },
    logout({ commit }) {
      commit('logoutMut')
    },
    sendNewMember({ commit }, params) {
      console.log('userInfo=> ' + params)
      axios.post('/api/signIn',  {
        userId: params.userId,
        userName: params.userName,
        mail: params.mail,
        password: params.password
    }).then((res) => {
        console.log('res= ' + JSON.stringify(res))
      commit('sendNewMemberMut')
      this.dispatch('requestUsers')
      this.$router.push('/login')
      })
    },
    deleteUser({ commit, state }) {
      console.log('state.setLogin_user'+state.setLogin_user)
      const userId = state.setLogin_user.userId
      axios.delete('/api/deleteUser?id='+ userId)
        .then((res) => {
          console.log('res= ' + JSON.stringify(res))
          commit('deleteUsermut')
          this.dispatch('logout')
      })
    }
//     deleteLoginUser ({commit}){
//       commit ('deleteLoginUser')
//     },
//     fetchMonths({getters,commit}){
//     },
//     addMonth({getters, commit},month){
//     },
//     updateMonth({getters,commit},{id,month}){
//     },
//     deleteMonth({getters,commit},{id}){
//     }
  },
  modules: {
  },
  getters: {
//     uid: (state)=>(state.login_user ? state.login_user.uid : null),
//     getMonthById: (state => (id) =>
//     state.costs.find((month)=> month.id === id))
  },
  plugins: [createPersistedState(
    { // ストレージのキーを指定
      key: 'ucapp_node_mysql',
      // ストレージの種類を指定
      storage: window.sessionStorage
    }
)]
})
// {
//   "data": "",
//   "status": 200,
//   "statusText": "OK",
//   "headers": {
//     "connection": "keep-alive",
//       "content-length": "0",
//       "date": "Mon, 06 Dec 2021 04:20:03 GMT",
//       "keep-alive": "timeout=5",
//       "x-powered-by": "Express"
//   },
//   "config": {
//     "url": "/api/signIn",
//     "method": "post",
//     "data": "{\"userId\":\"111222333445\",\"userName\":\"サーバーストア\",\"mail\":\"server_store@gmail.com\",\"password\":\"serverstore\"}",
//     "headers": {
//     "Accept": "application/json, text/plain, */*",
//     "Content-Type": "application/json;charset=utf-8"
//    },
  //   "transformRequest": [null],
  //   "transformResponse": [null],
  //   "timeout": 0,
  //   "xsrfCookieName": "XSRF-TOKEN",
  //   "xsrfHeaderName": "X-XSRF-TOKEN",
  //   "maxContentLength": -1,
  //   "maxBodyLength": -1
//   },
//   "request": { }
// }