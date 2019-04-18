<template>
  <div class="dropdown-container">
    <div class="menu-arrow"></div>
    <div class="item-container">
      <div
        v-for="(item, index) in menuList"
        :key="index"
        class="list-item"
        @click="$router.push({name: item.routeName})"
      >
        <div class="item-icon" :style="{backgroundImage: `url('${item.icon}')`}"></div>
        <div>{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownList",
  data() {
    return {
      menuList: [
        {
          title: "首页",
          icon: "../../../static/icon/menu-home.png",
          routeName: "Index"
        },
        {
          title: "分类",
          icon: "../../../static/icon/menu-classify.png",
          routeName: "Classify"
        },
        {
          title: "购物车",
          icon: "../../../static/icon/menu-shopcart.png",
          routeName: "Shopcart"
        },
        {
          title: "我的蔬加",
          icon: "../../../static/icon/menu-my.png",
          routeName: "My"
        },
        {
          title: "浏览足迹",
          icon: "../../../static/icon/menu-browse-record.png",
          routeName: ""
        }
      ]
    };
  }
};
</script>

<style scoped>
.dropdown-container {
  top: calc(4% + 1rem);
  right: 0.4rem;
  min-width: 8rem;
  z-index: 1000;
  position: fixed;
}
.menu-arrow {
  right: 1.2rem;
  width: 0;
  height: 0;
  line-height: 0;
  border-style: solid;
  border-width: 0.7rem 0.7rem 0.7rem 0px;
  border-color: transparent #555;
  transform: rotate(90deg);
  position: fixed;
}
.item-container {
  margin-top: 0.8rem;
  padding: 0 0.5rem;
  background-color: #555;
  border-radius: 6px;
}
.list-item {
  padding: 0.6rem 0;
  color: #fff;
  display: flex;
  align-items: center;
}
.list-item:not(:first-child) {
  border-top: solid 1px #c0c0c0;
}
.item-icon {
  margin-right: 0.5rem;
  width: 1.2rem;
  height: 1.2rem;
  background-position: center;
  background-size: cover;
}
</style>
