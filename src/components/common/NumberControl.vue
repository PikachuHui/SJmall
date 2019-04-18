<template>
    <div class="controller-slide">
        <div class="decrement" :class="{disableDecrement: decrementEnable}" @click="decrement"></div>
        <div class="count">{{count}}</div>
        <div class="increment" @click="increment"></div>
    </div>
</template>

<script>
export default {
    name: 'NumberControl',
    props: {
        value: {
            required: true
        },
        minValue: {
            default: 0
        }
    },
    data() {
        return {
            count: 0,
            decrementEnable: false
        }
    },
    methods: {
        decrement() {
            if(this.count <= this.minValue) {
                return;
            }
            if(this.count - 1 <= 0) {
                this.decrementEnable = false;
            }
            this.$emit('valueChange', {newvalue: --this.count, increment: false});
        },
        increment() {
            this.decrementEnable = true;
            this.$emit('valueChange', {newvalue: ++this.count, increment: true});
        }
    },
    mounted() {
        this.count = this.value;
        if(this.count > 0) {
            this.decrementEnable = true;
        }
    }
}
</script>

<style scoped>
.controller-slide{
    display: flex;
    align-items: center;
}
.decrement,.increment{
    width: 1.6rem;
    height: 1.6rem;
    background-size: cover;
    background-position: center;
}
.decrement{
    background-image: url('../../../static/icon/icon-decrement-disable.png');
}
.increment{
    background-image: url('../../../static/icon/icon-increment.png');
}
.count{
    min-width: 1.8rem;
    color: #999;
    text-align: center;
}
.disableDecrement{
    background-image: url('../../../static/icon/icon-decrement-enable.png');
}
</style>