<template>
    <div id="scene"></div>
</template>

<script setup>
import { nextTick } from 'vue';
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// 导入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 创建了场景
const scene = new THREE.Scene()
// 创建了相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
// 创建了渲染器
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
nextTick(() => {
    document.querySelector('#scene').appendChild(renderer.domElement);
    
    new RGBELoader().setPath('./').load('妹子.hdr', (texture) => {
        console.log(texture);
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture
    })
    const controls = new OrbitControls(camera, renderer.domElement)
    renderer.render(scene, camera)
})
</script>

<style lang="scss" scoped>
</style>