import * as THREE from 'three'
import { BufferGeometry } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'

class SixThree3d {
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
        this.camera.position.set(0, 0, 600)
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
        let geometry0 = new THREE.BufferGeometry()
        geometry0.setFromPoints([new THREE.Vector3(0, 0, 0)])
        let material0 = new THREE.PointsMaterial({
            color: '#00f',
            size: 5
        })
        let mesh0 = new THREE.Points(geometry0, material0)


        let shape = new THREE.Shape();
        /**四条直线绘制一个矩形轮廓*/
        shape.moveTo(0, 0);//起点
        shape.lineTo(0, 10);//第2点
        shape.lineTo(10, 10);//第3点
        shape.lineTo(10, 0);//第4点
        shape.lineTo(0, 0)

        let points = [
            new THREE.Vector3(-10, -50, -50),
            new THREE.Vector3(10, 0, 0),
            new THREE.Vector3(8, 50, 50),
            new THREE.Vector3(-5, 0, 100)
        ]

        // 创建轮廓的扫描轨迹
        let curve = new THREE.CatmullRomCurve3(points)

        let geometry = new THREE.ExtrudeGeometry(//拉伸造型
            shape,//二维轮廓
            {
                // amount: 120,//拉伸长度
                bevelEnabled: false,//无倒角
                extrudePath: curve,  //选择扫描轨迹
                steps: 50//扫描方向分数
            }
        );
        let shapeGeometry = new THREE.ShapeGeometry(shape, 10)

        let geometry1 = new BufferGeometry().setFromPoints(points)

        let material = new THREE.PointsMaterial({
            color: '#f60',
            size: 5
        })

        let material1 = new THREE.MeshBasicMaterial({
            color: '#f00',
            side: THREE.DoubleSide, //点对象像素尺寸 两面可见
            // wireframe: true
        })


        let mesh = new THREE.Mesh(geometry, material)
        let mesh1 = new THREE.Points(geometry1, material)
        let mesh2 = new THREE.Mesh(shapeGeometry, material1)

        this.scene.add(mesh0, mesh, mesh1, mesh2)


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

export default SixThree3d