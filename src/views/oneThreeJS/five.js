import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
class FiveThree3d {
    constructor(selector) {
        this.container = document.querySelector(selector)
        this.scene
        this.camera
        this.renderer
        this.group
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
        // 监听场景大小改变，调整渲染尺寸
        // window.addEventListener("resize", this.onWindowResize.bind(this))
    }
    initScene() {
        this.scene = new THREE.Scene()
    }
    initCamera() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
        this.camera.position.set(0, 0, 600)
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

        // let texture = new THREE.TextureLoader().load("./image/row.jpg");
        // // 创建精灵材质对象SpriteMaterial
        // let spriteMaterial = new THREE.SpriteMaterial({
        //     color: 0xff00ff,//设置精灵矩形区域颜色
        //     rotation: Math.PI / 4,//旋转精灵对象45度，弧度值
        //     map: texture,//设置精灵纹理贴图
        // });
        // // 创建精灵模型对象，不需要几何体geometry参数
        // let sprite = new THREE.Sprite(spriteMaterial);
        // this.scene.add(sprite);
        // // 控制精灵大小，比如可视化中精灵大小表征数据大小
        // sprite.scale.set(10, 10, 1); //// 只需要设置x、y两个分量就可以

        // 加载雨滴理贴图
        let textureTree = new THREE.TextureLoader().load("./image/rain.png");
        // 创建一个组表示所有的雨滴
        this.group = new THREE.Group();
        // 批量创建表示雨滴的精灵模型
        for (let i = 0; i < 400; i++) {
            let spriteMaterial = new THREE.SpriteMaterial({
                rotation: -Math.PI / 8,
                map: textureTree,//设置精灵纹理贴图
            });
            // 创建精灵模型对象
            let sprite = new THREE.Sprite(spriteMaterial);
            // this.scene.add(sprite);
            // 控制精灵大小,
            sprite.scale.set(4, 10, 1); //// 只需要设置x、y两个分量就可以
            let k1 = Math.random();
            let k2 = Math.random();
            let k3 = Math.random();
            // 设置精灵模型位置，在整个空间上上随机分布
            sprite.position.set(window.innerWidth * k1, window.innerHeight * k3, 200 * k2)
            this.group.add(sprite)
        }
        this.group.position.x = -window.innerWidth / 2
        this.group.position.y = -window.innerHeight / 2
        this.scene.add(this.group)
        console.log(this.group);
    }
    initLight() {
        // // 点光源
        // let point = new THREE.PointLight("#f00");
        // point.position.set(250, 20, 200); //点光源位置
        // this.scene.add(point); //点光源添加到场景中
        //环境光
        let ambient = new THREE.AmbientLight("#fff");
        this.scene.add(ambient);
    }
    render() {
        this.group.children.forEach(sprite => {
            sprite.position.y -= 1;
            sprite.position.x -= 1
            if (sprite.position.y < 0) {
                sprite.position.y = window.innerHeight
            }
            if (sprite.position.x < 0) {
                sprite.position.x = window.innerWidth
            }
        })
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.render.bind(this));//请求再次执行渲染函数render，渲染下一帧
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
    initControls() {
        //创建控件对象
        // let controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
    anmate() {
        this.render()
        // this.renderer.setAnimationLoop(this.render.bind(this))
    }
}

export default FiveThree3d