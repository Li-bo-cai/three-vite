import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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
        this.camera.position.set(100, 100, 300)
        this.camera.lookAt(this.scene.position)
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
        let geometry = new THREE.PlaneGeometry(128, 128); //矩形平面
        /**
         * 创建纹理对象的像素数据
         */
        let width = 32; //纹理宽度
        let height = 32; //纹理高度
        let size = width * height; //像素大小
        let data = new Uint8Array(size * 4); //size*3：像素在缓冲区占用空间
        console.log(data);
        for (let i = 0; i < size * 4; i += 4) {
            // 随机设置RGB分量的值
            data[i] = 255 * Math.random()
            data[i + 1] = 255 * Math.random()
            data[i + 2] = 255 * Math.random()
            // data[i + 3] = 0.1
        }
        console.log(data);

        // 创建数据文理对象   RGB格式：THREE.RGBFormat
        let texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
        texture.needsUpdate = true; //纹理更新
        //打印纹理对象的image属性
        // console.log(texture.image);

        let material = new THREE.MeshPhongMaterial({
            map: texture, // 设置纹理贴图
            side: THREE.DoubleSide
        }); //材质对象Material
        let mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh)
    }
    initLight() {
        // 点光源
        // let point = new THREE.PointLight("#f00");
        // point.position.set(250, 20, 200); //点光源位置
        // this.scene.add(point); //点光源添加到场景中
        //环境光
        let ambient = new THREE.AmbientLight("#fff");
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