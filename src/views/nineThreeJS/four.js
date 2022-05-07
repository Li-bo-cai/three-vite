import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'

class FourThree3d {
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
        /**
        * 创建旋转网格模型
        */
        let points = [
            new THREE.Vector2(50, 60),
            new THREE.Vector2(25, 0),
            new THREE.Vector2(50, -60)
        ];
        // points — 一个Vector2对象数组。每个点的X坐标必须大于0。
        // segments — 要生成的车削几何体圆周分段的数量，默认值是12。
        // phiStart — 以弧度表示的起始角度，默认值为0。
        // phiLength — 车削部分的弧度（0-2PI）范围，2PI将是一个完全闭合的、完整的车削几何体，小于2PI是部分车削。默认值是2PI。
        let geometry = new THREE.LatheGeometry(points, 30, 0, Math.PI);
        let material = new THREE.MeshPhongMaterial({
            color: 0x0000ff,//三角面颜色
            side: THREE.DoubleSide//两面可见
        });//材质对象
        material.wireframe = true;//线条模式渲染(查看细分数)
        let mesh = new THREE.Mesh(geometry, material);//旋转网格模型对象
        this.scene.add(mesh);//旋转网格模型添加到场景中
    }
    initLight() {
        // //点光源
        // let point = new THREE.PointLight("#f00");
        // point.position.set(250, 20, 200); //点光源位置
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

export default FourThree3d