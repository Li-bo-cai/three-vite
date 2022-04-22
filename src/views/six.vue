<template>
  <div id="scene"></div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import * as THREE from "three";

let scene;
let camera;
let renderer;

onMounted(() => {
  init();
  animate();
});
function init() {
  initScene();
  initCamera();
  initRenderer();
  initModule();
  initPoint();
}
function initScene() {
  scene = new THREE.Scene();
}

function initCamera() {
  let width = window.innerWidth; //窗口宽度
  let height = window.innerHeight; //窗口高度
  let k = width / height; //窗口宽高比
  let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
  camera = new THREE.OrthographicCamera(-s * k, s * k, s, s, 1000);
  camera.position.set(500, 500, 500);
  camera.lookAt(0, 0, 0);
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  // 设置屏幕像素比
  renderer.setPixelRatio(window.devicePixelRatio);
  // 渲染尺寸大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  //设置背景颜色
  renderer.setClearColor(0xb9d3ff, 1);
  document.querySelector("#scene").appendChild(renderer.domElement);
}

function initModule() {
  let geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
  //类型数组创建顶点数据
  let vertices = new Float32Array([
    0,
    0,
    0, //顶点1坐标
    50,
    0,
    0, //顶点2坐标
    0,
    100,
    0, //顶点3坐标
    0,
    0,
    10, //顶点4坐标
    0,
    0,
    100, //顶点5坐标
    50,
    0,
    10, //顶点6坐标
  ]);
  // 创建属性缓冲区对象
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  // let attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
  // 设置几何体attributes属性的位置属性
  //   geometry.attributes.position = attribue;
  // 三角面(网格)渲染模式
  let material = new THREE.MeshBasicMaterial({
    color: 0x0000ff, //三角面颜色
    side: THREE.DoubleSide, //点对象像素尺寸
  }); //材质对象
  let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

  //   let points = new THREE.Points(geometry, material); //点模型对象
  scene.add(mesh); //点对象添加到场景中
}
function initPoint() {}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  render();
}
</script>

<style lang="scss" scoped>
</style>