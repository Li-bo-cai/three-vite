<template>
  <div id="scene"></div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import OneThree3d from "./oneThreeJS/one";
import TwoThree3d from "./oneThreeJS/two";

onMounted(() => {
  //   new OneThree3d("#scene");
  new TwoThree3d("#scene");
});
</script>

<style lang="scss" scoped>
</style>