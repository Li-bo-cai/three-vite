<template>
  <div id="scene"></div>
</template>

<script setup>
import Eight3d from "./threeJS/eight";
import Nine3d from "./threeJS/nine";
import Ten3d from "./threeJS/ten";
import Eleven3d from "./threeJS/eleven";
import Twelve3d from "./threeJS/twelve";
import Thirteen3d from "./threeJS/thirteen";
import { onMounted } from "vue";

onMounted(() => {
  // new Eight3d("#scene");
  // new Nine3d('#scene')
  // new Ten3d('#scene')
  // new Eleven3d('#scene')
  // new Twelve3d("#scene");
  new Thirteen3d("#scene");
});
</script>

<style lang="scss" scoped>
</style>