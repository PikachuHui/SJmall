<template>
  <div>
    <div class="header-bar">
      <go-back class="go-back"></go-back>
      <div style="flex: 1" @touchend="$router.push({name: 'Search'})">
        <search-bar ref="searchBar"></search-bar>
      </div>
      <dropdown-menu class="dropdown-menu" @openDropdownList="openDropdownList"></dropdown-menu>
      <dropdown-list v-show="showDropdownList"></dropdown-list>
    </div>
    <div
      class="goods-item-container"
      :class="{columnArranged: isChangeArranged}"
      @onscroll="listenerScroll"
    >
      <goods-item
        ref="goodsitem"
        v-for="(item, index) in goodsList"
        :key="index"
        :goods="item"
        class="goods-item"
      ></goods-item>
    </div>
    <div class="sidebar-container">
      <div class="to-top" @click="backToTop" v-show="isShowBackToTop"></div>
      <div
        class="change-arranged icon-row-arranged"
        @click="changeArranged"
        v-if="isChangeArranged"
      ></div>
      <div class="change-arranged icon-column-arranged" @click="changeArranged" v-else></div>
    </div>
  </div>
</template>

<script>
import GoBack from "../../components/common/GoBack";
import SearchBar from "../../components/common/SearchBar";
import DropdownMenu from "../../components/common/DropdownMenu";
import DropdownList from "../../components/common/DropdownList";
import GoodsItem from "./components/GoodsItem";
import { Storage } from "../../common/js/localStorage";

export default {
  name: "SearchResult",
  data() {
    return {
      goodsList: [],
      isChangeArranged: false,
      isShowBackToTop: false,
      showDropdownList: false
    };
  },
  components: {
    GoBack,
    SearchBar,
    DropdownMenu,
    DropdownList,
    GoodsItem
  },
  methods: {
    listenerScroll() {
      let element = document.querySelector(".goods-item-container");
      if (element.scrollTop > 350) {
        this.isShowBackToTop = true;
      } else {
        this.isShowBackToTop = false;
      }
    },
    backToTop() {
      let elementScrollTop = document.querySelector(".goods-item-container")
        .scrollTop;
      let backTopClock = setInterval(() => {
        document
          .querySelector(".goods-item-container")
          .scrollTo(0, (elementScrollTop -= 60));
        if (elementScrollTop <= 0) {
          clearInterval(backTopClock);
        }
      }, 10);
    },
    changeArranged() {
      this.isChangeArranged = !this.isChangeArranged;
      this.$refs.goodsitem.forEach(item => {
        item.isColumnDirection = this.isChangeArranged;
      });
    },
    openDropdownList(params) {
      this.showDropdownList = params.isShowDropdownList;
    }
  },
  mounted() {
    // 获取搜索的结果
    this.axios
      .get(
        `${this.$global.SERVER_IP}/searchResult?key=${
          this.$route.params.searchWord
        }`
      )
      .then(response => {
        this.goodsList = response.data;
        this.$nextTick(() => {
          this.$refs.goodsitem.forEach(item => {
            item.isColumnDirection = this.isChangeArranged;
          });
          // 恢复滚动条位置
          if (Storage.get("scroll_position").length) {
            document
              .querySelector(".goods-item-container")
              .scrollTo(0, Storage.get("scroll_position")[0][0]);
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.$refs.searchBar.searchWord = this.$route.params.searchWord;
    // 恢复排列样式
    this.isChangeArranged = Storage.get("is_change_arranged")[0] || false;
    // 为结果容器绑定scroll事件
    document
      .querySelector(".goods-item-container")
      .addEventListener("scroll", this.listenerScroll);
  },
  beforeRouteLeave(to, from, next) {
    Storage.remove("is_change_arranged");
    Storage.remove("scroll_position");
    // 保存商品排列样式
    Storage.add("is_change_arranged", this.isChangeArranged);
    // 保存滚动条位置
    Storage.add(
      "scroll_position",
      document.querySelector(".goods-item-container").scrollTop
    );
    next();
  }
};
</script>

<style scoped>
.header-bar {
  top: 0;
}
.goods-item-container {
  height: calc(100% - (4% + 0.6rem * 2));
  overflow: scroll;
  position: fixed;
  background-color: #efefef;
}
.columnArranged > .goods-item {
  margin-bottom: 0.2rem;
  min-width: calc(50% - 0.1rem);
  max-width: calc(50% - 0.1rem);
}
.columnArranged > .goods-item:nth-child(even) {
  margin-left: 0.2rem;
}
.sidebar-container {
  bottom: 6%;
  right: 0.8rem;
  position: fixed;
}
.to-top {
  margin-bottom: 0.6rem;
}
.to-top,
.change-arranged {
  width: 2.2rem;
  height: 2.2rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 2rem;
  border: solid 1px #bebebe;
}
.to-top,
.icon-row-arranged,
.icon-column-arranged {
  background-size: 68%;
  background-position: center;
  background-repeat: no-repeat;
}
.to-top {
  background-image: url("../../../static/icon/icon-back-to-top.png");
}
.icon-row-arranged {
  background-image: url("../../../static/icon/icon-row-arranged.png");
}
.icon-column-arranged {
  background-image: url("../../../static/icon/icon-column-arranged.png");
}
</style>