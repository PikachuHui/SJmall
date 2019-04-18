<template>
  <div>
    <div class="header-bar">
      <go-back class="go-back"></go-back>
      <search-bar ref="searchBar" :holderWord="searchRecommend"></search-bar>
      <success-button class="search-btn" text="搜索" @click="searchBtnClickAction"></success-button>
    </div>

    <div class="body-container">
      <div class="history-search" v-if="filterSearchWord.length != 0">
        <div class="history-search-head">
          <p>最近搜索</p>
          <div class="clear-history-search" @touchend="clearHistoryBtnTouchAction"></div>
        </div>
        <div class="search-list">
          <span
            class="search-list-item"
            v-for="(item, index) in historySearch"
            :key="index"
            @click="historyItemTouchAction(item, index)"
          >{{item[historySearch.length - index - 1]}}</span>
        </div>
      </div>
      <div class="hot-search">
        <p>热门搜索</p>
        <div class="search-list">
          <span
            class="search-list-item"
            v-for="(item, index) in hotSearch"
            :key="index"
            @click="$router.push({name: 'SearchResult', params: {searchWord: item}})"
          >{{item}}</span>
        </div>
      </div>
    </div>

    <confirm-box v-if="showConfirmBox" message="确定要清空吗？" @confirmBoxEvent="confirmBoxEventAction"></confirm-box>
  </div>
</template>

<script>
import GoBack from "../../components/common/GoBack";
import SearchBar from "../../components/common/SearchBar";
import { Storage } from "../../common/js/localStorage";
import AlertBox from "../../components/dialog/AlertBox";
import ConfirmBox from "../../components/dialog/ConfirmBox";
import SuccessButton from "../../components/button/SuccessButton";

export default {
  name: "Index",
  data() {
    return {
      historySearch: [],
      showConfirmBox: false,
      hotSearch: [],
      searchRecommend: ""
    };
  },
  components: {
    GoBack,
    SearchBar,
    AlertBox,
    ConfirmBox,
    SuccessButton
  },
  computed: {
    filterSearchWord() {
      this.historySearch.forEach((item, index) => {
        if (item[index] == "") {
          this.historySearch.splice(index, 1);
        }
      });
      return this.historySearch;
    }
  },
  methods: {
    searchBtnClickAction() {
      let searchWord = this.$refs.searchBar.searchWord.trim();
      if (!searchWord) {
        searchWord = this.$refs.searchBar.holderWord;
      }
      // 初始化滚动条位置
      Storage.remove("scroll_position");
      Storage.add("history_search", searchWord);
      this.historySearch = Storage.get("history_search").reverse();
      this.$router.push({
        name: "SearchResult",
        params: { searchWord: searchWord }
      });
    },
    historyItemTouchAction(item, index) {
      Storage.remove("scroll_position");
      this.$router.push({
        name: "SearchResult",
        params: { searchWord: item[this.historySearch.length - index - 1] }
      });
    },
    clearHistoryBtnTouchAction() {
      this.showConfirmBox = true;
    },
    confirmBoxEventAction(params) {
      if (params.choose) {
        Storage.remove("history_search");
        this.historySearch = Storage.get("history_search");
      }
      this.showConfirmBox = false;
    }
  },
  mounted() {
    this.axios
      .get(`${this.$global.SERVER_IP}/hotSearch`)
      .then(response => {
        this.hotSearch = response.data;
        this.searchRecommend = this.hotSearch[0];
      })
      .catch(error => {
        console.log(error);
      });
    if (this.$route.params.searchWord != undefined) {
      this.searchWord = this.$route.params.searchWord;
    }
    this.historySearch = Storage.get("history_search").reverse();
  }
};
</script>

<style scoped>
.header-bar {
  top: 0;
  z-index: 1000;
}
.search-btn {
  margin: 0 0.8rem;
}
.search-btn {
  padding: 0.3rem 0.5rem;
  border-radius: 0.3rem;
}
.body-container {
  padding: 0 1.3rem;
}
.history-search,
.hot-search > p {
  margin-top: 0.8rem;
}
.hot-search {
  margin-top: 1.6rem;
}
.history-search-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.clear-history-search {
  width: 1.1rem;
  height: 1.2rem;
  background-image: url("../../../static/icon/icon-clear.png");
  background-position: center;
  background-size: cover;
}
.search-list {
  display: flex;
  flex-wrap: wrap;
}
.search-list-item {
  margin: 0.8rem 0.8rem 0 0;
  padding: 0.2rem 0.8rem;
  color: #666;
  font-size: 0.8rem;
  background-color: #f0f2f5;
  border-radius: 0.2rem;
}
.hot-search .search-list-item:nth-child(-n + 3) {
  color: #e93b3d;
}
</style>
