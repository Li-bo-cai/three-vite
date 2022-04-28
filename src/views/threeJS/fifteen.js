import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Fifteen3d {
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
        this.camera.position.set(50, 260, -180)
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
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement)
    }
    addMesh() {
        let geometry = new THREE.BoxGeometry(40, 40, 40)

        let material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        })
        let mesh = new THREE.Mesh(geometry, material)
        //castshdow为true,receiveshadow为false, 这个说明球体是产生阴影的并不是接受阴影的。
        // 设置产生投影的网格模型
        mesh.castShadow = true;
        mesh.receiveShadow = false;

        //创建一个平面几何体作为投影面
        let planeGeometry = new THREE.PlaneGeometry(300, 200);
        let planeMaterial = new THREE.MeshLambertMaterial({
            color: 0x999999
        });
        // 平面网格模型作为投影面
        let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
        planeMesh.position.y = -50; //设置网格模型y坐标
        // 设置接收阴影的投影面
        planeMesh.receiveShadow = true;

        this.scene.add(mesh, planeMesh)
    }
    addPoint() {
        //点光源
        let point = new THREE.DirectionalLight(0xffffff, 1);
        point.position.set(50, 100, 20); //点光源位置
        // 设置用于计算阴影的光源对象
        point.castShadow = true;

        // 设置计算阴影的区域，最好刚好紧密包围在对象周围
        // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
        point.shadow.camera.near = 0.5;
        point.shadow.camera.far = 260;
        point.shadow.camera.left = -50;
        point.shadow.camera.right = 50;
        point.shadow.camera.top = 200;
        point.shadow.camera.bottom = -100;
        this.scene.add(point); //点光源添加到场景中
        // 设置mapSize属性可以使阴影更清晰，不那么模糊
        // point.shadow.mapSize.set(1024,1024)
        // //环境光
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

export default Fifteen3d