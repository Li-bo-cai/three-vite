import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'

class OneThree3d {
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
        this.initPoint()
        this.initControls()
    }
    initScene() {
        this.scene = new THREE.Scene()
    }
    initCamera() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
        this.camera.position.set(150, 100, 300)
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
        // let geometry = new THREE.CircleGeometry(40, 100)// 声明几何体对象
        //参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
        let arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI)
        // console.log(arc);
        let points = arc.getPoints(99); //分段数50，返回51个顶点
        // console.log(points);
        // geometry.setFromPoints(points)
        let shape = new THREE.Shape(points)
        let arcGeometry = shape.makeGeometry()
        let material = new THREE.LineBasicMaterial({
            color: 0x000000
        })

        let line = new THREE.Line(arcGeometry, material)
        console.log(line);
        this.scene.add(line)
    }
    initPoint() {
        //点光源
        let point = new THREE.PointLight("#f00");
        point.position.set(250, 20, 200); //点光源位置
        this.scene.add(point); //点光源添加到场景中
        //环境光
        let ambient = new THREE.AmbientLight(0x444444);
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

export default OneThree3d