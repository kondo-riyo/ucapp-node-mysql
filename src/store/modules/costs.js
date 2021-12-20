import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

let costsDefaultState = () => {
    return {
        costs: [],
        newPushCost: null,
        // newPushCost: {
        //         costId: '123456789000',
        //         year: '2021',
        //         month: '10',
        //         color: '185,155,0',
        //         waterCost: 1200,
        //         eleCost: 1500,
        //         gasCost: 2000,
        //         totalCost: 4700,
        //         addDate: '2021/11/11'
        // }
    }
}

export default {
    namespaced: true,
    state: costsDefaultState(),
    mutations: {
        reset(state) {
        Object.assign(state, costsDefaultState())
        },
        requestCostsMut(state, costs) {
        state.costs = costs
        console.log('requestCostsMut=> '+JSON.stringify( state.costs ))
        },
        addCostsMut(state, costs) {
        state.costs.push(costs)
        state.newPushCost = costs
        console.log('addCostsMut=> '+state.newPushCost)
        }
    },
    actions: {
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
    },
    getters: {
        // getCosts(state) {
        //     console.log('state.costs=> '+state.costs)
        // return state.costs;
        // },
        getCosts() {
          return [ {
                costId: '123456789000',
                year: '2021',
                month: '10',
                color: '185,155,0',
                waterCost: 1200,
                eleCost: 1500,
                gasCost: 2000,
                totalCost: 4700,
                addDate: '2021/11/11',
          },
          {
                costId: '123456789100',
                year: '2021',
                month: '11',
                color: '185,0,0',
                waterCost: 1000,
                eleCost: 1000,
                gasCost: 3000,
                totalCost: 5000,
                addDate: '2021/11/11',
          },
          {
                costId: '123456789110',
                year: '2021',
                month: '12',
                color: '185,120,0',
                waterCost: 1800,
                eleCost: 1600,
                gasCost: 2000,
                totalCost: 5400,
                addDate: '2021/11/11',
          }]
        },
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
    }
}