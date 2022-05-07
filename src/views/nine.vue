<template>
  <div id="scene"></div>
</template>

<script setup>
import OneThree3d from "./nineThreeJS/one";
import TwoThree3d from "./nineThreeJS/two";
import ThreeThree3d from "./nineThreeJS/three";
import FourThree3d from "./nineThreeJS/four";
import { onMounted } from "vue";

onMounted(() => {
  //   new OneThree3d("#scene");
  //   new TwoThree3d("#scene");
  //   new ThreeThree3d("#scene");
  new FourThree3d("#scene");
});
</script>

<style lang="scss" scoped>
</style>