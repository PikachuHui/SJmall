<template>
  <div class="dropdown-container">
    <div class="menu-arrow"></div>
    <div class="item-container">
      <div class="list-item" @click="$router.push({name: 'Index'})">
        <div class="item-icon icon-index"></div>
        <div>首页</div>
      </div>
      <div class="list-item" @click="$router.push({name: 'Classify'})">
        <div class="item-icon icon-classify"></div>
        <div>分类</div>
      </div>
      <div class="list-item" @click="$router.push({name: 'Shopcart'})">
        <div class="item-icon icon-shopcart"></div>
        <div>购物车</div>
      </div>
      <div class="list-item" @click="$router.push({name: 'My'})">
        <div class="item-icon icon-my"></div>
        <div>我的蔬加</div>
      </div>
      <div class="list-item" @click="$router.push({name: ''})">
        <div class="item-icon icon-browse-record"></div>
        <div>浏览足迹</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownList"
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
.icon-index {
  background-image: url("../../../static/icon/menu-home.png");
}
.icon-classify {
  background-image: url("../../../static/icon/menu-classify.png");
}
.icon-shopcart {
  background-image: url("../../../static/icon/menu-shopcart.png");
}
.icon-my {
  background-image: url("../../../static/icon/menu-my.png");
}
.icon-browse-record {
  background-image: url("../../../static/icon/menu-browse-record.png");
}
</style>
