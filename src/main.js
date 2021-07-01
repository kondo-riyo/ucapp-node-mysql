import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase'
Vue.config.productionTip = false

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuALZr9BQ_T62AyT2WcjGJqyWgbQGaUY0",
  authDomain: "ucapp-7c28c.firebaseapp.com",
  projectId: "ucapp-7c28c",
  storageBucket: "ucapp-7c28c.appspot.com",
  messagingSenderId: "743134399651",
  appId: "1:743134399651:web:115d3b72066a9fba880316",
  measurementId: "G-R9K4KJG87T"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
