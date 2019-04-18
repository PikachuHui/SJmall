<template>
    <div class="bottom-slide">
        <div class="shopcart-total">
            <div class="shopcart-icon"></div>
            <span class="goods-count">{{getAllItemTotal}}</span>
        </div>
        <div class="total-slide" v-if="showPrice">
            <p>总计：</p>
            <format-price :price="price"></format-price>
        </div>
        <div class="go-shopcart">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import FormatPrice from './FormatPrice'

export default {
    name: 'SettlementBar',
    props: {
        price: {
            default: 0
        },
        showPrice: {
            default: true
        }
    },
    components: {
        FormatPrice
    },
    computed: {
        getAllItemTotal() {
            return this.$store.getters.getAllItemTotal
        }
    },
    data() {
        return {
            showPriceSlide: this.showPrice
        }
    }
}
</script>

<style scoped>
.bottom-slide{
    bottom: -1px;
    width: 100%;
    height: 3.4rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    position: fixed;
}
.shopcart-total{
    flex: 1;
    height: 100%;
    border-top: solid 1px #e0e0e0;
}
.total-slide{
    padding: 0 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: bold;
    border-top: solid 1px #e0e0e0;
}
.shopcart-icon{
    margin-top: -1.8rem;
    margin-left: 1rem;
    width: 4rem;
    height: 4rem;
    border: solid 0 #aaa;
    border-top-width: 1px;
    border-radius: 2rem;
    background-color: #fff;
    background-image: url('../../../static/icon/icon-shopcart.png');
    background-size: 60%;
    background-position: center;
    background-repeat: no-repeat;
}
.goods-count{
    margin-top: -3rem;
    margin-left: 3rem;
    min-width: 1.4rem;
    color: #fff;
    background-color: #E93B3D;
    border-radius: 1rem;
    font-size: .6rem;
    text-align: center;
    position: absolute;
}
.go-shopcart{
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}
</style>