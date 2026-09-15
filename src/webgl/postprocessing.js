import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { VignetteShader } from './shaders/vignette.glsl.js';

export function createPostProcessing(renderer, scene, camera) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const renderTarget = new THREE.WebGLRenderTarget(width, height, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    depthBuffer: true
  });

  const composer = new EffectComposer(renderer, renderTarget);

  // 1. Base Render Pass
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // 2. Restrained Luxury UnrealBloomPass
  // Strength: 0.38, Radius: 0.45, Threshold: 0.32
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width, height),
    0.38,
    0.45,
    0.32
  );
  composer.addPass(bloomPass);

  // 3. Custom Chromatic Aberration & Radial Vignette ShaderPass
  const vignettePass = new ShaderPass(VignetteShader);
  composer.addPass(vignettePass);

  return {
    composer,
    bloomPass,
    vignettePass,
    setSize: (w, h) => {
      composer.setSize(w, h);
      bloomPass.setSize(w, h);
    }
  };
}
