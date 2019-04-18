<template>
  <div>
    <base-box :message="message">
      <default-button class="btn-confirm" text="确定" @click="$emit('click')"></default-button>
    </base-box>
  </div>
</template>

<script>
import BaseBox from "./BaseBox";
import DefaultButton from "../button/DefaultButton";

export default {
  name: "AlertBox",
  props: {
    message: {
      type: String,
      required: true
    }
  },
  components: {
    BaseBox,
    DefaultButton
  }
};
</script>

<style scoped>
.btn-confirm {
  flex: 1;
  padding: 0.8rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border-top: solid 1px #e0e0e0;
}
</style>
