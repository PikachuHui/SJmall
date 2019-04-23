<template>
    <div class="container"
        :class="{columnDirection: isColumnDirection}"
        @click="$router.push({
            path: `/goods-detail/${goods.id}`,
            params: {id: goods.id}
    })">
        <img class="goods-image" :src="goods.image">
        <div class="information">
            <div class="name">{{goods.name}}</div>
            <div class="item-bottom-slide">
                <div class="price">
                    <span>￥</span>
                    <span class="integer-price">{{goods.price | filterInteger}}</span>
                    <span class="float-price">.{{goods.price | filterFloat}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormatPrice from '../../../components/common/FormatPrice'

export default {
    name: 'GoodsItem',
    props: {
        goods: {
            type: Object,
            required: true
        }
    },
    components: {
        FormatPrice
    },
    data() {
        return {
            isColumnDirection: false
        }
    },
    filters: {
        filterInteger: function(value) {
            return value.toString().split('.')[0];
        },
        filterFloat: function(value) {
            return value.toString().split('.')[1];
        }
    }
}
</script>

<style scoped>
.container{
    display: flex;
    background-color: #fff;
}
.columnDirection{
    display: inline-flex;
    flex-direction: column;
}
.columnDirection>.information{
    border: none;
}
.columnDirection>.goods-image{
    min-width: 100%;
    min-height: 12rem;
}
.goods-image{
    margin: 0 auto;
    min-width: 8rem;
    max-width: 8rem;
    min-height: 8rem;
    max-height: 8rem;
}
.information{
    padding: .6rem;
    flex: 1;
    border-bottom: solid 1px #F3F3F3;
}
.name{
    margin-bottom: .5rem;
    min-height: 3rem;
    max-height: 3em;
    line-height: 1.4rem;
    color: #333;
    overflow:hidden;
    letter-spacing: 1px;
}
.item-bottom-slide{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.price{
    color: #E93B3D;
    font-size: .6rem;
}
.price>span:not(:first-child){
    margin-left: -.25rem;
}
.integer-price{
    font-size: 1.2rem;
}
</style>
