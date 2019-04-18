<template>
  <div class="body-container">
    <!-- 头部 -->
    <div class="header-bar" :class="{header_bar_bgcolor: headerBarActive}">
      <div class="classify-link" @touchend="$router.push({name: 'Classify'})"></div>
      <div class="search-bar-container" @touchend="$router.push({name: 'Search'})">
        <search-bar>
          <div class="logo">蔬加</div>
        </search-bar>
      </div>
      <div class="login-btn" @touchend="$router.push({name: 'My'})"></div>
    </div>
    <!-- 轮播 -->
    <swiper :pictures="swiperPictures" @clickSwiperEvent="clickSwiperEventAction"></swiper>
    <div class="content-container">
      <!-- 蔬加精选 -->
      <group-box title="蔬加精选">
        <div class="selection-container">
          <div
            class="selection-item"
            v-for="(item, index) in selectionGoods"
            :key="index"
            @click="watchGoodsDetail(item.id)"
          >
            <img :src="item.image">
            <p>{{item.name}}</p>
            <format-price
              :price="item.price"
              :integerStyle="{fontSize: '.9rem', fontWeight: 'normal'}"
            ></format-price>
          </div>
        </div>
      </group-box>
      <!-- 优惠专场 -->
      <group-box title="优惠专场">
        <div class="discounts">
          <div class="more-discounts">
            更多
            <span class="see-more"></span>
          </div>
          <div class="discounts-scroll-container">
            <div
              class="discounts-item"
              v-for="(item, index) in discountsList"
              :key="index"
              @click="watchGoodsDetail(item.id)"
            >
              <img :src="item.image" class="discounts-goods-image">
              <div>
                <format-price
                  :price="item.currentPrice"
                  class="discounts-price"
                  style="fontWeight: normal"
                  :symbolStyle="{fontSize: '.9rem'}"
                  :integerStyle="{fontWeight: 'normal', fontSize: '.9rem'}"
                ></format-price>
                <p class="original-price">￥{{item.originalPrice}}</p>
              </div>
            </div>
          </div>
        </div>
      </group-box>
      <!-- 为您推荐 -->
      <group-box title="为您推荐">
        <div class="recommend">
          <div
            class="recommend-item"
            v-for="(item, index) in recommendList"
            :key="index"
            @click="watchGoodsDetail(item.id)"
          >
            <img :src="item.image">
            <p class="goods-name">{{item.name}}</p>
            <format-price :price="item.price" :integerStyle="{fontSize: '1rem'}"></format-price>
          </div>
        </div>
      </group-box>
    </div>
    <!-- 底部导航 -->
    <navigation-bar :myText="myText"></navigation-bar>
  </div>
</template>

<script>
import SearchBar from "../../components/common/SearchBar";
import Swiper from "../../components/common/Swiper";
import GroupBox from "../../components/common/GroupBox";
import FormatPrice from "../../components/common/FormatPrice";
import NavigationBar from "../../components/common/NavigationBar";
import { Storage } from "../../common/js/localStorage";

export default {
  name: "Home",
  data() {
    return {
      headerBarActive: false,
      // 轮播图组
      swiperPictures: [],
      // 精选商品
      selectionGoods: [],
      // 优惠专场列表
      discountsList: [],
      // 为您推荐列表
      recommendList: [],
      // “我的”模块导航条文本
      myText: "未登入"
    };
  },
  components: {
    SearchBar,
    Swiper,
    GroupBox,
    FormatPrice,
    NavigationBar
  },
  methods: {
    // 处理窗体滚动
    windowScrollAction() {
      window.pageYOffset > 10
        ? (this.headerBarActive = true)
        : (this.headerBarActive = false);
    },
    clickSwiperEventAction(params) {
      alert(params.index);
    },
    watchGoodsDetail(id) {
      this.$router.push({ name: "GoodsDetail", params: { id: id } });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.windowScrollAction);
    let isLogin = Storage.get("is_login");
    if (isLogin.length && JSON.parse(isLogin[0][0])) {
      this.myText = "我的";
    }
    // 获取轮播图数据
    this.axios
      .get(`${this.$global.SERVER_IP}/indexSwiper`)
      .then(response => {
        this.swiperPictures = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    // 获取精选商品数据
    this.axios
      .get(`${this.$global.SERVER_IP}/selectionGoods`)
      .then(response => {
        this.selectionGoods = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    // 获取优惠专场数据
    this.axios
      .get(`${this.$global.SERVER_IP}/discounts`)
      .then(response => {
        this.discountsList = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    // 获取为您推荐数据
    this.axios
      .get(`${this.$global.SERVER_IP}/recommend`)
      .then(response => {
        this.recommendList = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.goods-name {
  margin: 0.2rem 0 0 0;
  height: 3.4rem;
  overflow: hidden;
}
.recommend {
  display: flex;
  flex-wrap: wrap;
}
.recommend > .recommend-item:nth-child(even) {
  margin-left: 2%;
}
.recommend-item {
  margin-bottom: 0.6rem;
  width: 49%;
  max-width: 49%;
  display: flex;
  flex-direction: column;
}
.recommend-item > img {
  margin: 0 auto;
  min-width: 98%;
  max-width: 98%;
}
.selection-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.selection-item {
  margin-top: 0.1rem;
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.selection-item > img {
  min-width: 5.4rem;
  max-width: 5.4rem;
  min-height: 5.4rem;
  max-height: 5.4rem;
}
.body-container {
  margin-bottom: calc(6% * 2);
  background-color: #efefef;
}
.content-container {
  margin-top: -0.2rem;
}
.more-discounts {
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.see-more {
  margin-left: 0.1rem;
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("../../../static/icon/icon-see-more.png");
  background-size: cover;
  background-position: center;
}
.discounts-scroll-container {
  max-width: 100%;
  overflow: scroll;
  display: flex;
  align-items: flex-end;
}
.discounts-item {
  margin: 0 0.2rem;
}
.discounts-goods-image {
  min-width: 5.6rem;
  max-width: 5.6rem;
}
.discounts-price,
.original-price {
  text-align: center;
}
.original-price {
  color: #333;
  font-size: 0.8rem;
  text-decoration: line-through #999;
}
.header-bar {
  top: 0;
  z-index: 1000;
  position: fixed;
  border-bottom: none;
}
.header_bar_bgcolor {
  background-color: #009c4c;
}
.classify-link {
  margin: 0 0.8rem;
  width: 1.4rem;
  height: 1.4rem;
  background-image: url("../../../static/icon/icon-classify-link.png");
  background-position: center;
  background-size: cover;
}
.logo {
  padding-right: 0.4rem;
  font-size: 0.8rem;
  color: #009c4c;
  border-right: solid 1px #ccc;
}
.login-btn {
  margin: 0 0.8rem;
  width: 1.4rem;
  height: 1.4rem;
  background-image: url("../../../static/icon/icon-index-my.png");
  background-position: center;
  background-size: cover;
}
.search-bar-container {
  flex: 1;
}
</style>