<template>
  <div>
    <div class="header-bar">
      <go-back class="go-back"></go-back>
      <p class="window-title">注册账号</p>
      <div class="go-back" style="width: 1.2rem"></div>
    </div>
    <div class="register-container">
      <check-phone v-if="!hasPassPhoneVerify" @nextStep="nextStepAction"></check-phone>
      <fill-information v-else></fill-information>
    </div>
  </div>
</template>

<script>
import GoBack from "../../components/common/GoBack";
import CheckPhone from "./components/CheckPhone";
import FillInformation from "./components/FillInformation";

export default {
  name: "Register",
  components: {
    GoBack,
    CheckPhone,
    FillInformation
  },
  data() {
    return {
      hasPassPhoneVerify: false
    };
  },
  methods: {
    nextStepAction() {
      this.hasPassPhoneVerify = true;
    }
  }
};
</script>

<style scoped>
.register-container {
  padding: 0 1.4rem;
}
</style>