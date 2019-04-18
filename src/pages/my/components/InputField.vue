<template>
  <div class="field-container" :style="containerStyle">
    <input
      :type="type"
      class="input-box"
      v-model="inputFieldText"
      :placeholder="holderText"
      :disabled="disabled"
    >
    <div class="clear-input-field" @click="inputFieldText = ''" v-show="showClearOption"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    type: {
      default: "text"
    },
    holderText: {},
    disabled: {
      default: false
    },
    containerStyle: {}
  },
  data() {
    return {
      inputFieldText: "",
      showClearOption: false
    };
  },
  watch: {
    inputFieldText: function(value) {
      value ? (this.showClearOption = true) : (this.showClearOption = false);
      this.$emit("valueChange", { value: this.inputFieldText });
    }
  }
};
</script>

<style scoped>
.field-container {
  display: flex;
  align-items: center;
  border-bottom: solid 1px #efefef;
}
.input-box {
  margin-right: 0.3rem;
  border: none;
  padding: 0.8rem 0;
  font-size: 1.1rem;
  outline: none;
  flex: 1;
}
.clear-input-field {
  width: 1.1rem;
  height: 1.1rem;
  background-image: url("../../../../static/icon/icon-clear-input.png");
  background-size: cover;
  background-position: center;
}
</style>