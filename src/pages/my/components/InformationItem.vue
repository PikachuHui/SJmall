<template>
  <div>
    <div class="container">
      <div style="flex: 1">
        <slot></slot>
      </div>
      <div class="see-more" v-if="showMore"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformationItem",
  props: {
    showMore: {
      default: true
    }
  }
};
</script>

<style scoped>
.container {
  padding: 1rem 0;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #f0f0f0;
}
.see-more {
  width: 1.2rem;
  height: 1.2rem;
  background-image: url("../../../../static/icon/icon-see-more.png");
  background-size: cover;
  background-position: center;
}
</style>