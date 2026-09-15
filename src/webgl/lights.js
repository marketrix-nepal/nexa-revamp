import * as THREE from 'three';

export function createLights(scene) {
  // 1. Ambient floor light
  const ambient = new THREE.AmbientLight(0x04060A, 1.5);
  scene.add(ambient);

  // 2. Rim Key (Left / Crimson)
  const crimsonRim = new THREE.PointLight(0xE5192D, 8.0, 25);
  crimsonRim.position.set(-5.0, 3.5, 1.2);
  scene.add(crimsonRim);

  // 3. Fill Key (Right / Amber)
  const amberFill = new THREE.PointLight(0xFF6A00, 6.5, 22);
  amberFill.position.set(5.5, -2.8, 0.8);
  scene.add(amberFill);

  // 4. Top Directional Studio Light
  const topLight = new THREE.DirectionalLight(0xE8EEFF, 1.2);
  topLight.position.set(1.5, 7.0, 6.0);
  scene.add(topLight);

  return { ambient, crimsonRim, amberFill, topLight };
}
