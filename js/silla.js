import * as THREE from "three"
import { OrbitControls } from "OrbitControls"
import { TextureLoader } from "three";
import { GLTFLoader } from "GLTFLoader";
// Scene
const scene = new THREE.Scene();

// Create a sphere
/* const geometry = new THREE.SphereGeometry(6, 64, 64)
const material = new THREE.MeshStandardMaterial({ color: "#6E49B3" }
)
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh) */




//modelos

// Carga del modelo
const loader = new GLTFLoader();

let isModelLoaded = false;

let originalMaterialProperties = {};

let Modelito

loader.load(
  "./modelos/arm/sillaenrique.glb",
  function (gltf) {
    Modelito = gltf.scene;
    
    /* Modelito.scale.set(0.2, 0.2, 0.2); */
    /* Modelito.rotation.x = Math.PI * 0.05; // ≈ 9°
    Modelito.rotation.y = Math.PI * 0.1;  // ≈ 18°
    Modelito.rotation.z = Math.PI * 0.1;  // ≈ 18°; */
    scene.add(Modelito);
    
    // Aplicar textura gris por defecto
    Modelito.traverse((node) => {
      if (node.isMesh && node.material instanceof THREE.MeshStandardMaterial) {
        node.material.map = texturaPlomo;
        node.material.needsUpdate = true;
      }
    });


    Modelito.traverse((node) => {
      if (node.isMesh && node.material instanceof THREE.MeshStandardMaterial) {
        // Guarda las propiedades relevantes del material original
        originalMaterialProperties.roughness = node.material.roughness;
        originalMaterialProperties.metalness = node.material.metalness;
        originalMaterialProperties.normalMap = node.material.normalMap; // Si existe
        // Puedes guardar otras propiedades aquí si son relevantes (e.g., aoMap, emissiveMap, etc.)
      }
    });
    
  },
  undefined,
);

let cartel

loader.load(
  "./modelos/arm/cartel.glb",
  function (gltf) {
    cartel = gltf.scene;
    
    /* Modelito.scale.set(0.2, 0.2, 0.2); */
    /* Modelito.rotation.x = Math.PI * 0.05; // ≈ 9°
    Modelito.rotation.y = Math.PI * 0.1;  // ≈ 18°
    Modelito.rotation.z = Math.PI * 0.1;  // ≈ 18°; */
    scene.add(cartel);
    
  },
  undefined,
);



let planta

loader.load(
  "./modelos/arm/planta.glb",
  function (gltf) {
    planta = gltf.scene;
    
    /* Modelito.scale.set(0.2, 0.2, 0.2); */
    /* Modelito.rotation.x = Math.PI * 0.05; // ≈ 9°
    Modelito.rotation.y = Math.PI * 0.1;  // ≈ 18°
    Modelito.rotation.z = Math.PI * 0.1;  // ≈ 18°; */
    scene.add(planta);
    
  },
  undefined,
);

let gato

loader.load(
  "./modelos/arm/dingus.glb",
  function (gltf) {
    gato = gltf.scene;
    
    /* Modelito.scale.set(0.2, 0.2, 0.2); */
    /* Modelito.rotation.x = Math.PI * 0.05; // ≈ 9°
    Modelito.rotation.y = Math.PI * 0.1;  // ≈ 18°
    Modelito.rotation.z = Math.PI * 0.1;  // ≈ 18°; */
    gato.position.x = -1
    scene.add(gato);

    
  },
  undefined,
);


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Light

const light = new THREE.PointLight(0xffffff, 1, 25)
light.position.set(0, 9, 10)
light.intensity = 1
scene.add(light)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // color blanco, intensidad media
scene.add(ambientLight);

// Camera
const camera = new THREE.PerspectiveCamera(
  9,                   // fov
  window.innerWidth / window.innerHeight,
  0.01,                 // near: lo bajamos a 1 centímetro
  100                  // far
);
/* const camera = new THREE.PerspectiveCamera(45, , 0.1, 35) */
camera.position.z = 23.43
camera.position.x = 16.12
camera.position.y = 10.75

/* camera.fov = 9;   */
scene.add(camera)
camera.updateProjectionMatrix()





/* {x: 16.125239376455138, y: 10.753674306823573, z: 23.43789973429334} */

// Scene Rendering
const canvas = document.getElementById('canvassilla')
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)
renderer.alpha = true
renderer.antialias = true

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;


renderer.setClearColor(0x000000, 0); // Segundo argumento = opacidad (0 = totalmente transparente)




// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = false
/* controls.autoRotateSpeed = 2 */

controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

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



// 2) Lee el ángulo polar actual:
const phi0 = controls.getPolarAngle();  // en radianes

// 3) Fíjalo para bloquear la inclinación vertical:
controls.minPolarAngle = phi0;
controls.maxPolarAngle = phi0;
controls.maxPolarAngle = phi0;





// Precarga de texturas
const textureLoader = new TextureLoader();

const texturaPlomo = textureLoader.load('./imagenes/sillagris.jpg'); // Reemplazar con la URL de tu textura ploma
texturaPlomo.needsUpdate = true;
texturaPlomo.flipY = false; // Corrige la inversión del eje Y
texturaPlomo.colorSpace = THREE.SRGBColorSpace;
texturaPlomo.encoding  = THREE.sRGBEncoding;

const texturaAzul = textureLoader.load('./imagenes/azulsilla.jpg'); // Reemplazar con la URL de tu textura azul
texturaAzul.needsUpdate = true;
texturaAzul.flipY = false; // Corrige la inversión del eje Y
texturaAzul.colorSpace = THREE.SRGBColorSpace;
texturaAzul.encoding  = THREE.sRGBEncoding;

const texturaVerde = textureLoader.load('./imagenes/verdesilla.jpg'); // Reemplazar con la URL de tu textura verde
texturaVerde.flipY = false; // Corrige la inversión del eje Y
texturaVerde.colorSpace = THREE.SRGBColorSpace;
texturaVerde.encoding  = THREE.sRGBEncoding;

const texturaalbedo = textureLoader.load('./imagenes/albedolab_grande_fondo.png'); // Reemplazar con la URL de tu textura verde
texturaalbedo.flipY = false; // Corrige la inversión del eje Y
texturaalbedo.colorSpace = THREE.SRGBColorSpace;
texturaalbedo.encoding  = THREE.sRGBEncoding;

const texturarock = textureLoader.load('./imagenes/mv.jpg'); // Reemplazar con la URL de tu textura verde
texturarock.flipY = false; // Corrige la inversión del eje Y
texturarock.colorSpace = THREE.SRGBColorSpace;
texturarock.encoding  = THREE.sRGBEncoding;



// Event Listeners para los botones
const botonPlomo = document.getElementById('plomo');
const botonAzul = document.getElementById('azul');
const botonVerde = document.getElementById('verde');
const botoncarteluno = document.getElementById('cartel2');
const botoncarteldos = document.getElementById('cartel1');

botonPlomo.addEventListener('click', () => {
    if (Modelito) {
        Modelito.traverse((node) => {
            if (node.isMesh) {
                node.material.map = texturaPlomo;
                 // Aplica las propiedades del material original
                if (originalMaterialProperties.roughness !== undefined) node.material.roughness = originalMaterialProperties.roughness;
                if (originalMaterialProperties.metalness !== undefined) node.material.metalness = originalMaterialProperties.metalness;
                if (originalMaterialProperties.normalMap !== undefined) node.material.normalMap = originalMaterialProperties.normalMap;
                 // Aplica otras propiedades guardadas aquí si es necesario

                node.material.needsUpdate = true;

            }
        });
    }
});

botonAzul.addEventListener('click', () => {
    if (Modelito) {
        Modelito.traverse((node) => {
            if (node.isMesh) {
                node.material.map = texturaAzul;
                 // Aplica las propiedades del material original
                if (originalMaterialProperties.roughness !== undefined) node.material.roughness = originalMaterialProperties.roughness;
                if (originalMaterialProperties.metalness !== undefined) node.material.metalness = originalMaterialProperties.metalness;
                if (originalMaterialProperties.normalMap !== undefined) node.material.normalMap = originalMaterialProperties.normalMap;
                 // Aplica otras propiedades guardadas aquí si es necesario

                node.material.needsUpdate = true;

            }
        });
    }
});

botonVerde.addEventListener('click', () => {
    if (Modelito) {
        Modelito.traverse((node) => {
            if (node.isMesh) {
                node.material.map = texturaVerde;
                 // Aplica las propiedades del material original
                if (originalMaterialProperties.roughness !== undefined) node.material.roughness = originalMaterialProperties.roughness;
                if (originalMaterialProperties.metalness !== undefined) node.material.metalness = originalMaterialProperties.metalness;
                if (originalMaterialProperties.normalMap !== undefined) node.material.normalMap = originalMaterialProperties.normalMap;
                 // Aplica otras propiedades guardadas aquí si es necesario

                node.material.needsUpdate = true;

            }
        });
    }
});

botoncarteluno.addEventListener('click', () => {
  if (cartel) {
    cartel.traverse((node) => {
          if (node.isMesh) {
              node.material.map = texturarock;
               // Aplica las propiedades del material original
              if (originalMaterialProperties.roughness !== undefined) node.material.roughness = originalMaterialProperties.roughness;
              if (originalMaterialProperties.metalness !== undefined) node.material.metalness = originalMaterialProperties.metalness;
              if (originalMaterialProperties.normalMap !== undefined) node.material.normalMap = originalMaterialProperties.normalMap;
               // Aplica otras propiedades guardadas aquí si es necesario

              node.material.needsUpdate = true;

          }
      });
  }
});


botoncarteldos.addEventListener('click', () => {
  if (cartel) {
    cartel.traverse((node) => {
          if (node.isMesh) {
              node.material.map = texturaalbedo;
               // Aplica las propiedades del material original
              if (originalMaterialProperties.roughness !== undefined) node.material.roughness = originalMaterialProperties.roughness;
              if (originalMaterialProperties.metalness !== undefined) node.material.metalness = originalMaterialProperties.metalness;
              if (originalMaterialProperties.normalMap !== undefined) node.material.normalMap = originalMaterialProperties.normalMap;
               // Aplica otras propiedades guardadas aquí si es necesario

              node.material.needsUpdate = true;

          }
      });
  }
});

//////// GATOCLICK



// 1) Raycaster y mouse ya definidos antes...
const raycaster = new THREE.Raycaster();
const mouse     = new THREE.Vector2();
let giro = false

window.addEventListener('click', onClick);

function onClick(event) {
  // 1) Ajuste coords del ratón al canvas
  const rect = canvas.getBoundingClientRect();
  const x    = event.clientX - rect.left;
  const y    = event.clientY - rect.top;

  mouse.x =  ( x / rect.width ) * 2 - 1;
  mouse.y = -( y / rect.height ) * 2 + 1;

  // 2) Raycasting
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(gato, true);
if(giro==false){




  if (intersects.length > 0) {
    const initialY = gato.position.y;



    // 3) Crear un timeline específico al clic
    const tlClick = gsap.timeline({
      defaults: { duration: 1, ease: "power1.inOut" },
      yoyo: true,
      repeat: 1,
      onStart: () => {
        giro = true
      },
      onComplete: () => {
        // aquí se ejecuta al terminar TODO el timeline
        giro = false
        
      }
    });

    // 4) Animar posición.z y rotación.y simultáneamente
    tlClick
    .to(gato.position, { y: initialY + 0.5 })                    // sube 1
    .to(gato.rotation, { y: gato.rotation.y + Math.PI * 4 }, "<"); // gira 360° al mismo tiempo
    
  } else {
    console.log("no hay intersección");
  }


  
}
  
}









const clock = new THREE.Clock();
const fpsInterval = 1000 / 24; // ms entre cada frame (~41.67 ms)
let then = Date.now();

const loop = () => {
  window.requestAnimationFrame(loop);

  const now   = Date.now();
  const elapsed = now - then;

  // Si no ha pasado suficiente tiempo, salta este frame
  if (elapsed < fpsInterval) return;

  // Ajusta el “then” descontando el exceso para mantener el ritmo
  then = now - (elapsed % fpsInterval);

  // Tiempo en segundos desde el último frame renderizado
  const delta = clock.getDelta();

  // console.log(camera.position);

  // Aquí puedes reactivar tu lógica de rotación:
  // if (Modelito) {
  //   const rotationSpeed = Math.PI / 3.5;
  //   Modelito.rotation.y += rotationSpeed * delta;
  // }

  controls.update();
  renderer.render(scene, camera);
};

loop();



