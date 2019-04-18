<template>
  <!-- 导航栏 -->
  <div>
    <div class="container">
      <router-link :to="{name: 'Index'}" tag="li" active-class="link-active">
        <div class="icon icon-index"></div>
        <p>首页</p>
      </router-link>

      <router-link :to="{name: 'Classify'}" tag="li" active-class="link-active">
        <div class="icon icon-classify"></div>
        <p>分类</p>
      </router-link>

      <router-link :to="{name: 'Shopcart'}" tag="li" active-class="link-active">
        <div class="icon icon-shopcart"></div>
        <p>购物车</p>
      </router-link>

      <router-link :to="{name: 'My'}" tag="li" active-class="link-active">
        <div class="icon icon-my"></div>
        <p>{{myText}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  props: {
    myText: {
      default: "未登入"
    }
  }
};
</script>

<style scoped>
p {
  font-size: 0.6rem;
}
.container {
  bottom: -1px;
  padding: 0.2rem 0;
  width: 100%;
  height: 6%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #cfcfcf;
  background-color: #fff;
  position: fixed;
  box-shadow: 0 -1px 12px #e0e0e0;
}
li {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  cursor: pointer;
}
li > p {
  margin-top: 0.1rem;
}
.icon-index,
.icon-classify,
.icon-shopcart,
.icon-my {
  width: 1.6rem;
  height: 1.6rem;
  background-position: center;
  background-size: cover;
  filter: grayscale(100%);
}
.icon-index {
  background-image: url("../../../static/icon/icon-index.png");
}
.icon-classify {
  background-image: url("../../../static/icon/icon-classify.png");
}
.icon-shopcart {
  background-image: url("../../../static/icon/icon-shopcart.png");
}
.icon-my {
  background-image: url("../../../static/icon/icon-my.png");
}
.link-active > p {
  color: #009c4c;
}
.link-active > .icon {
  filter: grayscale(0);
}
</style>


