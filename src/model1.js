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

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 20);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

function updateModelForDevice() {
  if (!model) return;

  const width = window.innerWidth;

  if (width <= 480) { // iPhone 13 width and similar mobile screens
    model.scale.set(0.7, 0.7, 0.7);       // smaller model
    model.position.y = 1.4;               // shift it a bit more up
  } else {
    model.scale.set(1, 1, 1);             // default size
    model.position.y = 1.3;               // default position
  }
}

let mixer
let model;
const loader = new GLTFLoader()
loader.load('/stylized_ww1_plane.glb',
  (gltf)=>{
    model = gltf.scene
    scene.add(model)
    // model.position.z = 0
    model.position.y = 1.3

    console.log(gltf.animations);
    //activating model animation
    mixer = new THREE.AnimationMixer(model)
    const clips = gltf.animations
    const clip = THREE.AnimationClip.findByName(clips,'Take 001')
    const action = mixer.clipAction(clip)
    action.play()

    updateModelForDevice()

  },
  undefined,
  (err)=>{
    console.error('error loading model: ',err);
  }
)

// Handle resize
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  updateModelForDevice()

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
