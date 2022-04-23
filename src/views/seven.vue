<template>
  <div id="scene"></div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
  initControls()
}
function initScene() {
  scene = new THREE.Scene();
}

function initCamera() {
  let width = window.innerWidth; //窗口宽度
  let height = window.innerHeight; //窗口高度
  let k = width / height; //窗口宽高比
  let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
  // camera = new THREE.OrthographicCamera(-s * k, s * k, s, s, 1000);
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.set(150, 100, 300);
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
    0, //顶点4坐标
    0,
    0,
    100, //顶点5坐标
    50,
    0,
    0, //顶点6坐标
  ]);
  let color = new Float32Array([
    1, 0, 0, .5,//顶点1颜色
    0, 1, 0, .5,//顶点2颜色
    0, 0, 1,//顶点3颜色
    1, 1, 0,//顶点4颜色
    0, 1, 1,//顶点5颜色
    1, 0, 1 //顶点6颜色
  ])
  var normals = new Float32Array([
    0, 0, 1, //顶点1法向量
    0, 0, 1, //顶点2法向量
    0, 0, 1, //顶点3法向量

    0, 1, 0, //顶点4法向量
    0, 1, 0, //顶点5法向量
    0, 1, 0, //顶点6法向量
  ]);
  // 访问几何体顶点位置数据
  geometry.attributes.position = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
  // 访问几何体顶点颜色数据
  // geometry.attributes.color = new THREE.BufferAttribute(color, 3)   //顶点颜色设置
  // 访问几何体顶点法向量数据
  geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的法向量数据
  // 三角面(网格)渲染模式
  let material = new THREE.MeshPhongMaterial({
    color: '0x0000ff', //三角面颜色
    // vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide, //点对象像素尺寸
  }); //材质对象
  let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  scene.add(mesh); //点对象添加到场景中

  // 点渲染模式
  // let material = new THREE.PointsMaterial({
  //   // color: 0xff0000,
  //   vertexColors: THREE.VertexColors, //以顶点颜色为准
  //   size: 10.0 //点对象像素尺寸
  // }); //材质对象
  // let points = new THREE.Points(geometry, material); //点模型对象
  // scene.add(points); //点对象添加到场景中

  // 线条渲染模式
  // let material2 = new THREE.LineBasicMaterial({
  //   color: 0xff0000 //线条颜色
  // });//材质对象
  // let line = new THREE.Line(geometry, material2);//线条模型对象
  // scene.add(line);//线条对象添加到场景中

}
function initPoint() {
  //点光源
  let point = new THREE.PointLight("#f00");
  point.position.set(0, 100, 200); //点光源位置
  scene.add(point); //点光源添加到场景中
  //环境光
  let ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);
}

function render() {
  renderer.render(scene, camera);
}

function initControls() {
  //创建控件对象
  let controls = new OrbitControls(camera, renderer.domElement);
}

function animate() {
  renderer.setAnimationLoop(render.bind(this)); //周期性渲染
}
</script>

<style lang="scss" scoped>
</style>