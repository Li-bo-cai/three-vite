<template>
  <div id="scene"></div>
</template>

<script setup>
import Eight3d from "./eightThreeJS/eight";
import Nine3d from "./eightThreeJS/nine";
import Ten3d from "./eightThreeJS/ten";
import Eleven3d from "./eightThreeJS/eleven";
import Twelve3d from "./eightThreeJS/twelve";
import Thirteen3d from "./eightThreeJS/thirteen";
import Fourteen3d from "./eightThreeJS/fourteen";
import Fifteen3d from "./eightThreeJS/fifteen";
import Sixteen3d from "./eightThreeJS/sixteen";
import Seventeen3d from "./eightThreeJS/seventeen";
import { onMounted } from "vue";

onMounted(() => {
  // new Eight3d("#scene");
  // new Nine3d('#scene')
  // new Ten3d('#scene')
  // new Eleven3d('#scene')
  // new Twelve3d("#scene");
  // new Thirteen3d("#scene");
  // new Fourteen3d("#scene");
  // new Fifteen3d("#scene");
  // new Sixteen3d("#scene");
  new Seventeen3d("#scene");
});
</script>

<style lang="scss" scoped>
</style>