<template>
    <div @click="itemClickEventAction" class="result-item-container">
        <img class="picture" :src="goods.image">
        <p class="item-name">{{goods.name}}</p>
    </div>
</template>

<script>
import {Storage} from '../../../common/js/localStorage'

export default {
    name: 'GoodsItem',
    props: {
        goods: {
            type: Object,
            required: true
        }
    },
    methods: {
        itemClickEventAction() {
            Storage.add('history_search', this.goods.name);
            this.$router.push({
                name: 'SearchResult',
                params:{searchWord: this.goods.name}
            });
        }
    }
}
</script>

<style scoped>
.result-item-container{
    max-height: 6.5rem;
    display: inline-flex;
    flex-direction: column;
    overflow: hidden;
    align-items: center;
    justify-content: center;
}
.picture{
    max-width: 5.2rem;
    max-height: 5.2rem;
}
.item-name{
    text-align: center;
}
</style>
