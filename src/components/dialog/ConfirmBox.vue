<template>
    <div>
        <base-box :message="message">
            <div class="btn-group">
                <default-button
                    class="btn-cancel"
                    @click="cancelClickAction"
                    text="取消"
                ></default-button>
                <error-button
                    class="btn-confirm"
                    @click="confirmClickAction"
                    text="确定"
                ></error-button>
            </div>
        </base-box>
    </div>
</template>

<script>
import BaseBox from './BaseBox'
import DefaultButton from '../button/DefaultButton'
import ErrorButton from '../button/ErrorButton'

export default {
    name: 'ConfirmBox',
    props: {
        message: {
            type: String,
            required: true,
        }
    },
    components: {
        BaseBox,
        DefaultButton,
        ErrorButton
    },
    methods: {
        cancelClickAction() {
            this.$emit('confirmBoxEvent', {choose: false});
        },
        confirmClickAction() {
            this.$emit('confirmBoxEvent', {choose: true});
        }
    }
}
</script>

<style scoped>
.btn-group{
    display: flex;
}
.btn-cancel,.btn-confirm{
    flex: 1;
    padding: .8rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
}
.btn-cancel{
    border-top: solid 1px #eaeaea;
}
.btn-confirm{
    border: solid 1px #F23030;
}
</style>