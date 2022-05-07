import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'

class ThreeThree3d {
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
        // LineCurve3创建直线段路径
        let path = new THREE.LineCurve3(new THREE.Vector3(0, 100, 0), new THREE.Vector3(0, 0, 0));
        // path:路径   40：沿着轨迹细分数  2：管道半径   25：越大即点越多，围成一个圆   Boolean 管道的两端是否闭合，默认值为false。
        let geometry = new THREE.TubeGeometry(path, 40, 2, 25, true);

        // 创建多段线条的顶点数据
        let p1 = new THREE.Vector3(-85.35, -35.36, 0)
        let p2 = new THREE.Vector3(-50, 0, 0);
        let p3 = new THREE.Vector3(0, 50, 0);
        let p4 = new THREE.Vector3(50, 0, 0);
        let p5 = new THREE.Vector3(85.35, -35.36, 0);
        // 创建线条一：直线
        let line1 = new THREE.LineCurve3(p1, p2);
        // 重建线条2：三维样条曲线
        let curve = new THREE.CatmullRomCurve3([p2, p3, p4]);
        // 创建线条3：直线
        let line2 = new THREE.LineCurve3(p4, p5);
        let CurvePath = new THREE.CurvePath();// 创建CurvePath对象
        CurvePath.curves.push(line1, curve, line2);// 插入多段线条
        //通过多段曲线路径创建生成管道
        //通过多段曲线路径创建生成管道，CCurvePath：管道路径
        let geometry2 = new THREE.TubeGeometry(CurvePath, 100, 5, 25, false);
        let geometry3 = new THREE.BufferGeometry()
        geometry3.setFromPoints([p1, p2, p3, p4, p5])

        let material = new THREE.LineBasicMaterial({
            color: '#f60',
        })
        let material1 = new THREE.PointsMaterial({
            color: '#f00',
            size: 5,
        })
        // let mesh = new THREE.Mesh(geometry, material)
        let mesh = new THREE.Mesh(geometry2, material)
        let point = new THREE.Points(geometry3, material1)

        this.scene.add(mesh, point)

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

export default ThreeThree3d