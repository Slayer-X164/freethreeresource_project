import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector(".webgl_canvas1");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// Cube
// const geometry = new THREE.BoxGeometry();
// const loader = new THREE.CubeTextureLoader();
// const envMap = loader.load([
//   'https://threejs.org/examples/textures/cube/Bridge2/posx.jpg',
//   'https://threejs.org/examples/textures/cube/Bridge2/negx.jpg',
//   'https://threejs.org/examples/textures/cube/Bridge2/posy.jpg',
//   'https://threejs.org/examples/textures/cube/Bridge2/negy.jpg',
//   'https://threejs.org/examples/textures/cube/Bridge2/posz.jpg',
//   'https://threejs.org/examples/textures/cube/Bridge2/negz.jpg'
// ]);
// scene.environment = envMap;

// const material = new THREE.MeshPhysicalMaterial({
//   color: new THREE.Color("blue"),

// });

// const cube = new THREE.Mesh(geometry, material);
// cube.position.y = 0.5;
// scene.add(cube);

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 20);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

let mixer
let model;
const loader = new GLTFLoader()
loader.load('/stylized_ww1_plane.glb',
  (gltf)=>{
    model = gltf.scene
    scene.add(model)
    // model.position.z = 0
    model.position.y = 0.8

    console.log(gltf.animations);
    //activating model animation
    mixer = new THREE.AnimationMixer(model)
    const clips = gltf.animations
    const clip = THREE.AnimationClip.findByName(clips,'Take 001')
    const action = mixer.clipAction(clip)
    action.play()

  },
  undefined,
  (err)=>{
    console.error('error loading model: ',err);
  }
)

// Handle resize
let scalingFactor
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  scalingFactor = Math.max(window.innerHeight / 1300,0.8)
  model.scale.set(scalingFactor,scalingFactor,scalingFactor)
  console.log(scalingFactor);

});

// Animation loop
let clock = new THREE.Clock()
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera)
  if(mixer){
    mixer.update(clock.getDelta())
  }
}
animate();
