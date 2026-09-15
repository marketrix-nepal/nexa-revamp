import * as THREE from 'three';

export function createSculpture(scene) {
  const group = new THREE.Group();

  // 1. Dark Glass Outer Torus
  const torusGeo = new THREE.TorusGeometry(2.2, 0.65, 48, 128);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x080B14,
    metalness: 0.10,
    roughness: 0.20,
    transmission: 0.60,
    thickness: 1.8,
    ior: 1.52,
    clearcoat: 1.0,
    clearcoatRoughness: 0.10,
    reflectivity: 0.85,
    transparent: true,
    opacity: 0.90,
    depthWrite: true
  });

  const torusMesh = new THREE.Mesh(torusGeo, glassMat);
  group.add(torusMesh);

  // 2. Warm Inner Soul (Internal Core)
  const coreGeo = new THREE.SphereGeometry(0.8, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xFF451A,
    transparent: true,
    opacity: 0.32,
    blending: THREE.AdditiveBlending
  });

  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  group.add(coreMesh);

  // Initial transformation per master directive
  group.position.set(2.0, 0.1, -1.0);
  group.rotation.set(0.6, 0.4, 0.1);

  scene.add(group);

  return {
    group,
    torusMesh,
    coreMesh,
    glassMat,
    coreMat
  };
}
