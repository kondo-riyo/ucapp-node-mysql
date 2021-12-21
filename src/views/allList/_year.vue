<template>
    <div>
        <div>
            {{fetchYear}}
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        fetchYear() {
            // let fetchYear = this.$route.params.year
            // return fetchYear
            // let costs = this.$store.getters['costs/getCosts']
            let getYear = []
            this.$store.getters['costs/getCosts'].forEach(cost => {
                if( cost.year == this.$route.params.year) {
                    getYear.push(cost)
                }
            });
            return getYear
        }
    }
}
</script>