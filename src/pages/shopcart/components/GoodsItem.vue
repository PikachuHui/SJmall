<template>
  <div class="body-container">
    <img :src="goods.image" class="goods-image" @click="openGoodsDetail">
    <div>
      <p class="goods-name" @click="openGoodsDetail">{{goods.name}}</p>
      <div class="total-controller">
        <div style="display: flex;align-items: center">
          <format-price
            :price="goods.price"
            :integerStyle="{fontWeight: 'normal'}"
            style="fontSize: 1rem"
          ></format-price>
          <span class="goods-standard">/ {{goods.standard}}</span>
        </div>
        <number-control
          @valueChange="valueChangeAction"
          :value="goods.total"
          :minValue="1"
          class="number-control"
        ></number-control>
      </div>
    </div>
  </div>
</template>

<script>
import FormatPrice from "../../../components/common/FormatPrice";
import NumberControl from "../../../components/common/NumberControl";

export default {
  name: "GoodsItem",
  props: {
    goods: {
      type: Object,
      required: true
    }
  },
  components: {
    FormatPrice,
    NumberControl
  },
  data() {
    return {
      isSelected: false
    };
  },
  methods: {
    itemSelectAction(params) {
      this.isSelected = params.isSelected;
    },
    openGoodsDetail() {
      this.$router.push({ name: "GoodsDetail", params: { id: this.goods.id } });
    },
    valueChangeAction(params) {
      params.itemId = this.goods.id;
      this.goods.total = params.newvalue;
      this.$emit("valueChange", params);
      console.log(params);
    }
  }
};
</script>

<style scoped>
.body-container {
  display: flex;
  align-items: flex-start;
}
.goods-image {
  min-width: 6.8rem;
  max-width: 6.8rem;
  min-height: 6.8rem;
  max-height: 6.8rem;
}
.goods-name {
  margin-top: 0.5rem;
}
.number-control {
  right: 0.5rem;
  position: absolute;
}
.total-controller {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  flex: 1;
}
.goods-standard {
  margin-left: 0.3rem;
  padding-top: 0.3rem;
  color: #888;
  font-size: 0.8rem;
}
</style>