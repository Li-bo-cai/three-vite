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
        //矩形平面，细分数默认1，即2个三角形拼接成一个矩形
        let geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
        // let geometry = new THREE.SphereGeometry(60, 25, 25); //球体
        let uvArr = []

        geometry.attributes.uv.array.forEach((elem, index) => {
            if (elem == 1 && index % 2 == 0) {
                uvArr.push(0.7)
            } else if (elem == 0 && index % 2 == 0) {
                uvArr.push(elem + 0.2)
            } else {
                uvArr.push(elem)
            }
        });
        console.log(uvArr);
        geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([...uvArr]), 2))


        console.log(geometry);

        // let textureLoader = new THREE.TextureLoader();
        // // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
        // textureLoader.load('./image/row.jpg', (texture) => {
        //     let material = new THREE.MeshLambertMaterial({
        //         // color: 0x0000ff,
        //         // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
        //         map: texture,//设置颜色贴图属性值
        //         side: THREE.DoubleSide
        //     }); //材质对象Material
        //     let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // })

        let material = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./image/row.jpg'), side: THREE.DoubleSide })
        let material1 = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./image/col.jpg'), side: THREE.DoubleSide })

        // 排序方式是：右  左 上 下  前 后
        let mesh = new THREE.Mesh(geometry, [material1, material, material, material, material, material])
        // let mesh = new THREE.Mesh(geometry, material)
        this.scene.add(mesh); //网格模型添加到场景中
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

export default TwoThree3d