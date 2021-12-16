import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

// const bcrypt = require('bcrypt');

let getDefaultState = () => {
  return {
    login_user: [
      // {
      //   userId: '123456789000',
      //   userName: 'ベタ',
      //   mail: 'beta@gmail.com',
      //   password: 'betabeta'
      // },
      // {
      //   userId: '111222333444',
      //   userName: 'ベタ２',
      //   mail: 'beta2@gmail.com',
      //   password: 'beta2beta2'
      // }
    ],
    setLogin_user:  null,//{
      //   userId: '123456789000',
      //   userName: 'ベタaaaaaaaaaaaaaaaaa',
      //   mail: 'beta@gmail.com',
      //   password: 'betabeta'
      // },
    costs: [],
    newPushCost:
      null,
      //     {
      //       costId: '123456789000',
      //       year: '2021',
      //       month: '10',
      //       color: '185,155,0',
      //       waterCost: 1200,
      //       eleCost: 1500,
      //       gasCost: 2000,
      //       totalCost: 4700,
      //       addDate: '2021/11/11',
      // },
    messagePass: ''
  }
}

export default new Vuex.Store({
  state: getDefaultState(),
  // state: {
  //   //usersテーブルの全て-----------------------------------
  //   login_user:[{
  //       userId: '123456789000',
  //       userName: 'ベタ',
  //       mail: 'beta@gmail.com',
  //       password: 'betabeta'
  //     },
  //     {
  //       userId: '111222333444',
  //       userName: 'ベタ２',
  //       mail: 'beta2@gmail.com',
  //       password: 'beta2beta2'
  //     }]
  //   ,
  //   //ログインしたユーザー---------------------------------------
  //   setLogin_user: null,
  //     // {
  //     //   userId: '123456789000',
  //     //   userName: 'ベタaaaaaaaaaaaaaaaaa',
  //     //   mail: 'beta@gmail.com',
  //     //   password: 'betabeta'
  //     // },
  //   costs: [
  //     {
  //           costId: '123456789000',
  //           year: '2021',
  //           month: '10',
  //           color: '185,155,0',
  //           waterCost: 1200,
  //           eleCost: 1500,
  //           gasCost: 2000,
  //           totalCost: 4700,
  //           addDate: '2021/11/11',
  //     },
  //     {
  //           costId: '123456789100',
  //           year: '2021',
  //           month: '11',
  //           color: '185,0,0',
  //           waterCost: 1000,
  //           eleCost: 1000,
  //           gasCost: 3000,
  //           totalCost: 5000,
  //           addDate: '2021/11/11',
  //     },
  //     {
  //           costId: '123456789110',
  //           year: '2021',
  //           month: '12',
  //           color: '185,120,0',
  //           waterCost: 1800,
  //           eleCost: 1600,
  //           gasCost: 2000,
  //           totalCost: 5400,
  //           addDate: '2021/11/11',
  //     }
  //   ],
  // },
  mutations: {
    reset(state) {
      Object.assign(state, getDefaultState())
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
    // logoutMut(state) {
    //   state.setLogin_user = null
    // },
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
    requestCostsMut(state, costs) {
      state.costs = costs
      console.log('requestCostsMut=> '+JSON.stringify( state.costs ))
    },
    addCostsMut(state, costs) {
      state.costs.push(costs)
      state.newPushCost = costs
      console.log('addCostsMut=> '+state.costs)
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
    //userテーブルの中身を全て取得-------------------------------
    requestUsers({commit}) {
      // let userData = []
      axios.get('/api/users')
        .then((res) => {
          commit('requestUsersMut',  res.data )
        })
        .catch((e) => alert(e))
    },
    //ログイン・使用するアカウントをstateに保持---------------------------------
    setLoginUser({ commit, state }, loginUser) {
      //vueファイルから移動-------------
      state.login_user.forEach(user => {
                if(
                    loginUser.mail === user.mail
                ) {
                  console.log('storeのloginUser=> '+JSON.stringify(loginUser.mail))
                  axios.post('/api/login', {
                    mail: loginUser.mail,
                    password: loginUser.password
                  })
                    .then((res) => {
                      console.log('ログインres=> ' + JSON.stringify(res))
                      if (res.data.msg != '') {
                        let messagePass = res.data.msg
                        commit('loginPassMessage', messagePass)
                        // commit('setLoginUserMut', res.data.user)
                        // console.log('res.data.user=> '+ JSON.stringify(res.data.user))
                      } else if(res.data.msg == '') {
                        // let messagePass = res.data.msg
                        // commit('loginPassMessage', messagePass)
                        commit('setLoginUserMut', res.data.user)
                        console.log('res.data.user=> '+ JSON.stringify(res.data.user))
                      } else {
                        console.log('失敗！！！')
                      }
                    })
                    .catch((e) => alert('storeのエラーだよ=> '+e))
                  
                  // if (bcrypt.compareSync(loginUser.password, user.password)) {
                  //       console.log('ログイン成功')
                  //       commit('setLoginUserMut' , loginUser)

                  //       // this.$store.dispatch('setLoginUser',user)
                  //       // this.$router.push('/')
                  // }else {
                  //   let messagePass = 'パスワードが違います'
                  //   commit('loginPassMessage', messagePass)
                  // }
                }else{
                    console.log('アカウントがありません(usersテーブルに一致するものがないです)')
                }
            });
    },
    //ログアウト---------------------------------------------------
    logout({ commit, dispatch }) {
      // commit('logoutMut')
      commit('reset')
      dispatch('requestUsers')
      // projectAuth.signOut()
      //   .then(() => {
      //     this.$router.push({ name: 'Form' })
      //   })
      //   .catch(err => console.log(err.message))
    },
    //usersテーブルにユーザー追加------------------------------------
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
    //Usersテーブルから完全削除-------------------------------------
    deleteUser({ commit, state }) {
      console.log('state.setLogin_user'+state.setLogin_user)
      const userId = state.setLogin_user.userId
      axios.delete('/api/deleteUser?id='+ userId)
        .then((res) => {
          console.log('res= ' + JSON.stringify(res))
          commit('deleteUsermut')
          this.dispatch('logout')
      })
    },
    //Usersテーブルのデータを編集・更新------------------------------
    updateUserName({ commit }, params) {
      console.log('store/params=> '+params)
      axios.post('/api/updateUser', {
        userId: params.userId,
        userName: params.userName
      }).then((res) => {
        console.log(res)
        commit('updateUserNameMut', params.userName)
      })
    },
    //Costsテーブルの中身を全て取得------------------------------------
    requestCosts({ commit }) {
      axios.get('/api/costs')
        .then((res) => {
          commit('requestCostsMut', res.data)
          console.log('requestCosts=> '+JSON.stringify(res.data))
        })
        .catch((e) => alert(e))
    },
    //Costsテーブルのデータを追加-----------------------------------
    addCosts({ commit }, costs) {
      axios.post('/api/addCosts', {
            costId: costs.costId,
            year: costs.year,
            month: costs.month,
            color: costs.color,
            waterCost: costs.waterCost,
            eleCost: costs.eleCost,
            gasCost: costs.gasCost,
            totalCost: costs.totalCost,
            addDate: costs.addDate,
      }).then((res) => {
        console.log('addCosts/res=> '+JSON.stringify(res))
        console.log('addCosts/costs=> '+JSON.stringify(costs))
        commit('addCostsMut', costs)
        this.dispatch('requestCosts')
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
    //   return    {userId: '123456789000',
    //     userName: 'ベタaaaaaaaaaaaaaaaaa',
    //     mail: 'beta@gmail.com',
    //     password: 'betabeta'
    //   }
    // },
    getCosts(state) {
      return state.costs;
    },
    // getCosts() {
    //   return [ {
    //         costId: '123456789000',
    //         year: '2021',
    //         month: '10',
    //         color: '185,155,0',
    //         waterCost: 1200,
    //         eleCost: 1500,
    //         gasCost: 2000,
    //         totalCost: 4700,
    //         addDate: '2021/11/11',
    //   },
    //   {
    //         costId: '123456789100',
    //         year: '2021',
    //         month: '11',
    //         color: '185,0,0',
    //         waterCost: 1000,
    //         eleCost: 1000,
    //         gasCost: 3000,
    //         totalCost: 5000,
    //         addDate: '2021/11/11',
    //   },
    //   {
    //         costId: '123456789110',
    //         year: '2021',
    //         month: '12',
    //         color: '185,120,0',
    //         waterCost: 1800,
    //         eleCost: 1600,
    //         gasCost: 2000,
    //         totalCost: 5400,
    //         addDate: '2021/11/11',
    //   }]
    // },
    getNewPushCost(state) {
      return state.newPushCost;
    },
    // getNewPushCost() {
    //     return  {
    //         costId: '123456789000',
    //         year: '2021',
    //         month: '10',
    //         color: '185,155,0',
    //         waterCost: 1200,
    //         eleCost: 1500,
    //         gasCost: 2000,
    //         totalCost: 4700,
    //         addDate: '2021/11/11',
    //   }
    // }
    getMessagePass( state ) {
      return state.messagePass;
    }
  },
  plugins: [createPersistedState(
    { // ストレージのキーを指定
      key: 'ucapp_node_mysql',
      // ストレージの種類を指定
      storage: window.sessionStorage
    }
)]
})
