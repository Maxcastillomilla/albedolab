import * as THREE from "three"
import { OrbitControls } from "OrbitControls"
import { GLTFLoader } from "GLTFLoader";
// Scene
const scene = new THREE.Scene();

// Create a sphere
/* const geometry = new THREE.SphereGeometry(6, 64, 64)
const material = new THREE.MeshStandardMaterial({ color: "#6E49B3" }
)
const mesh = new THREE.Mesh(geometry, material) */




//modelos

// Carga del modelo
const loader = new GLTFLoader();

let isModelLoaded = false;

let Modelito

loader.load(
  "./modelos/arm/scene.gltf",
  function (gltf) {
    Modelito = gltf.scene;
    isModelLoaded = true
    Modelito.scale.set(0.0, 0.0, 0.0);
    Modelito.rotation.x = Math.PI * 0.05; // ≈ 9°
    Modelito.rotation.y = Math.PI * 0.1;  // ≈ 18°
    Modelito.rotation.z = Math.PI * 0.1;  // ≈ 18°;
    scene.add(Modelito);
    Opening();
  },
  undefined,
);
let timeline = gsap.timeline();

const Opening = () => {
    timeline.to(Modelito.scale, { x: 0.04, y: 0.04, z: 0.04, duration: 4,
    });
 

};


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Light

const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0, 9, 10)
light.intensity = 1.25
scene.add(light)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // color blanco, intensidad media
scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)

// Scene Rendering
const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)
renderer.alpha = true
renderer.antialias = true
renderer.setClearColor(0x000000, 0); // Segundo argumento = opacidad (0 = totalmente transparente)




// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = false
controls.autoRotateSpeed = 2

// Resize
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)

})

const clock = new THREE.Clock(); // puedes seguir usándolo para otros fines si quieres
const fpsInterval = 1000 / 24;    // ms que deben pasar entre cada frame (~41.67 ms)
let then = Date.now();

const loop = () => {
  window.requestAnimationFrame(loop);

  const now = Date.now();
  const elapsed = now - then;

  // Si no han pasado aún los ~41.67 ms, salta este frame
  if ( elapsed < fpsInterval ) return;

  // Ajusta el “then” descontando el exceso para mantener el ritmo
  then = now - ( elapsed % fpsInterval );

 if (!isRendering) return; // Stop rendering if isRendering is false
 
  // Calcula delta en segundos (para tu rotación)
  const delta = elapsed / 1000;

  if (Modelito) {
    const rotationSpeed = Math.PI / 3.5;
    Modelito.rotation.y += rotationSpeed * delta;
  }

  controls.update();
  renderer.render(scene, camera);
};

let isRendering = true; // Variable para controlar el estado de renderizado

loop();

function toggleRendering(render) {
  isRendering = render;
  if (isRendering) {
    loop(); // Start rendering if isRendering is true
  }
}

// IntersectionObserver to control rendering based on canvas visibility
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("Canvas is in the viewport, starting rendering.");
      toggleRendering(true);
    } else {
      console.log("Canvas is out of the viewport, stopping rendering.");
      toggleRendering(false);
    }
  });
});

// Observe the canvas element
observer.observe(canvas);

// You can disconnect the observer later if needed, for example:
// observer.disconnect();



function obtenerEstado() {
  return estado;
}

export {isModelLoaded, obtenerEstado,Opening};
