<template>
  <div>
    <div
      v-if="direction"
      class="item"
      :class="{columnActive: active}"
      @click="touchItemEventAction"
    >{{text}}</div>
    <div
      v-else
      class="item rowItem"
      :class="{rowActive: active}"
      @click="touchItemEventAction"
    >{{text}}</div>
  </div>
</template>

<script>
export default {
  name: "ScrollItem",
  props: {
    text: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    direct: {
      type: String,
      default: "row"
    }
  },
  data() {
    return {
      active: false,
      direction: false
    };
  },
  methods: {
    touchItemEventAction() {
      // 通知父组件ScrollBar初始化所有子组件ScrollItem的active属性
      this.$emit("clearItemActive");
      this.$emit("clickItemEvent", { id: this.index });
      this.active = true;
    },
    // 初始化首位子项
    setActiveStatus() {
      if (this.index == 1) {
        this.active = true;
      }
    }
  },
  mounted() {
    if (this.direct != "row") {
      this.direction = true;
    }
  }
};
</script>

<style scoped>
.item {
  padding: 0.8rem;
  min-width: 3.6rem;
  max-width: 3.6rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.rowItem {
  min-width: calc(3.6rem + 2px);
  max-width: calc(3.6rem + 2px);
}
.rowActive {
  color: #009c4c;
  font-weight: bold;
}
.columnActive {
  color: #009c4c;
  background-color: #fff;
  border-left: solid 2px #009c4c;
}
</style>