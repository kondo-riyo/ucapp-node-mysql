<template>
    <div>
        <div id="overlay" @click.self="$emit('close')">
            <div id="content">
                <div>{{orderInfo.year}}年{{orderInfo.month}}月 光熱費が登録されました</div>
                <div>水道代 {{orderInfo.waterCost}}円</div>
                <div>電気代 {{orderInfo.eleCost}}円</div>
                <div>ガス代 {{orderInfo.gasCost}}円</div>
                <div>合計 {{orderInfo.totalCost}}円</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: [ 'orderInfo' ],
    // data() {
    //     return {
    //     };
    // },
    // methods: {

    // },
}
</script>
<style lang="scss" scoped>
#overlay {
  /*要素を重ねた時の順番*/
  z-index: 1;
  /*画面全体を覆う設定*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.446);
  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  z-index: 2;
  width: 50%;
  max-width: 600px;
  min-width: 350px;
  height: auto;
  padding: 1em;
  background-color: rgba(237, 231, 224, 0.6);
  color: #673A15;
//   font-weight: bold;
  box-sizing: border-box;
  border-radius: 20px;
  text-align: center;
  font-weight: bold;
//   border-color: rgba(153, 134, 117, 0.26);
//   border-width: 4px;
  border: 3px solid #673A15;
  box-shadow: 20px;
}
.flex {
    display: flex;
    justify-content: center;
    padding: 30px;
}
</style>