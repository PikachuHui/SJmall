<template>
  <div @click="$router.back()">
    <div class="icon-go-back"></div>
  </div>
</template>

<script>
export default {
  name: "GoBack"
};
</script>

<style scpoed>
.icon-go-back {
  width: 1.2rem;
  height: 1.2rem;
  background-image: url("../../../static/icon/icon-go-back.png");
  background-position: center;
  background-size: cover;
}
</style>
