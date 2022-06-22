<template>
  <router-link to="/">跳转到1</router-link>
  <router-link to="/two">跳转到2</router-link>
  <router-link to="/three">跳转到3</router-link>
  <router-link to="/four">跳转到4</router-link>
  <router-link to="/five">跳转到5</router-link>
  <router-link to="/six">跳转到6</router-link>
  <router-link to="/seven">跳转到7</router-link>
  <router-link to="/eight">跳转到8</router-link>
  <router-link to="/nine">跳转到9</router-link>
  <router-view></router-view>
</template>

<script setup>
import appStore from './store'
console.log(appStore);
</script>

<style>
</style>
