import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'

class OneThree3d {
    constructor(selector) {
        this.container = document.querySelector(selector)
        this.scene
        this.camera
        this.renderer
        this.clock = new THREE.Clock()
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
        this.camera.position.set(0, 0, 1000)
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
        let group = new THREE.Group()
        let geometry1 = new THREE.BoxGeometry(100, 20, 20)
        let geometry2 = new THREE.SphereGeometry(30, 40, 40)
        let material = new THREE.MeshBasicMaterial({
            color: "#f60",
        })
        let material2 = new THREE.MeshBasicMaterial({
            color: "#ccc",
        })
        let mesh1 = new THREE.Mesh(geometry1, material)
        let mesh2 = new THREE.Mesh(geometry2, material2)
        mesh1.name = "Box"
        mesh2.name = "Sphere"

        group.add(mesh1)
        group.add(mesh2)
        this.scene.add(group)


        // 创建名为Box对象的关键帧数据
        let times = [0, 10]; //关键帧时间数组，离散的时间点序列
        let values = [0, 0, 0, 150, 0, 0]; //与时间点对应的值组成的数组
        // 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
        let posTrack = new THREE.KeyframeTrack('Box.position', times, values);
        // 创建颜色关键帧对象：10时刻对应颜色1, 0, 0   20时刻对应颜色0, 0, 1
        let colorKF = new THREE.KeyframeTrack('Box.material.color', [10, 20], [1, 0, 0, 0, 0, 1]);
        // 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
        let scaleTrack = new THREE.KeyframeTrack('Sphere.scale', [0, 20], [1, 1, 1, 3, 3, 3]);

        // duration决定了默认的播放时间，一般取所有帧动画的最大时间
        // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
        let duration = 20;
        // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
        let clip = new THREE.AnimationClip("default", duration, [posTrack, colorKF, scaleTrack]);

        this.mixer = new THREE.AnimationMixer(group);
        console.log(this);
        // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
        let AnimationAction = this.mixer.clipAction(clip);
        //通过操作Action设置播放方式
        AnimationAction.timeScale = 5;//默认1，可以调节播放速度
        // AnimationAction.loop = THREE.LoopOnce; //不循环播放
        AnimationAction.play();//开始播放
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
        let delta = this.clock.getDelta()
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.render.bind(this))
        this.mixer && this.mixer.update(delta)
    }
    initControls() {
        //创建控件对象
        let controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
    anmate() {
        this.render()
        // this.renderer.setAnimationLoop(this.render.bind(this))
    }
}

export default OneThree3d