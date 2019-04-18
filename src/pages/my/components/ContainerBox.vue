<template>
  <div class="container-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ContainerBox"
};
</script>

<style scoped>
.container-box {
  margin-bottom: 1rem;
  padding: 0.8rem;
  background-color: #fff;
}
</style>