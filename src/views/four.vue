<template>
  <div id="scene-four"></div>
</template>

<script setup>
import { nextTick, onMounted } from "vue";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 导入模型解析器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let scene;
let camera;
let renderer;

onMounted(() => {
  init();
  anmate();
});

function init() {
  initScene();
  initCamera();
  initRanderer();
  initControls();
}
// 创建场景
function initScene() {
  scene = new THREE.Scene();
  setEnvMap();
}
function initCamera() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    400
  );
  camera.position.set(-1, 8, 0.6, 2.7);
}
function initRanderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  // 设置屏幕像素比
  renderer.setPixelRatio(window.devicePixelRatio);
  // 渲染尺寸大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector("#scene-four").appendChild(renderer.domElement);
}
function setEnvMap() {
  new RGBELoader().setPath("./").load("000.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });
  new GLTFLoader().load(
    "https://gw.alipayobjects.com/os/bmw-prod/150e44f6-7810-4c45-8029-3575d36aff30.gltf",
    (gltf) => {
      console.log(gltf);
      scene.add(gltf.scene);
    }
  );
}

function render() {
  renderer.render(scene, camera);
}
function anmate() {
  renderer.setAnimationLoop(render.bind(this));
}
function initControls() {
  new OrbitControls(camera, renderer.domElement);
}
</script>

<style lang="scss" scoped>
</style>