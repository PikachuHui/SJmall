<template>
    <div class="container">
        <span :style="symbolStyle">￥</span>
        <span class="integer-price" :style="integerStyle">{{price | integerPrice}}</span>
        <span :style="floatStyle">.{{price | floatPrice}}</span>
    </div>
</template>
<script>
export default {
    name: 'FormatPrice',
    props: {
        price: {
            required: true
        },
        symbolStyle: {
            type: Object
        },
        integerStyle: {
            type: Object
        },
        floatStyle: {
            type: Object
        }
    },
    filters: {
        integerPrice: function(value) {
            return value.toString().split('.')[0];
        },
        floatPrice: function(value) {
            if(value.toString().split('.')[1] == undefined) {
                value += '.00';
            }
            return value.toString().split('.')[1].substring(0, 2);
        }
    }
}
</script>
<style scoped>
.container{
    color: #F23030;
    font-size: .6rem;
}
.container>span:not(:first-child){
    margin-left: -.25rem;
}
.integer-price{
    font-size: 1.2rem;
    font-weight: bold;
}
</style>
