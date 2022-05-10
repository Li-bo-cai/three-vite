<template>
  <div id="scene"></div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import OneThree3d from "./oneThreeJS/one";
import TwoThree3d from "./oneThreeJS/two";
import ThreeThree3d from "./oneThreeJS/three";
import FourThree3d from "./oneThreeJS/four";

onMounted(() => {
  // new OneThree3d("#scene");
  // new TwoThree3d("#scene");
  // new ThreeThree3d("#scene");
  new FourThree3d("#scene");
});
</script>

<style lang="scss" scoped>
</style>