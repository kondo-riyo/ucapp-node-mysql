<template>
    <div id="overlay" @click.self="$emit('close')">
        <div id="content">
            <div 
             v-show="orderInfo.length === 0"
             class="yearSelect__not"
            >
                ※ まだ登録された光熱費はありません
            </div>
            <div v-show="orderInfo.length !== 0">
                <div class="title__year">YEAR</div>
                <div v-for="year in orderInfo" :key="year">
                    <!-- <router-link :to="{name: 'allList_year',params: {year:year}}"> -->
                        <div class="card__year" @click="sendYear(year)">
                            <div v-if="nowYear==year" class="text__now">NOW</div>
                            <div>
                                {{year}}
                            </div>
                        </div>
                    <!-- </router-link> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['orderInfo'],
    computed: {
        nowYear() {
            let date = new Date();
            let nowYear = date.getFullYear();
            return nowYear;
        }
    },
    methods: {
        sendYear(year) {
            this.$router.push({name: 'allList_year',params: {year:year}})
        }
    },
}
</script>
<style lang="scss">
#overlay {
  /*要素を重ねた時の順番*/
  z-index: 1;
  /*画面全体を覆う設定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.063);
  /*画面の右側に要素を表示させる設定*/
//   padding-top: 150px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
#content {
  z-index: 2;
  width: 20%;
  max-width: 600px;
  min-width: 350px;
  height: 100%;
  padding: 0;
  background-color: rgba(240, 233, 224, 0.597);
  color: #673A15;
  box-sizing: border-box;
  text-align: center;
  font-weight: bold;
  //アニメーション-----------------------
//   margin-top: 150px;
  padding-top: 150px;

  animation-name: slideIn ;
  animation-duration: 1s;

}
@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(64px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.title__year {
    padding: 10px;
    font-size: 20px;
}
.card__year {
    background-color: #c2baafd4;
    color: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin: 5px 30px;
    border-radius: 10px;
    // box-sizing: border-box;
    transition: 0.5s;
    cursor: pointer;
}
.card__year:hover {
    background-color: #fcfcfcab;
    color: #673A15;
    // border: 3px solid #c2baaf;
    // box-sizing: border-box;
    filter: drop-shadow(0 0 0.75rem #c2baafd9);
}
.text__now {
    color: #ffde59;
    font-size: 14px;
    margin-right: 10px;
}
.yearSelect__not {
    margin-top: 20px;
}
</style>