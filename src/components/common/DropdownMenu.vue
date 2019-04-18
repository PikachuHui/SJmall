<template>
    <div>
        <div class="dropdown-btn" @click="openDropdownList"></div>
    </div>
</template>

<script>
export default {
    name: 'DropdownMenu',
    data() {
        return {
            isShowDropdownList: false
        }
    },
    methods: {
        openDropdownList() {
            this.isShowDropdownList = !this.isShowDropdownList;
            this.$emit('openDropdownList', {isShowDropdownList: this.isShowDropdownList});
        }
    }
}
</script>

<style scoped>
.dropdown-btn{
    width: 1.4rem;
    height: 1.2rem;
    background-image: url('../../../static/icon/icon-dropdown-menu.png');
    background-position: center;
    background-size: cover;
    z-index: 100;
}
</style>
