import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'

class FiveThree3d {
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
            color: '#f00',
            size: 5
        })
        let mesh0 = new THREE.Points(geometry0, material0)

        // let points = [
        //     new THREE.Vector2(-50, -50),
        //     new THREE.Vector2(-60, 0),
        //     new THREE.Vector2(0, 50),
        //     new THREE.Vector2(60, 0),
        //     new THREE.Vector2(50, -50),
        //     new THREE.Vector2(-50, -50),
        // ]
        // // 通过顶点定义轮廓
        // let shape = new THREE.Shape(points);  //Shape继承于Path  
        // // x, y -- 弧线的绝对中心。 radius -- 弧线的半径。startAngle-- 起始角，以弧度来表示。endAngle-- 终止角，以弧度来表示。clockwise -- 以顺时针方向创建（扫过）弧线。默认值为false。
        // shape.absarc(0, 0, 60, 0, 2 * Math.PI, true)
        // console.log(shape.getPoints());
        // // shape可以理解为一个需要填充轮廓
        // // 所谓填充：ShapeGeometry算法利用顶点计算出三角面face3数据填充轮廓
        // let geometry = new THREE.ShapeGeometry(shape, 1);
        // let geometry1 = new THREE.BufferGeometry()
        // geometry1.setFromPoints([new THREE.Vector3(0, 0, 0)])
        // let material = new THREE.MeshBasicMaterial({
        //     color: '#f60',
        //     wireframe: true
        // })
        // let material1 = new THREE.PointsMaterial({
        //     color: '#f00',
        //     size: 5
        // })
        // let mesh = new THREE.Mesh(geometry, material)
        // let mesh1 = new THREE.Points(geometry1, material1)
        // this.scene.add(mesh, mesh1)

        //在使用shape lineTo方法时 点连接的线不能在已生成三角区相交  否则会不生效
        let shape = new THREE.Shape();
        shape.moveTo(200, 0)
        shape.lineTo(0, 100)
        shape.lineTo(100, 0)
        shape.lineTo(100, 100)
        shape.lineTo(150, 150)
        console.log(shape);

        let geometry = new THREE.ShapeBufferGeometry(shape, 12)


        // // 一个外轮廓圆弧嵌套三个内圆弧轮廓
        // let shape = new THREE.Shape(); //Shape对象
        // //外轮廓
        // shape.arc(0, 0, 100, 0, 2 * Math.PI);
        // // 内轮廓1
        // let path1 = new THREE.Path();
        // path1.arc(0, 0, 40, 0, 2 * Math.PI);
        // // 内轮廓2
        // let path2 = new THREE.Path();
        // path2.arc(80, 0, 10, 0, 2 * Math.PI);
        // // 内轮廓3
        // let path3 = new THREE.Path();
        // path3.arc(-80, 0, 10, 0, 2 * Math.PI);
        // //三个内轮廓分别插入到holes属性中    一个paths数组，定义了形状上的孔洞。
        // shape.holes.push(path1, path2, path3);

        // let geometry = new THREE.ShapeGeometry(shape, 10)


        let material = new THREE.MeshBasicMaterial({
            color: '#f60',
            side: THREE.DoubleSide, //点对象像素尺寸 两面可见
            // wireframe: true
        })
        let mesh = new THREE.Mesh(geometry, material)
        this.scene.add(mesh0, mesh)


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

export default FiveThree3d