<template>
    <div class="group-container" :style="newstyle">
        <div class="title-container">
            <div class="border-left"></div>
            <div class="title">{{title}}</div>
            <div class="border-right"></div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'GroupBox',
    props: {
        title: {
            type: String,
            required: true
        },
        newstyle: {
            type: Object
        }
    }
}
</script>

<style scoped>
.group-container{
    margin-bottom: .2rem;
    padding: 1.2rem .2rem;
    background-color: #fff;
}
.title-container{
    margin-bottom: .8rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.title{
    margin: 0 .3rem;
    color: #555;
    font-size: 1.1rem;
}
.border-left,.border-right{
    width: 4rem;
    height: 1rem;
    background-size: cover;
    background-position: center;
}
.border-left{
    background-image: url('../../../static/icon/icon-group-title-border-left.png');
}
.border-right{
    background-image: url('../../../static/icon/icon-group-title-border-right.png');
}
</style>
