<template>
  <div>
    <div class="header-bar">
      <go-back class="go-back"></go-back>
      <div class="page-title">商品详情</div>
      <dropdown-menu class="dropdown-menu" @openDropdownList="openDropdownList"></dropdown-menu>
    </div>
    <dropdown-list v-show="showDropdownList"></dropdown-list>
    <div class="content-container">
      <swiper :pictures="goods.image" :config="{loop: true, autoplay: false}"></swiper>
      <container-box class="container-box" style="padding-bottom: 1rem">
        <p class="goods-name">{{goods.name}}</p>
        <div class="price-slide">
          <div style="display: flex;align-items: center">
            <format-price :price="goods.price" :integerStyle="{fontSize: '1.4rem'}"></format-price>
            <span class="goods-standard">/ {{goods.standard}}</span>
          </div>
          <number-control :value="total" minValue="1" @valueChange="valueChangeAction"></number-control>
        </div>
      </container-box>
      <container-box
        class="container-box navigation-item"
        :style="{paddingLeft: 0, paddingRight: 0}"
      >
        <group-box :title="'商品详情'" :style="{paddingLeft: 0, paddingRight: 0}">
          <img
            class="image-intro"
            :src="item"
            v-for="(item, index) in goods.imageIntro"
            :key="index"
          >
        </group-box>
      </container-box>
    </div>
    <settlement-bar :showPrice="false">
      <default-button text="加入购物车" class="add-to-shopcart" @click="addToShopcartAction"></default-button>
      <default-button text="去购物车" class="go-to-shopcart" @click="$router.push({name: 'Shopcart'})"></default-button>
    </settlement-bar>
  </div>
</template>

<script>
import GoBack from "../../components/common/GoBack";
import DropdownMenu from "../../components/common/DropdownMenu";
import DropdownList from "../../components/common/DropdownList";
import Swiper from "../../components/common/Swiper";
import ContainerBox from "./components/ContainerBox";
import GroupBox from "../../components/common/GroupBox";
import FormatPrice from "../../components/common/FormatPrice";
import NumberControl from "../../components/common/NumberControl";
import SettlementBar from "../../components/common/SettlementBar";
import DefaultButton from "../../components/button/DefaultButton";

export default {
  name: "Index",
  components: {
    GoBack,
    DropdownMenu,
    DropdownList,
    Swiper,
    GroupBox,
    ContainerBox,
    FormatPrice,
    NumberControl,
    SettlementBar,
    DefaultButton
  },
  data() {
    return {
      showDropdownList: false,
      hideMoreStandard: true,
      total: 1,
      goods: {
        id: -1,
        name: "正在加载中哦~",
        price: 0,
        standard: "未知",
        image: [],
        threeLevelClassify: -1,
        imageIntro: ["../../../static/icon/loading.gif"]
      }
    };
  },
  computed: {},
  methods: {
    openDropdownList(params) {
      this.showDropdownList = params.isShowDropdownList;
    },
    valueChangeAction(params) {
      this.total = params.newvalue;
    },
    addToShopcartAction() {
      let goods = {
        id: this.goods.id,
        price: this.goods.price,
        total: this.total
      };
      this.$store.commit("pushItem", goods);
      this.axios
        .post(`${this.$global.SERVER_IP}/pushShopcartGoods`, {
          goods,
          userId: 1024
        })
        .then(response => {
          console.log(JSON.parse(response.config.data));
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    // 清空购物车store中的数据
    this.$store.commit("emptyShopcart");
    // 获取商品信息
    this.axios
      .get(`${this.$global.SERVER_IP}/getGoodsItem/${this.$route.params.id}`)
      .then(response => {
        this.goods = response.data;
        // 获取商品详情介绍
        this.axios
          .get(
            `${this.$global.SERVER_IP}/goodsDetailIntro/${
              this.$route.params.id
            }`
          )
          .then(intro => {
            this.goods.imageIntro = intro.data;
            // 强制更新视图
            this.$forceUpdate();
          });
      });
    // 获取购物车中的商品总数
    this.axios
      .get(`${this.$global.SERVER_IP}/shopcart/1024`)
      .then(response => {
        response.data.forEach(item => {
          this.$store.commit("pushItem", {
            id: item.id,
            price: item.price,
            total: item.total
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.goods-name {
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: #333;
  font-size: 1.1rem;
  border-bottom: solid 1px #eaeaea;
}
.header-bar {
  position: fixed;
  background-color: #fff;
  z-index: 100;
}
.page-title {
  flex: 1;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-container {
  top: 6.2%;
  width: 100%;
  max-height: calc(100% - 6.2%);
  background-color: #efefef;
  overflow: scroll;
  position: absolute;
}
.container-box {
  margin-bottom: 0.6rem;
}
.container-box:last-child {
  margin-bottom: 3rem;
}
.content-container .container-box {
  margin-top: -0.2rem;
}
.price-slide {
  margin-top: 1rem;
  padding-right: 0.3rem;
  display: flex;
  justify-content: space-between;
}
.goods-standard {
  padding-top: 0.5rem;
  color: #888;
  font-size: 0.8rem;
}
.image-intro {
  width: 100%;
}
.add-to-shopcart,
.go-to-shopcart {
  padding: 0 0.8rem;
  min-width: 5rem;
  height: 3.4rem;
  line-height: 3.4rem;
  color: #fff;
  font-size: 0.95rem;
  text-align: center;
  background-color: #009c4c;
  border-top: solid 1px #009c4c;
}
.add-to-shopcart {
  background-color: #ff9600;
  border-top: solid 1px #ff9600;
}
</style>
