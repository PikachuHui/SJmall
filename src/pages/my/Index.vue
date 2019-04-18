<template>
  <div>
    <div class="header-bar">
      <go-back class="go-back"></go-back>
      <p class="window-title">我的蔬加</p>
      <dropdown-menu class="dropdown-menu" @openDropdownList="openDropdownList"></dropdown-menu>
    </div>
    <div class="body-container">
      <container-box>
        <div class="user-information-slide">
          <img :src="userInfor.picture" class="user-picture">
          <div>
            <p class="user-nickname">{{userInfor.nickname}}</p>
            <p class="user-intro">{{userInfor.introduce}}</p>
          </div>
          <div class="setting-slide">
            <div class="icon-setting"></div>
            <div style="color: #801F18;font-size: .8rem" @click="$router.push({name: 'UserCenter'})">个人中心</div>
          </div>
        </div>
      </container-box>
      <container-box class="component-slide">
        <div class="component-slide-item">
          <div class="icon-common icon-wait-pay"></div>
          <p>待付款</p>
        </div>
        <div class="component-slide-item">
          <div class="icon-common icon-wait-receipt"></div>
          <p>待收货</p>
        </div>
        <div class="component-slide-item">
          <div class="icon-common icon-all-order"></div>
          <p>全部订单</p>
        </div>
      </container-box>
    </div>
    <dropdown-list v-show="showDropdownList"></dropdown-list>
    <navigation-bar :myText="myText"></navigation-bar>
  </div>
</template>

<script>
import { Storage } from "../../common/js/localStorage";
import NavigationBar from "../../components/common/NavigationBar";
import GoBack from "../../components/common/GoBack";
import DropdownList from "../../components/common/DropdownList";
import DropdownMenu from "../../components/common/DropdownMenu";
import ContainerBox from "./components/ContainerBox";

export default {
  name: "My",
  data() {
    return {
      showDropdownList: false,
      myText: "未登入",
      userInfor: {
        picture:
          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=188149577,2949073731&fm=27&gp=0.jpg"
      }
    };
  },
  components: {
    NavigationBar,
    GoBack,
    DropdownList,
    DropdownMenu,
    ContainerBox
  },
  methods: {
    openDropdownList(params) {
      this.showDropdownList = params.isShowDropdownList;
    }
  },
  mounted() {
    let isLogin = Storage.get("is_login");
    if (!isLogin.length || !JSON.parse(isLogin[0][0])) {
      this.$router.push({ path: "/login" });
    } else {
      this.myText = "我的";
      this.axios
        .get(
          `${this.$global.SERVER_IP}/userInformation/${
            Storage.get("userid")[0][0]
          }`
        )
        .then(response => {
          this.userInfor = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.header-bar {
  background-color: #fff;
}
.body-container {
  background-color: #f7f7f7;
}
.user-information-slide {
  padding: 1.4rem 1rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  background-image: linear-gradient(to right, #f03c3c, #f57858);
  box-shadow: 0 1px 6px #eb3d3d;
}
.user-picture {
  margin-right: 0.8rem;
  width: 5rem;
  height: 5rem;
  border-radius: 2.5rem;
  border: solid 1px #f87858;
  background-color: #fafafa;
}
.user-nickname {
  margin-bottom: 0.6rem;
  color: #fff;
  font-size: 1.2rem;
}
.user-intro {
  padding: 0 0.3rem 0 0.1rem;
  max-width: 11rem;
  color: #eee;
  font-size: 0.8rem;
  border-bottom: solid 1px #eee;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.setting-slide {
  margin-top: -5rem;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-setting {
  width: 1.2rem;
  height: 1.2rem;
  background-image: url("../../../static/icon/setting.png");
  background-size: cover;
  background-position: center;
}
.component-slide {
  display: flex;
}
.component-slide-item {
  margin-left: 1rem;
  margin-right: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.component-slide-item > p {
  margin-top: 0.1rem;
  color: #666;
  font-size: 0.8rem;
}
.icon-common {
  width: 2.4rem;
  height: 2.4rem;
  background-size: cover;
  background-position: center;
}
.icon-wait-pay {
  background-image: url("../../../static/icon/waiting-pay.png");
}
.icon-wait-receipt {
  background-image: url("../../../static/icon/waiting-receipt.png");
}
.icon-all-order {
  background-image: url("../../../static/icon/all-orders.png");
}
</style>
