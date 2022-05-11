<template>
  <div id="scene"></div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import OneThree3d from "./twoThreeJS/one";

onMounted(() => {
  new OneThree3d("#scene");
});
</script>

<style lang="scss" scoped>
</style>