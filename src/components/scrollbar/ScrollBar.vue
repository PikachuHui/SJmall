<template>
  <div>
    <div class="scroll-container" :style="directed">
      <scroll-item
        v-for="(item, index) in itemList"
        :key="index"
        :text="item.name"
        :index="index + 1"
        :direct="direct"
        @clearItemActive="clearItemActiveAction"
        @clickItemEvent="clickItemEventAction"
        ref="scrollItem"
      ></scroll-item>
    </div>
  </div>
</template>

<script>
import ScrollItem from "./ScrollItem";

export default {
  name: "ScrollBar",
  props: {
    itemList: {
      type: Array,
      required: true
    },
    direct: {
      type: String,
      default: "row"
    }
  },
  components: {
    ScrollItem
  },
  data() {
    return {
      directed: {
        flexDirection: "row"
      }
    };
  },
  methods: {
    clearItemActiveAction() {
      if (this.$refs.scrollItem === undefined) {
        return;
      }
      this.$refs.scrollItem.forEach(item => {
        item.active = false;
      });
    },
    clickItemEventAction(params) {
      this.$emit("clickItemEvent", params);
    },
    setActiveStatus() {
      this.$refs.scrollItem.forEach(item => {
        item.setActiveStatus();
      });
    },
    setActivatedItem(index) {
      if (this.$refs.scrollItem === undefined) {
        return;
      }
      this.$refs.scrollItem.forEach((item, itemIndex) => {
        if (index - 1 === itemIndex) {
          item.active = true;
        }
      });
    }
  },
  mounted() {
    if (this.direct != "row") {
      this.directed.flexDirection = "column";
    }
  }
};
</script>

<style scoped>
.scroll-container {
  display: flex;
  align-items: center;
  overflow: scroll;
}
</style>
