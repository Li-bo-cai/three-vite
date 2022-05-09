import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'

class OneThree3d {
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
        let that = this
        // 纹理贴图映射到一个矩形平面上
        // let geometry = new THREE.PlaneGeometry(204, 102); //矩形平面
        let geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
        // let geometry = new THREE.SphereGeometry(60, 25, 25); //球体

        // // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
        // let textureLoader = new THREE.TextureLoader();
        // // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
        // textureLoader.load('./image/row.jpg', function (texture) {
        //     console.log(texture);
        //     let material = new THREE.MeshLambertMaterial({
        //         // color: 0x0000ff,
        //         // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
        //         map: texture,//设置颜色贴图属性值
        //         side: THREE.DoubleSide
        //     }); //材质对象Material
        //     let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        //     that.scene.add(mesh); //网格模型添加到场景中
        // })

        let ImageLoader = new THREE.ImageLoader();
        ImageLoader.load('./image/col.jpg', (img) => {
            let texture = new THREE.Texture(img)
            // 下次使用纹理时触发更新
            texture.needsUpdate = true;
            let material = new THREE.MeshBasicMaterial({
                map: texture
            })
            let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            that.scene.add(mesh); //网格模型添加到场景中
        })

    }
    initLight() {
        //点光源
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

export default OneThree3d