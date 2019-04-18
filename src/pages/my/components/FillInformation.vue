<template>
  <div>
    <input-field :holderText="phoneNumber" :disabled="true" class="input-field"></input-field>
    <input-field
      ref="password"
      :type="passwordType"
      holderText="账户密码"
      class="input-field"
      @valueChange="valueChangeAction"
    >
      <div class="close-eye" :class="{openEye: hasShowPassword}" @click="changePasswordType"></div>
    </input-field>
    <input-field
      ref="confirmPassword"
      :type="confirmPasswordType"
      holderText="确认密码"
      class="input-field"
      @valueChange="valueChangeAction"
      :style="confirmContainerStyle"
    >
      <div
        class="close-eye"
        :class="{openEye: hasShowConfirmPassword}"
        @click="changeConfirmPasswordType"
      ></div>
    </input-field>
    <input-field
      ref="nickname"
      holderText="账户昵称"
      class="input-field"
      @valueChange="valueChangeAction"
    ></input-field>
    <input-field ref="email" holderText="电子邮箱" class="input-field" @valueChange="valueChangeAction"></input-field>
    <default-button
      text="注册"
      @click="registerAction"
      class="register-btn"
      :class="{enableRegister: enableRegister}"
    ></default-button>
  </div>
</template>

<script>
import InputField from "./InputField";
import DefaultButton from "../../../components/button/DefaultButton";

export default {
  name: "FillInformation",
  components: {
    InputField,
    DefaultButton
  },
  data() {
    return {
      enableRegister: false,
      hasShowPassword: false,
      hasShowConfirmPassword: false,
      passwordType: "password",
      confirmPasswordType: "password",
      confirmContainerStyle: {}
    };
  },
  computed: {
    phoneNumber: function() {
      return sessionStorage.phone;
    }
  },
  methods: {
    changePasswordType() {
      this.hasShowPassword = !this.hasShowPassword;
      this.hasShowPassword
        ? (this.passwordType = "text")
        : (this.passwordType = "password");
    },
    changeConfirmPasswordType() {
      this.hasShowConfirmPassword = !this.hasShowConfirmPassword;
      this.hasShowConfirmPassword
        ? (this.confirmPasswordType = "text")
        : (this.confirmPasswordType = "password");
    },
    valueChangeAction(params) {
      this.enableRegister = this.$options.methods.hasFillInAll.bind(this)();
    },
    registerAction() {
      if (
        this.$options.methods.hasFillInAll.bind(this)() &&
        this.enableRegister
      ) {
        this.axios
          .post(`${this.$global.SERVER_IP}/register`, {
            password: this.$refs.password.inputFieldText,
            nickname: this.$refs.nickname.inputFieldText,
            email: this.$refs.email.inputFieldText
          })
          .then(response => {
            if (response.data.code == 200) {
              this.$router.push({ path: "/login" });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    /**
     * 表单字段是否已全部填写
     * @return {Boolean} 是否已全部填写
     */
    hasFillInAll() {
      let refs = this.$refs;
      if (
        refs.password.inputFieldText &&
        refs.confirmPassword.inputFieldText &&
        refs.nickname.inputFieldText &&
        refs.email.inputFieldText &&
        this.$options.methods.hasEqualsPassword.bind(this)()
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 俩次输入的密码是否一致
     * @return {Boolean} 俩次密码是否一致
     */
    hasEqualsPassword() {
      if (
        this.$refs.password.inputFieldText ===
        this.$refs.confirmPassword.inputFieldText
      ) {
        this.confirmContainerStyle = { borderBottom: "solid 1px #efefef" };
        return true;
      } else {
        this.confirmContainerStyle = { borderBottom: "solid 2px #DD5044" };
        return false;
      }
    }
  }
};
</script>

<style scoped>
.input-field {
  margin-top: 1.6rem;
}
.register-btn {
  margin-top: 3rem;
  padding: 1rem 0;
  color: #fff;
  font-size: 1.1rem;
  text-align: center;
  border-radius: 10px;
  background-color: #31ce7d;
}
.enableRegister {
  background-color: #009c4c;
}
.openEye,
.close-eye {
  margin: 0 0.8rem;
  width: 1.2rem;
  height: 1.2rem;
  background-size: cover;
  background-position: center;
}
.close-eye {
  background-image: url("../../../../static/icon/close-eye.png");
}
.openEye {
  background-image: url("../../../../static/icon/open-eye.png");
}
</style>