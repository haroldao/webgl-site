import * as THREE from 'three'
import "./style.scss"

export default class Sketch{
    constructor(options){
        this.time = 0
        this.render()
    }

    render() {
        this.time+=0.05
        // console.log(this.time)
        window.requestAnimationFrame(this.render.bind(this))
    }
}

new Sketch()