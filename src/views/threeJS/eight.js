import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Eight3d {
    constructor(selector) {
        this.container = document.querySelector(selector)
        this.scene
        this.camera
        this.renderer
        this.point
        this.init()
        this.anmate()
    }
    init() {
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.addMesh();
        this.addPoint()
        this.initControls()
    }
    initScene() {
        this.scene = new THREE.Scene();
    }
    initCamera() {
        let width = window.innerWidth
        let height = window.innerHeight
        let k = width / height; //窗口宽高比
        let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
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
        this.geometry = new THREE.BufferGeometry()
        //类型数组创建顶点位置position数据
        let vertices = new Float32Array([
            0, 0, 0,
            80, 0, 0,
            80, 80, 0,
            0, 80, 0
        ])
        this.geometry.addAttribute.position = new THREE.BufferAttribute(vertices, 3)
        let normals = new Float32Array([
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ])
        this.geometry.attributes.normals = new THREE.BufferAttribute(normals, 3)

        let indexes = new Uint16Array([0, 1, 2, 0, 2, 3])
        this.geometry.index = new THREE.BufferAttribute(indexes, 1)

        this.material = new THREE.MeshPhongMaterial({
            color: 0x0000ff, //三角面颜色
            // vertexColors: THREE.VertexColors,
            side: THREE.DoubleSide, //点对象像素尺寸
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material); //网格模型对象Mesh
        this.scene.add(this.mesh); //点对象添加到场景中
    }
    addPoint() {
        //点光源
        this.point = new THREE.PointLight("#f00");
        this.point.position.set(0, 100, 200); //点光源位置
        this.scene.add(this.point); //点光源添加到场景中
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