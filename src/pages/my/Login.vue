<template>
  <div>
    <div class="header-bar">
      <div class="go-back" style="width: 1.2rem"></div>
      <p class="window-title">登入蔬加</p>
      <dropdown-menu class="dropdown-menu" @openDropdownList="openDropdownList"></dropdown-menu>
    </div>
    <div class="login-container">
      <div class="app-logo"></div>
      <input-field
        ref="accountField"
        holderText="邮箱/已验证手机"
        class="input-field"
        @valueChange="accountValueChange"
      ></input-field>
      <input-field
        ref="passwordField"
        :type="passwordType"
        holderText="请输入密码"
        class="input-field"
        @valueChange="passwordValueChange"
      >
        <div style="display: flex">
          <div class="close-eye" :class="{openEye: isOpenEye}" @click="changeTextType"></div>
          <div class="forget-password">忘记密码</div>
        </div>
      </input-field>
      <default-button
        :text="loginBtnText"
        class="login-btn"
        :class="{enableLoginBtn: enableLoginBtn}"
        @click="loginEventAction"
      ></default-button>
      <default-button text="注册账号" class="register-btn" @click="$router.push({path: '/register'})"></default-button>
    </div>
    <dropdown-list v-show="showDropdownList"></dropdown-list>
  </div>
</template>

<script>
import { Storage } from "../../common/js/localStorage";
import DefaultButton from "../../components/button/DefaultButton";
import DropdownList from "../../components/common/DropdownList";
import DropdownMenu from "../../components/common/DropdownMenu";
import InputField from "./components/InputField";

export default {
  name: "Login",
  components: {
    DefaultButton,
    DropdownList,
    DropdownMenu,
    InputField
  },
  data() {
    return {
      showDropdownList: false,
      isOpenEye: false,
      enableLoginBtn: false,
      loginBtnText: "登入",
      passwordType: "password"
    };
  },
  methods: {
    openDropdownList(params) {
      this.showDropdownList = params.isShowDropdownList;
    },
    changeTextType() {
      this.isOpenEye = !this.isOpenEye;
      this.isOpenEye
        ? (this.passwordType = "text")
        : (this.passwordType = "password");
    },
    accountValueChange(params) {
      this.enableLoginBtn = this.$options.methods.hasFillInAll.bind(this)();
    },
    passwordValueChange(params) {
      this.enableLoginBtn = this.$options.methods.hasFillInAll.bind(this)();
    },
    /**
     * 表单是否已全部填写
     * @return {Boolean} 是否已全部填写
     */
    hasFillInAll() {
      if (
        this.$refs.accountField.inputFieldText &&
        this.$refs.passwordField.inputFieldText
      ) {
        return true;
      } else {
        return false;
      }
    },
    loginEventAction() {
      if (!this.$options.methods.hasFillInAll.bind(this)()) {
        return;
      }
      this.enableLoginBtn = false;
      this.loginBtnText = "登入中....";
      this.axios
        .post(`${this.$global.SERVER_IP}/login`, {
          account: this.$refs.accountField.inputFieldText,
          password: this.$refs.passwordField.inputFieldText
        })
        .then(response => {
          let result = response.data;
          if (result.code == 200) {
            Storage.add("userid", result.data.userid);
            Storage.add("token", result.data.token);
            Storage.remove("is_login");
            Storage.add("is_login", true);
            this.$router.back();
          } else {
            this.enableLoginBtn = true;
            this.loginBtnText = "登入";
          }
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.login-container {
  padding: 0 1.4rem;
}
.app-logo {
  margin: 0 auto;
  margin-top: 1.6rem;
  width: 9rem;
  height: 9rem;
}
.input-field {
  margin-top: 1.6rem;
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
  background-image: url("../../../static/icon/close-eye.png");
}
.openEye {
  background-image: url("../../../static/icon/open-eye.png");
}
.forget-password {
  padding-left: 0.8rem;
  color: #666;
  font-size: 1rem;
  border-left: solid 1px #777;
}
.login-btn,
.register-btn {
  padding: 1rem 0;
  color: #fff;
  font-size: 1.1rem;
  text-align: center;
  border-radius: 10px;
}
.login-btn {
  margin-top: 3rem;
  background-color: #31ce7d;
}
.enableLoginBtn {
  background-color: #009c4c;
}
.register-btn {
  margin-top: 1rem;
  background-color: #ff9600;
}
</style>