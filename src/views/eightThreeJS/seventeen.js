import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Seventeen3d {
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
        // 头部网格模型和组
        let headMesh = sphereMesh(10, 0, -1, 0);
        headMesh.name = "脑壳"
        let leftEyeMesh = sphereMesh(1, 8, 4, 4);
        leftEyeMesh.name = "左眼"
        let rightEyeMesh = sphereMesh(1, 8, 4, -4);
        rightEyeMesh.name = "右眼"
        let headGroup = new THREE.Group();
        headGroup.name = "头部"
        headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
        // 身体网格模型和组
        let neckMesh = cylinderMesh(3, 10, 0, -15, 0);
        neckMesh.name = "脖子"
        let bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
        bodyMesh.name = "腹部"
        let leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
        leftLegMesh.name = "左腿"
        let rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
        rightLegMesh.name = "右腿"
        let legGroup = new THREE.Group();
        legGroup.name = "腿"
        legGroup.add(leftLegMesh, rightLegMesh);
        let bodyGroup = new THREE.Group();
        bodyGroup.name = "身体"
        bodyGroup.add(neckMesh, bodyMesh, legGroup);
        // 人Group
        let personGroup = new THREE.Group();
        personGroup.name = "人"
        personGroup.add(headGroup, bodyGroup)

        personGroup.translateY(50)

        this.scene.add(personGroup);

        // 球体网格模型创建函数
        function sphereMesh(R, x, y, z) {
            let geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
            let material = new THREE.MeshPhongMaterial({
                color: 0x0000ff
            }); //材质对象Material
            let mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
            mesh.position.set(x, y, z);
            return mesh;
        }
        // 圆柱体网格模型创建函数
        function cylinderMesh(R, h, x, y, z) {
            let geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
            let material = new THREE.MeshPhongMaterial({
                color: 0x0000ff
            }); //材质对象Material
            let mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
            mesh.position.set(x, y, z);
            return mesh;
        }

        console.log(this.scene);

        this.scene.traverse(function (obj) {
            if (obj.type === "Group") {
                console.log(obj.name);
            }
            if (obj.type === "Mesh") {
                console.log('  ' + obj.name);
                obj.material.color.set(0xffff00);
            }
            if (obj.name === "左眼" | obj.name === "右眼") {
                obj.material.color.set(0x000000)
            }
            // // 打印id属性
            // console.log(obj.id);
            // // 打印该对象的父对象
            // console.log(obj.parent);
            // // 打印该对象的子对象
            // console.log(obj.children);
        })
        // // 遍历查找scene中复合条件的子对象，并返回id对应的对象
        // let idNode = this.scene.getObjectById(4);
        // console.log(idNode);

        // 遍历查找对象的子对象，返回name对应的对象（name是可以重名的，返回第一个）
        let nameNode = this.scene.getObjectByName("左腿");
        nameNode.material.color.set(0xff0000);

    }
    addPoint() {
        //点光源
        // let point = new THREE.PointLight("#fff");
        // point.position.set(0, 100, 200); //点光源位置
        // this.scene.add(point); //点光源添加到场景中
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

export default Seventeen3d