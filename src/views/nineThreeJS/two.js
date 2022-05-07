import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'

class TwoThree3d {
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

        // let geometry = new THREE.BufferGeometry()
        // let geometry1 = new THREE.BufferGeometry()

        // let pointArr = [
        //     new THREE.Vector3(-50, 20, 90),
        //     new THREE.Vector3(-10, 40, 40),
        //     new THREE.Vector3(0, 0, 0),
        //     new THREE.Vector3(60, -60, 0),
        //     new THREE.Vector3(7, 0, 80)
        // ]
        // // 样条曲线
        // let curve = new THREE.CatmullRomCurve3(pointArr)
        // let points = curve.getPoints(100)  //分段数10，返回11个顶点
        // geometry1.setFromPoints(pointArr)
        // geometry.setFromPoints(points)
        // let material = new THREE.PointsMaterial({
        //     color: '#f60',
        //     size: 5
        // })
        // let line = new THREE.Line(geometry, material)
        // let point = new THREE.Points(geometry1, material)
        // this.scene.add(line, point)

        let geometry = new THREE.BufferGeometry()
        let R = 40;  //圆弧半径
        let arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
        // 半圆弧的一个端点作为直线的一个端点
        let line1 = new THREE.LineCurve(new THREE.Vector2(R, 100, 0), new THREE.Vector2(R, 0, 0));
        let line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 100, 0));
        // 创建组合曲线对象CurvePath
        let CurvePath = new THREE.CurvePath();
        // 把多个线条插入到CurvePath中
        CurvePath.curves.push(line1, arc, line2);
        //分段数200
        let points = CurvePath.getPoints(200);
        // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
        geometry.setFromPoints(points);
        //材质对象
        let material = new THREE.LineBasicMaterial({
            color: 0x000000
        });
        //线条模型对象
        let line = new THREE.Line(geometry, material);
        this.scene.add(line); //线条对象添加到场景中


    }
    initLight() {
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

export default TwoThree3d