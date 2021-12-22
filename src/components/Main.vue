<template>
    <div>
        <div class="base">
            <router-view/>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        this.$store.dispatch('costs/requestCosts')
    }
}
</script>
<style lang="scss">
.base{
    // background-color: aqua;
    // max-width: 100%;
    height: 700px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
// .basecard{
//     display: flex;
//     max-width: 400px;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// }

</style>