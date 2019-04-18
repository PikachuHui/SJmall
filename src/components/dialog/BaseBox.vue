<template>
    <div class="cover-layout">
        <div class="body-container">
            <div class="message">{{message}}</div>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseBox',
    props: {
        message: {
            type: String,
            required: true,
        }
    }
}
</script>

<style scoped>
.cover-layout{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,.7);
}
.body-container{
    width: 90%;
    height: 10rem;
    background-color: #fff;
    border-radius: 1rem;
    overflow: hidden;
}
.message{
    padding: 0 1rem;
    height: 7rem;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: auto;
    font-size: 1rem;
}
</style>
