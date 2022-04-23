<template>
    <div id="scene"></div>
</template>

<script setup>
import Eight3d from './threeJS/eight'
import { onMounted } from 'vue';

onMounted(() => {
    new Eight3d('scene')
})


</script>

<style lang="scss" scoped>
</style>