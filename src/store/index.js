import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    costs:[
      // {
      //   month:1,
      //   water:1000,
      //   gas:1200,
      //   ele:2000
      // },
      // {
      //   month:2,
      //   water:1200,
      //   gas:1100,
      //   ele:2400
      // },
      // {
      //   month:3,
      //   water:1700,
      //   gas:1200,
      //   ele:2080
      // },
      // {
      //   month:4,
      //   water:1030,
      //   gas:1900,
      //   ele:1700
      // }
    ],
    // month:[
    //   1,2,3,4
    // ]
    login_user: null,
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user
    },
    deleteLoginUser(state){
      state.login_user = null
    },
    addMonth(state, {id, month}){
      month.id =id;
      state.costs.push(month)
    },
    updateMonth(state,{id,month}){
      const index =state.costs.findIndex((month)=>month.id ===id);
      state.costs[index] = month;
    },
    deleteMonth(state, {id}){
      const index = state.costs.findIndex(month => month.id === id)
      state.costs.splice(index,1)
    }
  },
  actions: {
    setLoginUser({commit} , user){
      commit('setLoginUser' ,user)
    },
    login(){
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout(){
      firebase.auth().signOut()
    },
    deleteLoginUser ({commit}){
      commit ('deleteLoginUser')
    },
    fetchMonths({getters,commit}){
      firebase.firestore().collection(`users/${getters.uid}/costs`).get().then(snapshot=>{
        snapshot.forEach(doc => commit('addMonth',{id:doc.id, month: doc.data()}))
      })
    },
    addMonth({getters, commit},month){
      if(getters.uid){
        firebase
        .firestore()
        .collection(`users/${getters.uid}/costs`)
        .add(month)
        .then((doc) =>{
          commit("addMonth", {id: doc.id, month})
        })
      }
    },
    updateMonth({getters,commit},{id,month}){
      if(getters.uid){
        firebase
        .firestore()
        .collection(`users/${getters.uid}/costs`)
        .doc(id)
        .update(month)
        .then(()=>{
          commit("updateMonth",{id,month})
        })
      }
    },
    deleteMonth({getters,commit},{id}){
      if(getters.uid){
        firebase
        .firestore()
        .collection(`users/${getters.uid}/costs`)
        .doc(id)
        .delete()
        .then(()=>{
          commit('deleteMonth',{id})
        })
      }
    }
  },
  modules: {
  },
  getters: {
    uid: (state)=>(state.login_user ? state.login_user.uid : null),
    getMonthById: (state => (id) =>
    state.costs.find((month)=> month.id === id))
  }
})
