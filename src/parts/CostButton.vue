<template>
    <div class="flex">
        <p><router-link to="/waterchart" class="link"><img src="../assets/watericon.png" class="iconsize"></router-link></p>
        <p><router-link to="/gaschart" class="link"><img src="../assets/fireicon.png" class="iconsize"></router-link></p>
        <p><router-link to="/elementchart" class="link"><img src="../assets/eleicon.png" class="iconsize"></router-link></p>
    </div>
</template>
<style scoped>
.iconsize{
    max-width: 50px;
    min-width: 10px;
    height: 50px;
    align-items: flex-end;
}
.iconsize:hover{
   width: 60px;;
   height: 60px;
}
.flex {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items:center;
}

</style>