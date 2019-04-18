<template>
    <div class="container">
        <slot></slot>
        <div class="icon-search"></div>
        <input type="text"
            maxlength="30"
            class="search-inputbox"
            :placeholder="holderWord"
            v-model="searchWord"
        >
        <div class="clear-input"
            :class="{showClear: isShowClear}"
            @click="clearInput"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    props: {
        holderWord: {
            type: String,
            required: false,
            default: '找找看'
        }
    },
    data() {
        return {
            searchWord: '',
            isShowClear: false
        }
    },
    watch: {
        searchWord: function(value) {
            if(this.searchWord != '') {
                this.isShowClear = true;
            }else {
                this.isShowClear = false;
            }
        }
    },
    methods: {
        clearInput() {
            this.searchWord = '';
            document.querySelector('.search-inputbox').focus();
        }
    }
}
</script>

<style scoped>
.container{
    flex: 1;
    padding: .3rem .5rem;
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 1rem;
}
.icon-search,.clear-input{
    margin: 0 .5rem;
    width: 1rem;
    height: 1rem;
    background-size: cover;
    background-position: center;
}
.icon-search{
    background-image: url('../../../static/icon/icon-search.png');
}
.clear-input{
    display: none;
    background-image: url('../../../static/icon/icon-clear-input.png');
}
.search-inputbox{
    flex: 1;
    padding: .2rem;
    border: none;
    outline: none;
    font-size: .8rem;
    background-color: #f5f5f5;
}
.showClear{
    margin: 0 .2rem;
    display: block;
}
</style>


