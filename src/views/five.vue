<template>
  <div id="scene"></div>
</template>

<script setup>
import * as THREE from "three";
import { onMounted } from "vue";
// 导入控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene;
let camera;
let renderer;
let mesh;

onMounted(() => {
  init();
  animate();
});
function init() {
  // 初始化场景
  initScene();
  // 初始化相机
  initCamera();
  // 初始化渲染器
  initRenderer();
  // 创建模型
  initModule();
  // 创建控制器
  initControls();
  // 创建光源
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
  //创建相机对象
  camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  camera.position.set(500, 500, 500);
  camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
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
  // 创建网格模型
  let geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
  let material = new THREE.MeshLambertMaterial({ color: "#f60" }); //材质对象Material
  mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh);
  // 立方体网格模型
  let geometry1 = new THREE.BoxGeometry(150, 150, 150);
  let material1 = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
    opacity: 0.5,
    transparent: true,
  }); //材质对象Material
  let mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
  scene.add(mesh1);
}

function initPoint() {
  //点光源
  let point = new THREE.PointLight("#f00");
  point.position.set(0, 200, 300); //点光源位置
  scene.add(point); //点光源添加到场景中
  //环境光
  let ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
}

function render() {
  renderer.render(scene, camera);
  mesh.rotateX(0.01); //每次绕X轴旋转0.01弧度
  mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
  mesh.rotateZ(0.01); //每次绕Z轴旋转0.01弧度
}

function animate() {
  renderer.setAnimationLoop(render.bind(this)); //周期性渲染
}
function initControls() {
  //创建控件对象
  let controls = new OrbitControls(camera, renderer.domElement);
  //监听鼠标、键盘事件（没必要 因为requestAnimationFrame()会不停的调用渲染函数。 setAnimationLoop也会）
  controls.addEventListener("change", (e) => {
    console.log(e);
  });
}
</script>

<style lang="scss" scoped>
</style>