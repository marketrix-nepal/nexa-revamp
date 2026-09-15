import * as THREE from 'three';
import { createLights } from './lights.js';
import { createSculpture } from './sculpture.js';
import { createParticles } from './particles.js';
import { createPostProcessing } from './postprocessing.js';

export const sceneState = {
  cameraPos: { x: 0, y: 0, z: 8.5 },
  cameraTarget: { x: 0, y: 0, z: 0 },
  sculpturePos: { x: 2.0, y: 0.1, z: -1.0 },
  sculptureRot: { x: 0.6, y: 0.4, z: 0.1 },
  sculptureScale: 1.0,
  bloomStrength: 0.38,
  rimLightIntensity: 8.0,
  autoRotateSpeed: 0.003
};

let renderer, scene, camera, composerObj, sculptureObj, particlesObj, lightsObj;
let clock = new THREE.Clock();
let isInitialized = false;

export function initWebGLScene(container) {
  if (isInitialized) return;
  if (!container) {
    container = document.getElementById('webgl-canvas-container');
  }
  if (!container) return;

  const width = window.innerWidth;
  const height = window.innerHeight;

  // 1. Scene & Camera
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020305, 0.025);

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(sceneState.cameraPos.x, sceneState.cameraPos.y, sceneState.cameraPos.z);
  camera.lookAt(sceneState.cameraTarget.x, sceneState.cameraTarget.y, sceneState.cameraTarget.z);

  // 2. WebGL Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.appendChild(renderer.domElement);

  // 3. Subsystems
  lightsObj = createLights(scene);
  sculptureObj = createSculpture(scene);
  particlesObj = createParticles(scene);
  composerObj = createPostProcessing(renderer, scene, camera);

  // 4. Window Resize Event
  window.addEventListener('resize', onWindowResize);

  // 5. Render Loop
  animate();
  isInitialized = true;

  return {
    scene,
    camera,
    renderer,
    sculpture: sculptureObj,
    sceneState
  };
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  if (composerObj) {
    composerObj.setSize(width, height);
  }

  // Adjust camera distance for mobile viewports
  if (width < 768) {
    sceneState.cameraPos.z = 11.5;
    sceneState.sculpturePos.x = 0.0;
  }
}

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Subtle continuous auto-drift combined with ScrollTrigger state
  if (sculptureObj) {
    sculptureObj.group.position.x = sceneState.sculpturePos.x;
    sculptureObj.group.position.y = sceneState.sculpturePos.y + Math.sin(elapsedTime * 0.7) * 0.08;
    sculptureObj.group.position.z = sceneState.sculpturePos.z;

    sculptureObj.group.rotation.x = sceneState.sculptureRot.x + elapsedTime * sceneState.autoRotateSpeed;
    sculptureObj.group.rotation.y = sceneState.sculptureRot.y + elapsedTime * (sceneState.autoRotateSpeed * 1.4);
    sculptureObj.group.rotation.z = sceneState.sculptureRot.z;

    sculptureObj.group.scale.setScalar(sceneState.sculptureScale);
  }

  // Camera lerp
  camera.position.x += (sceneState.cameraPos.x - camera.position.x) * 0.08;
  camera.position.y += (sceneState.cameraPos.y - camera.position.y) * 0.08;
  camera.position.z += (sceneState.cameraPos.z - camera.position.z) * 0.08;
  camera.lookAt(sceneState.cameraTarget.x, sceneState.cameraTarget.y, sceneState.cameraTarget.z);

  // Dynamic light & bloom reactivities
  if (lightsObj) {
    lightsObj.crimsonRim.intensity = sceneState.rimLightIntensity;
  }
  if (composerObj && composerObj.bloomPass) {
    composerObj.bloomPass.strength = sceneState.bloomStrength;
  }

  // Particle drift
  if (particlesObj) {
    particlesObj.update(elapsedTime);
  }

  // Post-processing render
  if (composerObj) {
    composerObj.composer.render();
  } else {
    renderer.render(scene, camera);
  }
}
