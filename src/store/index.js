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
    setLogin_user:
      // null
      {
        userId: '123456789000',
        userName: 'ベタaaaaaaaaaaaaaaaaa',
        mail: 'beta@gmail.com',
        password: 'betabeta'
      }
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
