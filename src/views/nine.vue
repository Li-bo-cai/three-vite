<template>
  <div id="scene"></div>
</template>

<script setup>
import OneThree3d from "./nineThreeJS/one";
import { onMounted } from "vue";

onMounted(() => {
  new OneThree3d("#scene");
});
</script>

<style lang="scss" scoped>
</style>