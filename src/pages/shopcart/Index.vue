<template>
  <div>
    <div class="header-bar">
      <go-back class="go-back"></go-back>
      <p class="window-title">购物车</p>
      <dropdown-menu class="dropdown-menu" @openDropdownList="openDropdownList"></dropdown-menu>
    </div>

    <div class="list-container">
      <div class="control-bar">
        <div style="display: flex">
          <item-radio ref="allSelect" @itemSelection="allSelectAction" class="all-select-radio"></item-radio>
          <p @click="allSelectAction">全选</p>
        </div>
        <p @click="openDeleteAction" v-show="!showDeleteSlide">快速删除</p>
        <div class="delete-slide" v-show="showDeleteSlide">
          <div @click="confirmDeleteAction">确定删除</div>
          <div @click="cancelDeleteAction">取消</div>
        </div>
      </div>
      <div class="item-container" v-for="(item, index) in goodsList" :key="index">
        <item-radio
          ref="itemRadio"
          @itemSelection="itemSelectAction"
          class="item-radio"
          :itemId="item.id"
        ></item-radio>
        <goods-item
          ref="goodsItem"
          class="goods-item"
          :goods="item"
          @valueChange="valueChangeAction"
        ></goods-item>
      </div>
    </div>

    <settlement-bar :price="getSelectedItemPrice">
      <success-button text="去结算" class="go-settlement" @click="showTipsBox = !showTipsBox"></success-button>
    </settlement-bar>
    <alert-box message="等待接入支付接口" v-show="showTipsBox" @click="showTipsBox = !showTipsBox"></alert-box>

    <dropdown-list v-show="showDropdownList" class="dropdown-list"></dropdown-list>
  </div>
</template>

<script>
import { Storage } from "../../common/js/localStorage";
import GoBack from "../../components/common/GoBack";
import DropdownMenu from "../../components/common/DropdownMenu";
import DropdownList from "../../components/common/DropdownList";
import ItemRadio from "../../components/common/ItemRadio";
import GoodsItem from "./components/GoodsItem";
import SettlementBar from "../../components/common/SettlementBar";
import SuccessButton from "../../components/button/SuccessButton";
import AlertBox from "../../components/dialog/AlertBox";

export default {
  name: "Shopcart",
  components: {
    GoBack,
    DropdownMenu,
    DropdownList,
    ItemRadio,
    GoodsItem,
    SettlementBar,
    SuccessButton,
    AlertBox
  },
  data() {
    return {
      showDropdownList: false,
      showDeleteSlide: false,
      showTipsBox: false,
      isSelected: false,
      isAllSelected: false,
      goodsList: []
    };
  },
  computed: {
    getSelectedItemPrice: function() {
      return this.$store.getters.getSelectedItemPrice;
    }
  },
  methods: {
    openDropdownList(params) {
      this.showDropdownList = params.isShowDropdownList;
    },
    // 选中指定商品
    itemSelectAction(params) {
      let methods = this.$options.methods;
      // 查找所选对应商品信息
      let goods = this.$refs.goodsItem.find(item => {
        return params.id === item.goods.id;
      }).goods;

      this.isSelected = params.isSelected;
      if (methods.hasAllSelected.bind(this)()) {
        this.$refs.allSelect.isSelected = true;
      } else {
        this.$refs.allSelect.isSelected = false;
      }
      if (params.isSelected) {
        methods.selectedItem.bind(this)(goods);
      } else {
        methods.unselectItem.bind(this)(goods);
      }
    },
    // 全选商品
    allSelectAction(params) {
      this.isAllSelected = params.isSelected;
      if (this.isAllSelected) {
        this.$options.methods.selectedAllItem.bind(this)();
      } else {
        this.$options.methods.unselectAllItem.bind(this)();
      }
    },
    // 增加或减少商品数量
    valueChangeAction(params) {
      if (params.increment) {
        this.$store.commit("incrementItem", params.itemId);
      } else {
        this.$store.commit("decrementItem", params.itemId);
      }
    },
    // 开启删除商品功能模块
    openDeleteAction() {
      this.showDeleteSlide = true;
    },
    // 确定删除所选商品
    confirmDeleteAction() {
      let group = [];
      this.showDeleteSlide = false;
      this.$refs.allSelect.isSelected = false;
      this.$store.commit("emptyShopcart");
      this.$refs.itemRadio.forEach(item => {
        if (item.isSelected) {
          group.push(item.itemId);
        }
        item.isSelected = false;
      });
      this.axios
        .delete(`${this.$global.SERVER_IP}/deleteShopcartGoods`, {
          idGroup: group,
          userId: Storage.get("userid")[0][0]
        })
        .then(response => {
          this.$options.methods.getShopcartGoodsList.bind(this)();
          console.log(response.config.idGroup.toString());
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 退出删除操作
    cancelDeleteAction() {
      this.showDeleteSlide = false;
      this.$refs.itemRadio.forEach(item => {
        item.isSelected = false;
      });
      this.$refs.allSelect.isSelected = false;
      this.$store.commit("emptyShopcart");
    },
    /**
     * 检查条目是否被全部选中
     * @return boolean 条目是否被全部选中
     */
    hasAllSelected() {
      let allSelected = true;
      this.$refs.itemRadio.forEach(item => {
        if (!item.isSelected) {
          allSelected = false;
        }
      });
      return allSelected;
    },
    /**
     * 添加选中指定商品
     * @param id 商品id
     */
    selectedItem(params) {
      this.$store.commit("pushItem", params);
    },
    /**
     * 移除指定商品
     * @param id 商品id
     */
    unselectItem(params) {
      this.$store.commit("popItem", params);
    },
    /**
     * 选中所有条目
     */
    selectedAllItem() {
      let that = this;
      this.$refs.itemRadio.forEach(item => {
        item.isSelected = true;
      });
      this.$store.commit("emptyShopcart");
      this.goodsList.forEach(item => {
        that.$options.methods.selectedItem.bind(this)(item);
      });
    },
    /**
     * 取消选中所有条目
     */
    unselectAllItem() {
      this.$refs.itemRadio.forEach(item => {
        item.isSelected = false;
      });
      this.$store.commit("emptyShopcart");
    },
    /**
     * 从服务器获取购物车的数据
     */
    getShopcartGoodsList() {
      this.axios
        .get(
          `${this.$global.SERVER_IP}/shopcart/${Storage.get("userid")[0][0]}`
        )
        .then(response => {
          this.goodsList = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    let isLogin = Storage.get("is_login");
    if (!isLogin.length || !JSON.parse(isLogin[0][0])) {
      this.$router.push({ path: "/login" });
    } else {
      this.$store.commit("emptyShopcart");
      this.getShopcartGoodsList();
    }
  }
};
</script>

<style scoped>
.header-bar {
  top: 0;
  position: fixed;
  background-color: #fff;
}
.delete-slide {
  display: flex;
  align-items: center;
}
.delete-slide > div:first-child {
  margin-right: 1rem;
}
.list-container {
  padding: 13.5% 0.5rem;
  padding-bottom: 17%;
  overflow: scroll;
}
.item-container {
  padding-top: 0.6rem;
  display: flex;
}
.item-radio {
  margin: 3rem 0.6rem 0 0.2rem;
}
.goods-item {
  padding-bottom: 0.6rem;
  flex: 1;
}
.goods-item:not(:first-child) {
  border-bottom: solid 1px #eaeaea;
}
.control-bar {
  padding: 0.4rem 0.2rem;
  padding-bottom: 0.7rem;
  color: #f23030;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #eaeaea;
}
.all-select-radio {
  margin-right: 0.6rem;
}
.go-settlement {
  padding: 0 0.8rem;
  min-width: 5rem;
  height: 3.4rem;
  line-height: 3.4rem;
  color: #fff;
  font-size: 0.95rem;
  text-align: center;
  font-weight: bold;
  border-top: solid 1px #009c4c;
}
</style>