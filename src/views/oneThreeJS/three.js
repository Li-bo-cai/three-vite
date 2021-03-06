import * as THREE from 'three'
import { DoubleSide } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
class ThreeThree3d {
    constructor(selector) {
        this.container = document.querySelector(selector)
        this.scene
        this.camera
        this.renderer
        this.init()
        this.anmate()
    }
    init() {
        this.initScene()
        this.initCamera()
        this.initRenderer()
        this.initMesh()
        this.initLight()
        this.initControls()
    }
    initScene() {
        this.scene = new THREE.Scene()
    }
    initCamera() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
        this.camera.position.set(0, 0, 300)
        this.camera.lookAt(0, 0, 0)
    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        // 设置屏幕像素比
        this.renderer.setPixelRatio(window.devicePixelRatio)
        // 渲染的尺寸大小
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        //设置背景颜色
        this.renderer.setClearColor(0xb9d3ff, 1);
        this.container.appendChild(this.renderer.domElement)
    }
    initMesh() {

        let video = document.createElement('video')
        video.src = "./video/无关过往.mp4";
        video.muted = true;
        video.controls = true
        console.log(video);
        // video.autoplay = "autoplay";
        video.play()


        let texture = new THREE.VideoTexture(video)

        // let geometry = new THREE.PlaneGeometry(108, 71);
        let geometry = new THREE.BoxGeometry(100, 100, 100)

        let material = new THREE.MeshBasicMaterial({ map: texture, side: DoubleSide })

        material.map = texture;
        // mainObjcet.material = material;

        let mesh = new THREE.Mesh(geometry, material)
        this.scene.add(mesh)
    }
    initLight() {
        // 点光源
        // let point = new THREE.PointLight("#f00");
        // point.position.set(250, 20, 200); //点光源位置
        // this.scene.add(point); //点光源添加到场景中
        //环境光
        let ambient = new THREE.AmbientLight("#fff");
        this.scene.add(ambient);
    }
    render() {
        this.renderer.render(this.scene, this.camera)
    }
    initControls() {
        //创建控件对象
        let controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
    anmate() {
        this.renderer.setAnimationLoop(this.render.bind(this))
    }
}

export default ThreeThree3d