import * as THREE from 'three'

class Eight3d {
    constructor(selector) {
        this.container = document.querySelector(selector)
        this.scene
        this.camera
        this.renderer
        this.init()
        this.anmate()
    }
    init() {
        this.initScene();
        this.initCamera();
        this.initRenderer();
        this.addMesh();
    }
    initScene() {
        this.scene = new THREE.Scene();
    }
    initCamera() {
        let width = window.innerWidth
        let height = window.innerHeight
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
        this.camera.position.set(150, 100, 300)
        this.camera.lookAt(0, 0, 0)
    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
    }
    render() {
        this.renderer.render(this.scene, this.camera)
    }
    addMesh() {

    }
    anmate() {
        this.renderer.setAnimationLoop(this.render.bind(this))
    }
}

export default Eight3d