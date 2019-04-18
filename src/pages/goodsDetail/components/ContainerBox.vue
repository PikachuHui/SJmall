<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ContainerBox'
}
</script>

<style scoped>
.container{
    padding: .4rem .6rem;
    background-color: #fff;
}
</style>

