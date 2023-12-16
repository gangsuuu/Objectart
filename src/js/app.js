import * as THREE from 'three';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';

// import nebula from 'public/images/nebula.jpg'


export default function () {
  const text = document.querySelector('.text')
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias:true
  });
  renderer.setClearColor(0x000000, 1);
  
  const container = document.querySelector('#container');


  container.appendChild(renderer.domElement);
  
  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  



  


  const clock = new THREE.Clock();
  const textureLoader = new THREE.TextureLoader();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
  45,
  canvasSize.width / canvasSize.height,
  0.1,
  1000
  );

  /** camera */  
  camera.position.set(0, 0, 15);
  
  /** light */
  const light = new THREE.AmbientLight( 0xffffff, 1.0 ); // soft white light
  scene.add( light )

  
 /** textureload **/


  
 /** uniform **/
 const uniforms = {
    u_time: {
      type: 'f',
      value: 0.0
    },
    u_resolution: {
      type:'v2',
      value : new THREE.Vector2(window.innerWidth,window.innerHeight),
    },
 }
 


 /** mirrorCreate **/ 
  const createObject =  () => {
    const geometry = new THREE.IcosahedronGeometry(4,30);
    const material = new THREE.ShaderMaterial({
    vertexShader : document.getElementById('vertexShader').textContent,
    fragmentShader : document.getElementById('fragmentShader').textContent,
    uniforms,
    wireframe:true,
    })
    const mesh = new THREE.Mesh(geometry,material)
    mesh.rotation.x = Math.PI * 0.5
    return mesh
  }


  /** create */
const create = () =>{
  const mesh = createObject()
  
  scene.add(mesh)
  return {mesh};
}
  const resize = () => {
    canvasSize.width = window.innerWidth;
    canvasSize.height = window.innerHeight;

    camera.aspect = canvasSize.width / canvasSize.height;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasSize.width, canvasSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  
  

  const addEvent = () => {
    window.addEventListener('resize', resize);
    window.addEventListener("scroll", () => {
    });
    window.addEventListener("mousemove",(e)=>{
    })
  };


  const draw = (obj) => {
    const { mesh } = obj
    uniforms.u_time.value = Math.cos(clock.getElapsedTime())
    mesh.rotation.y = Math.cos(clock.getElapsedTime())

    text.style.opacity = Math.cos(clock.getElapsedTime())*-1
    renderer.render(scene, camera);

    requestAnimationFrame(() => {
      draw(obj);
    });
  };


  const initialize = () => {
    const obj = create();
    addEvent();
    resize();
    draw(obj);
  };

  initialize();
}