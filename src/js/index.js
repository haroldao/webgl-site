import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import "../style.scss"

import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'

// import * as dat from 'dat.gui'
// const gui = new dat.GUI()
export default class Sketch {
	constructor(options) {
		this.container = options.dom
		this.time = 0

		this.width = this.container.offsetWidth
		this.height = this.container.offsetHeight

		this.scene = new THREE.Scene()
		this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 10)
		this.camera.position.z = 1

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		})
		this.renderer.setSize(this.width, this.height)
		this.container.appendChild(this.renderer.domElement)

		this.controls = new OrbitControls(this.camera, this.renderer.domElement)

		this.resize()
		this.addObjects()
		this.render()
	}

	resize() {
		window.addEventListener("resize", ()=>{
			this.width = this.container.offsetWidth
			this.height = this.container.offsetHeight
			this.renderer.setSize(this.width, this.height)
			this.camera.aspect = this.width/this.height
			this.camera.updateProjectionMatrix()
		})
	}

	addObjects() {
		this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
		this.material = new THREE.MeshNormalMaterial()

		this.material = new THREE.ShaderMaterial({
			fragmentShader: fragment,
			vertexShader: vertex,
		})
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.scene.add(this.mesh)
	}

	render() {
		this.time += 0.05
		this.mesh.rotation.x = this.time / 2000
		this.mesh.rotation.y = this.time / 1000
		this.renderer.render(this.scene, this.camera)

		window.requestAnimationFrame(this.render.bind(this))
	}
}

new Sketch({
	dom: document.querySelector(".container")
})