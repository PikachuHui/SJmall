<template>
  <div>
    <div class="header-bar">
      <go-back class="go-back"></go-back>
      <p class="window-title">个人中心</p>
      <dropdown-menu class="dropdown-menu" @openDropdownList="openDropdownList"></dropdown-menu>
    </div>
    <div class="body-container">
      <information-item class="information-container" :showMore="false">
        <div class="user-information">
          <img :src="userData.picture" class="user-picture">
          <div>
            <p class="nickname">{{userData.nickname}}</p>
            <p class="introduce">{{userData.introduce}}</p>
          </div>
        </div>
      </information-item>
      <information-item>
        <p class="standard-text">修改密码</p>
      </information-item>
      <information-item>
        <p class="standard-text">修改昵称</p>
      </information-item>
      <information-item>
        <p class="standard-text">更换头像</p>
      </information-item>
      <information-item>
        <p class="standard-text">修改个性签名</p>
      </information-item>
      <information-item :showMore="false">
        <p class="standard-text" @click="logoutAction">退出登录</p>
      </information-item>
    </div>
    <dropdown-list v-show="showDropdownList"></dropdown-list>
  </div>
</template>

<script>
import { Storage } from "../../common/js/localStorage";
import GoBack from "../../components/common/GoBack";
import DropdownList from "../../components/common/DropdownList";
import DropdownMenu from "../../components/common/DropdownMenu";
import InformationItem from "./components/InformationItem";

export default {
  name: "UserCenter",
  components: {
    GoBack,
    DropdownList,
    DropdownMenu,
    InformationItem
  },
  data() {
    return {
      showDropdownList: false,
      userData: {}
    };
  },
  methods: {
    openDropdownList(params) {
      this.showDropdownList = params.isShowDropdownList;
    },
    logoutAction() {
      Storage.remove("userid");
      Storage.remove("token");
      Storage.remove("is_login");
      this.$router.push({ name: "My" });
    }
  },
  mounted() {
    this.axios
      .get(
        `${this.$global.SERVER_IP}/userInformation/${
          Storage.get("userid")[0][0]
        }`
      )
      .then(response => {
        this.userData = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.body-container {
  padding: 0 0.6rem;
}
.information-container {
  margin-top: 0.4rem;
}
.user-information {
  display: flex;
  align-items: center;
}
.user-picture {
  margin-right: 0.6rem;
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  border: solid 1px #f0f0f0;
}
.standard-text {
  color: #999;
  font-size: 1rem;
}
.nickname {
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1.1rem;
  font-weight: bold;
  font-family: "宋体";
}
.introduce {
  max-width: 16rem;
  color: #999;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>