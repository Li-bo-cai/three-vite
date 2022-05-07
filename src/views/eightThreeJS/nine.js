import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Nine3d {
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
        this.initControls();
        this.addMesh();
        this.addLight();
    }
    initScene() {
        this.scene = new THREE.Scene();
    }
    initCamera() {
        let width = window.innerWidth
        let height = window.innerHeight
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
        this.camera.position.set(150, 100, 300)
        this.camera.lookAt(0, 0, 0)
    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setClearColor(0xb9d3ff, 1)
        this.container.appendChild(this.renderer.domElement)
    }
    addMesh() {
        this.geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
        //类型数组创建顶点数据
        let vertices = new Float32Array([
            0, 0, 0, //顶点1坐标
            80, 0, 0, //顶点2坐标
            80, 80, 0, //顶点3坐标
            0, 80, 0, //顶点4坐标
        ]);
        let color = new Float32Array([
            1, 0, 0,//顶点1颜色
            0, 1, 0,//顶点2颜色
            0, 0, 1,//顶点3颜色
            1, 1, 0,//顶点4颜色
            0, 1, 1,//顶点5颜色
            1, 0, 1 //顶点6颜色
        ])
        let normals = new Float32Array([
            0, 0, 1, //顶点1法向量
            0, 0, 1, //顶点2法向量
            0, 0, 1, //顶点3法向量
            0, 0, 1, //顶点4法向量
        ]);
        let indexes = new Uint32Array([0, 1, 2, 0, 2, 3])
        // 访问几何体顶点位置数据
        this.geometry.attributes.position = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
        // 访问几何体顶点颜色数据
        this.geometry.attributes.color = new THREE.BufferAttribute(color, 3)   //顶点颜色设置
        // 访问几何体顶点法向量数据
        this.geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的法向量数据

        this.geometry.index = new THREE.BufferAttribute(indexes, 1)
        // 三角面(网格)渲染模式
        let material = new THREE.MeshPhongMaterial({
            color: 0x0000ff, //三角面颜色
            // vertexColors: THREE.VertexColors, //以定点颜色为准
            side: THREE.DoubleSide, //点对象像素尺寸 两面可见
        }); //材质对象
        let mesh = new THREE.Mesh(this.geometry, material); //网格模型对象Mesh
        this.scene.add(mesh); //点对象添加到场景中
    }
    addLight() {
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

export default Nine3d