<template>
  <div id="scene"></div>
</template>

<script setup>
import Eight3d from "./threeJS/eight";
import Nine3d from "./threeJS/nine";
import Ten3d from "./threeJS/ten";
import { onMounted } from "vue";

onMounted(() => {
  new Eight3d("#scene");
  // new Nine3d('#scene')
  // new Ten3d('#scene')
});
</script>

<style lang="scss" scoped>
</style>