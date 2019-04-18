<template>
  <div>
    <div class="app-logo"></div>
    <input-field
      ref="phoneField"
      class="input-field"
      holderText="请输入手机号（暂支持大陆手机号）"
      @valueChange="valueChangeAction"
    ></input-field>
    <input-field
      ref="verifyField"
      class="input-field"
      holderText="请输入验证码"
      @valueChange="valueChangeAction"
    >
      <div class="get-verify-code" @click="getVerifyCode">{{getVerifyCodeText}}</div>
    </input-field>
    <default-button
      text="下一步"
      class="next-step-btn"
      :class="{enableNextStepBtn: enableNextStep}"
      @click="nextStepAction"
    ></default-button>
  </div>
</template>

<script>
import { Storage } from "../../../common/js/localStorage";
import InputField from "./InputField";
import DefaultButton from "../../../components/button/DefaultButton";

export default {
  name: "CheckPhone",
  components: {
    InputField,
    DefaultButton
  },
  data() {
    return {
      enableNextStep: false,
      hasGetVerifyCode: true,
      getVerifyCodeText: "获取验证码"
    };
  },
  methods: {
    valueChangeAction(params) {
      this.enableNextStep = this.$options.methods.hasFillInAll.bind(this)();
    },
    /**
     * 表单是否已全部填写
     * @return {Boolean} 是否已全部填写
     */
    hasFillInAll() {
      let phone = this.$refs.phoneField.inputFieldText;
      if (
        this.$options.methods.hasPhoneNumber.bind(this)(phone) &&
        this.$refs.verifyField.inputFieldText
      ) {
        return true;
      } else {
        return false;
      }
    },
    getVerifyCode() {
      let phone = this.$refs.phoneField.inputFieldText;
      if (
        this.$options.methods.hasPhoneNumber.bind(this)(phone) &&
        this.hasGetVerifyCode
      ) {
        this.hasGetVerifyCode = false;
        Storage.remove("wait_verify_code");
        Storage.add("wait_verify_code", 90);
        this.$options.methods.getVerifyCodeClock.bind(this)();
        this.axios
          .post(`${this.$global.SERVER_IP}/getPhoneVerifyCode`, { phone })
          .then(response => {
            console.log(response.data.message);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    /**
     * 检查手机号码是否合法
     * @param {String} phone 手机号码
     * @return {Boolean} 是否合法
     */
    hasPhoneNumber(phone) {
      if (/^1[34578]\d{9}$/.test(phone)) {
        return true;
      } else {
        return false;
      }
    },
    getVerifyCodeClock() {
      let secounds = Number.parseInt(Storage.get("wait_verify_code")[0][0]);
      let clock = setInterval(() => {
        if (secounds > 0) {
          Storage.remove("wait_verify_code");
          Storage.add("wait_verify_code", --secounds);
          this.getVerifyCodeText = `${secounds}秒后可获取`;
        } else {
          this.hasGetVerifyCode = true;
          this.getVerifyCodeText = "获取验证码";
          clearInterval(clock);
        }
      }, 1000);
    },
    nextStepAction() {
      if (this.enableNextStep) {
        sessionStorage.phone = this.$refs.phoneField.inputFieldText;
        this.$emit("nextStep");
      }
    }
  },
  mounted() {
    // 检查是否发送验证码后刷新了页面
    this.getVerifyCodeClock();
  }
};
</script>

<style scoped>
.app-logo {
  margin: 0 auto;
  margin-top: 1.6rem;
  width: 9rem;
  height: 9rem;
}
.input-field {
  margin-top: 1.6rem;
}
.get-verify-code {
  margin-left: 0.8rem;
  padding-left: 0.8rem;
  color: #666;
  font-size: 1rem;
  border-left: solid 1px #777;
}
.next-step-btn {
  margin-top: 3rem;
  padding: 1rem 0;
  color: #fff;
  font-size: 1.1rem;
  text-align: center;
  border-radius: 10px;
  background-color: #31ce7d;
}
.enableNextStepBtn {
  background-color: #009c4c;
}
</style>