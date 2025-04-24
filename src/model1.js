import './style.css'
import * as THREE from 'three'
import { gsap } from 'gsap'
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

  if (width <= 600) { // iPhone 13 width and similar mobile screens
    model.scale.set(0.7, 0.7, 0.7);       // smaller model
    model.position.y = 1;               // shift it a bit more up
  }
}

let mixer
let model;
const loader = new GLTFLoader()
loader.load('/stylized_ww1_plane.glb',
  (gltf)=>{
    model = gltf.scene
    scene.add(model)

    model.position.x = 0
    model.position.y = 1
    model.position.z = 0

    model.rotation.x = 0.8
    model.rotation.y = 0
    model.rotation.z = 0


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

let arrPositionOfModel = [
  {
    id:'home',
    position:{x:0,y:1,z:0},
    rotation:{x:0.8,y:0,z:0}
  },
  {
    id:'roadmap',
    position:{x:0,y:0,z:-1.5},
    rotation:{x:1.5,y:0,z:0}
  },
  {
    id:'resource',
    position:{x:0,y:0,z:1.5},
    rotation:{x:0,y:0,z:0}
  }
]
const modelAnimation = ()=>{
  const sections = document.querySelectorAll('.sec')
  let currentSection;
  sections.forEach((section)=>{
    const rect = section.getBoundingClientRect()
    if(rect.top <= window.innerHeight/2){
      currentSection = section.id
    }
  })
  let position_active = arrPositionOfModel.findIndex(val=>
    val.id == currentSection
  )
  if(position_active>=0){
      let newCoordinates = arrPositionOfModel[position_active]
      gsap.to(model.position,{
        x:newCoordinates.position.x,
        y:newCoordinates.position.y,
        z:newCoordinates.position.z,
        duration:2,
        ease:"power3.out"
      })
      gsap.to(model.rotation,{
        y:newCoordinates.rotation.y,
        z:newCoordinates.rotation.z,
        x:newCoordinates.rotation.x,
        duration:2,
        ease:"power3.out"
      })

  }

}
window.addEventListener('scroll',()=>{
  if(model){
    modelAnimation()
  }
})