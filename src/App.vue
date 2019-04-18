<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import "./common/css/common.css";
import { Storage } from "./common/js/localStorage";

export default {
  name: "App",
  create() {
    this.$router.push({ path: "/" });
  },
  mounted() {
    // 判断用户是否已登入
    Storage.remove("is_login");
    if (!Storage.get("userid").length) {
      Storage.add("is_login", false);
    } else {
      Storage.add("is_login", true);
    }
  }
};
</script>

<style scoped>
</style>
