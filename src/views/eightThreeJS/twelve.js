import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Twelve3d {
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
        this.addPoint()
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
        this.renderer.setClearColor(0xb9d3ff, 1);
        this.container.appendChild(this.renderer.domElement)
    }
    addMesh() {
        let geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        // 几何体xyz三个方向都放大2倍
        geometry.scale(2, 2, 2);
        // 几何体沿着x轴平移50
        geometry.translate(50, 0, 0);
        // 几何体绕着x轴旋转45度
        geometry.rotateX(Math.PI / 4);
        // 居中：偏移的几何体居中
        geometry.center();
        let material = new THREE.MeshPhongMaterial({
            color: new THREE.Color('#fff'),
            // vertexColors: THREE.DstColorFactor,
            // wireframe:true,//线框模式渲染
            // side: THREE.FrontSide, // 前面FrontSide  背面：BackSide 双面：DoubleSide
            transparent: true, // transparent设置为true，开启透明，否则opacity不起作用
            opacity: 0.8,
        }); //材质对象Material
        let mesh = new THREE.Mesh(geometry, material)
        this.scene.add(mesh)
    }
    addPoint() {
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

export default Twelve3d