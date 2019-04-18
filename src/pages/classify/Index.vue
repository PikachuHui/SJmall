<template>
  <div class="body-container">
    <div class="header-bar">
      <go-back class="go-back"></go-back>
      <div style="flex: 1" @touchend="$router.push({name: 'Search'})">
        <search-bar></search-bar>
      </div>
      <dropdown-menu class="dropdown-menu" @openDropdownList="openDropdownList"></dropdown-menu>
    </div>
    <div>
      <!-- 顶部分类滚动栏 -->
      <div class="scroll-bar-top">
        <scroll-bar
          :itemList="firstLevelClassify"
          @clickItemEvent="rowItemBarEventAction"
          ref="rowScrollBar"
        ></scroll-bar>
      </div>
      <!-- 左边分类滚动栏 -->
      <div class="scroll-bar-left" ref="scrollBarLeft">
        <scroll-bar
          :itemList="secondLevelClassify"
          direct="column"
          @clickItemEvent="columnItemBarEventAction"
          ref="columnScrollBar"
        ></scroll-bar>
      </div>
      <!-- 分类展示区 -->
      <div class="classify-result">
        <goods-item
          v-for="(item, index) in threeLevelClassify"
          :key="index"
          :goods="item"
          class="result-item"
        ></goods-item>
      </div>
    </div>
    <div class="navigation-bar">
      <navigation-bar :myText="myText"></navigation-bar>
    </div>
    <loading v-show="isShowLoading"></loading>
    <dropdown-list v-show="showDropdownList"></dropdown-list>
  </div>
</template>

<script>
import { Storage } from "../../common/js/localStorage";
import GoBack from "../../components/common/GoBack";
import SearchBar from "../../components/common/SearchBar";
import DropdownMenu from "../../components/common/DropdownMenu";
import DropdownList from "../../components/common/DropdownList";
import NavigationBar from "../../components/common/NavigationBar";
import ScrollBar from "../../components/scrollbar/ScrollBar";
import GoodsItem from "./components/GoodsItem";
import Loading from "../../components/common/Loading";

export default {
  name: "Classify",
  components: {
    GoBack,
    SearchBar,
    DropdownMenu,
    DropdownList,
    NavigationBar,
    ScrollBar,
    GoodsItem,
    Loading
  },
  data() {
    return {
      showDropdownList: false,
      myText: "未登入",
      isFirstLoad: false,
      isShowLoading: false,
      currentFirstLevelId: 1,
      firstLevelClassify: [],
      secondLevelClassify: [],
      threeLevelClassify: []
    };
  },
  methods: {
    openDropdownList(params) {
      this.showDropdownList = params.isShowDropdownList;
    },
    rowItemBarEventAction(params) {
      this.$options.methods.getSecondLevelClassify.bind(this)(params.id);
    },
    columnItemBarEventAction(params) {
      this.$options.methods.getThreeLevelClassify.bind(this)(params.id);
    },
    confirmAction() {
      this.showAlertBox = false;
    },
    /**
     * 获取二级分类数据
     * @param id 一级分类ID
     */
    getSecondLevelClassify(id) {
      this.axios
        .get(`${this.$global.SERVER_IP}/secondLevelClassify/${id}`)
        .then(response => {
          this.currentFirstLevelId = id;
          this.secondLevelClassify = response.data;
          this.$refs.columnScrollBar.clearItemActiveAction();
          this.$options.methods.getThreeLevelClassify.bind(this)(1);
          this.$refs.columnScrollBar.setActivatedItem(1);
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * 获取三级分类数据
     * @param secondLevelId 二级分类ID
     */
    getThreeLevelClassify(id) {
      this.isShowLoading = true;
      this.axios
        .get(
          `${this.$global.SERVER_IP}/threeLevelClassify/${
            this.currentFirstLevelId
          }/${id}`
        )
        .then(response => {
          this.threeLevelClassify = response.data;
          this.isShowLoading = false;
          if (!this.isFirstLoad) {
            this.$refs.rowScrollBar.setActiveStatus();
            this.$refs.columnScrollBar.setActiveStatus();
            this.isFirstLoad = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    let isLogin = Storage.get("is_login");
    if (isLogin.length && JSON.parse(isLogin[0][0])) {
      this.myText = "我的";
    }
    Storage.remove("scroll_position");
    // 获取一级分类数据
    this.axios
      .get(`${this.$global.SERVER_IP}/firstLevelClassify`)
      .then(response => {
        this.firstLevelClassify = response.data;
      })
      .catch(error => {
        console.log(error);
      });
    this.getSecondLevelClassify(1);
  }
};
</script>

<style scoped>
.body-container {
  display: flex;
  flex-direction: column;
}
.header-bar {
  top: 0;
  position: fixed;
  z-index: 1001;
}
.scroll-bar-top {
  top: calc(4% + 0.6rem * 2);
  max-width: 100%;
  min-width: 100%;
  height: 5%;
  position: fixed;
}
.scroll-bar-left,
.classify-result {
  top: calc((4% + 0.6rem * 2) + 5% + 0.1rem);
  max-height: calc(100% - ((4% + 0.6rem * 2) + 5% + 6% + 0.8rem));
  min-height: calc(100% - ((4% + 0.6rem * 2) + 5% + 6% + 0.8rem));
  border-top: solid 1px #eaeaea;
  overflow: scroll;
  position: fixed;
}
.scroll-bar-left {
  background-color: #f8f8f8;
}
.classify-result {
  margin-left: 5.3rem;
  padding: 0 0.5rem;
  width: calc(100% - 6.3rem);
  max-width: calc(100% - 6.3rem);
  overflow-x: hidden;
}
.result-item {
  margin-top: 1.2rem;
  margin-left: 0.6rem;
  width: calc(100% / 3.4);
  max-width: calc(100% / 3.4);
}
</style>