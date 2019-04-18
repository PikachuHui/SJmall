<template>
    <div>
        <div class="loading-layout">
            <div class="loading-panel"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style scoped>
.loading-layout{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .9);
}
.loading-panel{
    width: 3rem;
    height: 3rem;
    background-image: url('../../../static/icon/loading.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>