<template>
    <div id="scene"></div>
</template>

<script setup>
import * as THREE from 'three'

// 创建了场景
const scene = new THREE.Scene()
// 创建了相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 创建了渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube);

// 线条渲染模式
let material2 = new THREE.LineBasicMaterial({
    color: 0xff0000 //线条颜色
});//材质对象
let line = new THREE.Line(geometry, material2);//线条模型对象
scene.add(line);//线条对象添加到场景中

camera.position.z = 5;


function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    line.rotation.x += 0.01;
    line.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

</script>

<style lang="scss" scoped>
</style>