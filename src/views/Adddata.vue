<template>
<div class="base">
    <div class="basecard">
    <v-card elevation="10" shaped v-for="(cost,index) in newcosts" :key="index">
        <v-card-text>
        <div>
            <p class="title_fontsize">{{cost.year}}年{{cost.month}}月
                <router-link :to="{name: 'month_edit',params: {month_id:cost.id}}" class="underline">
                    <v-icon small class="mr-2">mdi-pencil</v-icon>
                </router-link>
                <v-icon small class="mr-2" @click="deleteConfirm(cost.id)">mdi-delete</v-icon>
            </p>
        </div>
        <tr>
            <td class="main_fontsize">水道</td>
            <td></td>
            <td><div class="main_fontsize">{{cost.watercost}} 円</div></td>
        </tr>
        <tr>
            <td class="main_fontsize">ガス</td>
            <td></td>
            <td><div class="main_fontsize">{{cost.gascost}} 円</div></td>
        </tr>
        <tr>
            <td class="main_fontsize">電気</td>
            <td></td>
            <td><div class="main_fontsize">{{cost.elecost}} 円</div></td>
        </tr>
        <v-divider class="mx-4"></v-divider>
        <tr>
            <td class="main_fontsize">合計</td>
            <td><div class="main_fontsize">{{cost.watercost + cost.gascost + cost.elecost}} 円</div></td>
            <td></td>
        </tr>
        </v-card-text>
    </v-card>
    </div>
</div>
</template>
<script>
import store from '../store'
import {mapState,mapActions} from 'vuex'
export default {
    name: 'Adddata',
    store,
    data(){
        return{
            newcosts:[],
        }
    },
    created(){
        this.newCost()
    },
    computed:{
        ...mapState(["costs"])
    },
    methods:{
      newCost(){
      this.newcosts=[...this.costs].sort((a, b) => a.month - b.month);
      console.log(this.newcosts)
      return this.newcosts
      },
      deleteConfirm(id){
          if (confirm("削除してよろしいですか？")){
              this.deleteMonth({id})
          }
      },
      ...mapActions(["deleteMonth"])
    }
}
</script>

<style scoped>
/* .base{ */
    /* min-width: 500px; */
    /* background-color: whitesmoke; */
/* } */
.basecard{
    display: flex;
    max-width: 400px;
    flex-direction: column;
    justify-content: center;
    /* align-items: center; */
}
div{
    text-align: center;
}
.title_fontsize{
    font-size: 20px;
    font-family: 'Comic Sans MS';
}
.main_fontsize{
    font-size: 15px;
    font-family: 'Comic Sans MS';
}
.underline{
    text-decoration: none;
}
</style>
