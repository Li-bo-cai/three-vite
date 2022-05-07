import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Thirteen3d {
    constructor(selector) {
        this.container = document.querySelector(selector)
        this.scene
        this.camera
        this.renderer
        this.init()
        this.anmate()
    }
    init() {
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.initControls()
        this.addMesh();
        this.addLight()
    }
    initScene() {
        this.scene = new THREE.Scene();
    }
    initCamera() {
        let width = window.innerWidth
        let height = window.innerHeight
        // let k = width / height; //窗口宽高比
        // let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        // this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
        this.camera.position.set(500, 200, 500)
        this.camera.lookAt(0, 0, 0)
    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        // 设置屏幕像素比
        this.renderer.setPixelRatio(window.devicePixelRatio)
        // 渲染的尺寸大小
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        //设置背景颜色
        // this.renderer.setClearColor(0xb9d3ff, 1);
        this.container.appendChild(this.renderer.domElement)
    }
    addMesh() {
        let geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry

        // 点渲染模式
        // let material = new THREE.PointsMaterial({
        //     color: "#f00",
        //     size: 5.0
        // })  
        // let mesh = new THREE.Points(geometry, material) //点模型对象


        // 线条渲染模式
        var material = new THREE.LineBasicMaterial({
            color: 0xff0000 //线条颜色
        });
        let mesh = new THREE.Line(geometry, material)  //线条模型对象

        this.scene.add(mesh)
    }
    addLight() {
        //点光源
        let point = new THREE.PointLight("#f00");
        point.position.set(250, 20, 200); //点光源位置
        this.scene.add(point); //点光源添加到场景中
        // //环境光
        // let ambient = new THREE.AmbientLight(0x444444);
        // this.scene.add(ambient);
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

export default Thirteen3d