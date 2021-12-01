import React, { Component, RefObject } from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import '../css/viewer.css';

class Viewer extends Component {

    private myCanvas:RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    private scene = new THREE.Scene();
    private camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    private renderer:THREE.WebGL1Renderer = new THREE.WebGL1Renderer();
    private geometry:any;
    private material:any;
    private cube:any;
    private line:any;
    private controller = new OrbitControls(this.camera, this.renderer.domElement);
    
    componentDidMount(){
        this.init();
    }

    render(): JSX.Element {
        return (
            <div className="canvas" ref={this.myCanvas}>     
            <div className="btnCont">
                <button onClick={this.initCube}>cube</button>    
                <button onClick={this.drawLines}>line</button>   
                <button>next</button>   
            </div>         
            </div>
        );
    }

    private init = ():void =>
    {
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.myCanvas.current?.appendChild(this.renderer.domElement);       

        this.initScene();
        this.initCube();
        this.animateCube();

        this.renderer.render( this.scene, this.camera );
    }

    private initScene = ():void =>
    {
       this.scene.background = new THREE.Color(0xffffff);
    }

    private initCube = ():void =>
    {   
        console.log('큐브만들기')
        this.scene.remove(this.line);
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this.geometry = new THREE.BoxGeometry();
        this.material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        this.cube = new THREE.Mesh( this.geometry, this.material );
        this.scene.add(this.cube);             
        this.camera.position.z = 8;
        this.animateCube();
    }

    private animateCube = ():void =>
    {
        requestAnimationFrame( this.animateCube);

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render( this.scene, this.camera );               
    }

    private drawLines = ():void =>
    {
        console.log('라인그리기')
        this.scene.remove(this.cube);
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
        this.camera.position.set( 0, 0, 100 );
        this.camera.lookAt( 0, 0, 0 );
        this.material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

        const points = [];
        points.push( new THREE.Vector3( -10, 0, 0) );
        points.push( new THREE.Vector3( 0, 10, 0) );
        points.push( new THREE.Vector3( 10, 0, 0 ) );

        this.geometry = new THREE.BufferGeometry().setFromPoints(points);

        this.line = new THREE.Line( this.geometry, this.material );

        this.scene.add( this.line );
        this.renderer.render( this.scene, this.camera );
    }


}

export default Viewer;