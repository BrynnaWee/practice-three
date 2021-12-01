import React, { Component, RefObject } from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import '../css/viewer.css';

class Viewer extends Component {

    private myCanvas:RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    // private canvasContainer:HTMLDivElement<HTMLDivElement>
    private scene = new THREE.Scene();
    private camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    private renderer:THREE.WebGL1Renderer = new THREE.WebGL1Renderer();
    private geometry = new THREE.BoxGeometry();
    private material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    private cube = new THREE.Mesh( this.geometry, this.material );
    
    componentDidMount(){
        this.init();
    }

    render(): JSX.Element {
        return (
            <div className="canvas" ref={this.myCanvas}>     
            <p>test</p>         
            </div>
        );
    }

    private init = ():void =>
    {
        // this.canvasContainer=this.myCanvas.current;      
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.myCanvas.current?.appendChild(this.renderer.domElement);       

        this.initScene();
        this.initCube();
        this.animate();
    }

    private initScene = ():void =>
    {
       this.scene.background = new THREE.Color(0xffffff);
    }

    private initCube = ():void =>
    {        
        this.scene.add( this.cube );
        this.camera.position.z = 5;
    }

    private animate = ():void =>
    {
        requestAnimationFrame( this.animate);
        this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;
        
        this.renderer.render( this.scene, this.camera );
    }
}

export default Viewer;