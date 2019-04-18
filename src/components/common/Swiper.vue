<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) in pictures"
        :key="index"
        @click="$emit('clickSwiperEvent', {index: index})"
      >
        <img :src="item">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "Swiper",
  props: {
    pictures: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      default: () => {
        return {
          loop: true,
          autoplay: true
        };
      }
    }
  },
  mounted() {
    let that = this;
    let swiper = new Swiper(".swiper-container", {
      loop: that.config.loop,
      autoplay: that.config.autoplay,
      observer: true,
      pagination: {
        el: ".swiper-pagination",
        bulletActiveClass: "bullet-active",
        clickable: true
      }
    });
  }
};
</script>

<style>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-pagination-bullet {
  width: 0.3rem;
  height: 0.3rem;
  border: solid 1px #fff;
  background-color: rgba(255, 255, 255, 0);
  opacity: 1;
}
.bullet-active {
  background-color: #fff;
  opacity: 1;
}
img {
  width: 100%;
  height: 100%;
}
</style>