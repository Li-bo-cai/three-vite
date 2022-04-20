<template>
    <div id="scene-four"></div>
</template>

<script setup>
import { nextTick } from 'vue';
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// 导入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let scene
let camera
let renderer

nextTick(() => {
    init()
    anmate()
})

function init() {
    initScene()
    initCamera()
    initRanderer()
    initControls()
}
// 创建场景
function initScene() {
    scene = new THREE.Scene()
    setEnvMap('000')
}
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
    camera.position.set(300, 0, 1000);
}
function initRanderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // 设置屏幕像素比
    renderer.setPixelRatio(window.devicePixelRatio)
    // 渲染尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('#scene-four').appendChild(renderer.domElement);
}
function setEnvMap(hdr) {
    new RGBELoader().setPath('./').load(hdr + '.hdr', (texture) => {
        console.log(texture);
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture
    })
}
function render() {
    renderer.render(scene, camera)
}
function anmate() {
    renderer.setAnimationLoop(render())
}
function initControls() {
    new OrbitControls(camera, renderer.domElement)
}
</script>

<style lang="scss" scoped>
</style>