<template>
    <default-button
        :text="text"
        @click="$emit('click')"
    ></default-button>
</template>

<script>
import DefaultButton from './DefaultButton'

export default {
    name: 'SuccessButton',
    props: {
        text: {
            type: String,
            required: true
        }
    },
    components: {
        DefaultButton
    }
}
</script>

<style scoped>
.default-btn{
    color: #fff;
    background-color: #009c4c;
}
</style>