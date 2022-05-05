import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Eight3d {
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
    addMesh() {
        let geometry = new THREE.BufferGeometry()
        let p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
        let p2 = new THREE.Vector3(0, 100, 0); //顶点2坐标
        let p3 = new THREE.Vector3(50, 0, 0); //顶点3坐标
        let p4 = new THREE.Vector3(0, 0, 100); //顶点4坐标

        let pointArray = []
        pointArray.push(p1, p2, p3, p4);

        geometry.setFromPoints(pointArray) //传入顶点数组

        let indexes = new Uint32Array([0, 1, 2, 0, 2, 3])
        geometry.index = new THREE.BufferAttribute(indexes, 1)
        // 三角面(网格)渲染模式
        let material = new THREE.MeshBasicMaterial({
            color: 0x0000ff, //三角面颜色
            // vertexColors: THREE.VertexColors, //以定点颜色为准
            side: THREE.DoubleSide, //点对象像素尺寸 两面可见
        }); //材质对象
        // console.log(geometry);
        let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        this.scene.add(mesh)
    }
    addPoint() {
        //点光源
        let point = new THREE.PointLight("#f00");
        point.position.set(0, 100, 200); //点光源位置
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

export default Eight3d