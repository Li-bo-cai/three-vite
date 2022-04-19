<template>
    <div id="sceneline"></div>
</template>

<script setup>
import { nextTick } from 'vue';
import * as THREE from 'three'

// 创建了场景
const scene = new THREE.Scene();
// 创建了相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerWidth, 0.1, 1000)
// 创建了渲染器
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight)

// 相机位置 
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0)

// 定义材质
const material = new THREE.LineBasicMaterial({ color: 0x0000ff })

// 定义顶点
const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([-10, 0, 0, 0, 10, 0, 10, 0, 0]);

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const line = new THREE.Line(geometry, material)

nextTick(() => {
    const container = document.querySelector('#sceneline');
    scene.add(line);

    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
})

</script>

<style lang="scss" scoped>
</style>