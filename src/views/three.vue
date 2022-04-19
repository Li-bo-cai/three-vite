<template>
    <div class="fontScene">
        <div id="scene"></div>
    </div>
</template>

<script setup>
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { nextTick } from 'vue';

// 创建了场景
const scene = new THREE.Scene();
// 创建了相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerWidth, 0.1, 3000)
// 创建了渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)

// 相机位置 
camera.position.set(300, 0, 1000);
// camera.lookAt(0, 0, 0)

// 定义材质
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })

var loader = new FontLoader();
loader.load('../../node_modules/three/examples/fonts/helvetiker_bold.typeface.json', function (font) {

    var geometry = new TextGeometry('Hello three.js!', {
        font: font,
        size: 60, //字体大小，默认值为100。
        height: 20, //挤出文本的厚度。默认值为50。
        curveSegments: 12, //（表示文本的）曲线上点的数量。默认值为12
        bevelEnabled: false,//是否开启斜角，默认为false。
        bevelThickness: 0, //文本上斜角的深度，默认值为20
        bevelSize: 0, //斜角与原始文本轮廓之间的延伸距离。默认值为8
        bevelSegments: 0 //斜角的分段数。默认值为3。
    });
    const mesh = new THREE.Mesh(geometry, material);
    nextTick(() => {
        const container = document.querySelector('#scene');
        scene.add(mesh)
        container.appendChild(renderer.domElement);
        renderer.render(scene, camera);
    })
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        // mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
});

</script>

<style lang="scss" scoped>
.fontScene {
    position: relative;
    z-index: 9;
}

#scene {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
    z-index: 100;
    display: block;
}
</style>