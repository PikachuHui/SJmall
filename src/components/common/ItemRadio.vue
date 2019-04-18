<template>
    <div
        class="radio"
        :class="{selectedRadio: isSelected}"
        @click="selectedRadioAction"
    ></div>
</template>
<script>
export default {
    name: 'ItemRadio',
    props: {
        itemId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            isSelected: false
        }
    },
    methods: {
        selectedRadioAction() {
            this.isSelected = !this.isSelected;
            this.$emit('itemSelection', {isSelected: this.isSelected, id: this.itemId});
        }
    }
}
</script>
<style scoped>
.radio{
    max-width: 1.2rem;
    min-width: 1.2rem;
    max-height: 1.2rem;
    min-height: 1.2rem;
    background-size: 110%;
    background-position: center;
    border: solid 1px #999;
    border-radius: 1rem;
}
.selectedRadio{
    border: solid 1px #009c4c;
    background-image: url('../../../static/icon/icon-selected.png');
}
</style>