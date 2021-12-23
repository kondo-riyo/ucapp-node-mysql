import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

let costsDefaultState = () => {
    return {
        allCosts: [],
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
            console.log('store/costsのreset')
        },
        requestCostsMut(state, costs) {
        state.allCosts = costs
        },
        addCostsMut(state, costs) {
        state.costs.push(costs)
        state.newPushCost = costs
        },
        updateCostMut(cost) {
            console.log(cost)
        },
        choiceCostsMut(state, costs) {
            state.costs = costs
        }
    },
    actions: {
        //Costsテーブルの中身を全て取得------------------------------------
        requestCosts({ commit }) {
        axios.get('/api/costs')
            .then((res) => {
            commit('requestCostsMut', res.data)
            })
            .catch((e) => alert(e))
        },
        //Login後にuserIdが一致するcostのみ取得---------------------------
        choiceCosts({ commit, state }, userId) {
            let choice = state.allCosts.filter(cost => cost.userId === userId)
            console.log(state.allCosts)
            console.log('store/choice=> ' + JSON.stringify(choice))
            commit('choiceCostsMut', choice)
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
                userId: costs.userId,
        }).then((res) => {
            console.log(res)
            commit('addCostsMut', costs)
            this.dispatch('requestCosts')
        })
        },
        updateCost({ commit }, params) {
            axios.post('/api/updateCost', {
                costId: params.costId,
                year: params.year,
                month: params.month,
                color: params.color,
                waterCost: params.waterCost,
                gasCost: params.gasCost,
                eleCost: params.eleCost,
                totalCost: params.totalCost,
                addDate: params.addDate,
                userId: params.userId,
            }).then((res) => {
                console.log(res)
                commit('updateCostMut', params)
            })

        },
        logout({ commit }) {
            commit('reset')
        }
    },
    getters: {
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
        //         userId: '123456789000'
        //   },
        //   {
        //         costId: '123456789100',
        //         year: '2020',
        //         month: '11',
        //         color: '185,0,0',
        //         waterCost: 1000,
        //         eleCost: 1000,
        //         gasCost: 3000,
        //         totalCost: 5000,
        //         addDate: '2021/11/11',
        //         userId: '123456789000'
        //   },
        //   {
        //         costId: '123456789200',
        //         year: '2019',
        //         month: '8',
        //         color: '185,0,0',
        //         waterCost: 1000,
        //         eleCost: 1600,
        //         gasCost: 2000,
        //         totalCost: 5000,
        //         addDate: '2021/11/11',
        //         userId: '123456789000'
        //   },
        //   {
        //         costId: '123456789300',
        //         year: '2020',
        //         month: '9',
        //         color: '185,0,0',
        //         waterCost: 1500,
        //         eleCost: 1000,
        //         gasCost: 2100,
        //         totalCost: 5000,
        //         addDate: '2021/11/11',
        //         userId: '123456789000'
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
        //       addDate: '2021/11/11',
        //         userId: '123456789000'
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
    }
}