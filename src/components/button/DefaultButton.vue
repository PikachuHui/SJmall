<template>
    <div class="default-btn" @click="$emit('click')">{{text}}</div>
</template>

<script>
export default {
    name: 'DefaultButton',
    props: {
        text: {
            type: String,
            required: true
        }
    }
}
</script>

<style>
.default-btn{
    padding: .3rem .4rem;
    background-color: #fff;
}
</style>