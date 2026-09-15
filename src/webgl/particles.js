import * as THREE from 'three';

export function createParticles(scene) {
  const count = 600;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const initialPositions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Depth volume: X: [-20, 20], Y: [-15, 15], Z: [-10, 10]
    const x = (Math.random() - 0.5) * 40;
    const y = (Math.random() - 0.5) * 30;
    const z = (Math.random() - 0.5) * 20;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    initialPositions[i3] = x;
    initialPositions[i3 + 1] = y;
    initialPositions[i3 + 2] = z;

    velocities[i3] = (Math.random() - 0.5) * 0.02;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Soft circular particle texture via canvas
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(255, 180, 160, 0.6)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);

  const material = new THREE.PointsMaterial({
    size: 0.12,
    map: texture,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  return {
    particleSystem,
    update: (elapsedTime) => {
      const posAttr = geometry.attributes.position;
      const array = posAttr.array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Subtle sinusoidal Brownian drift
        array[i3] = initialPositions[i3] + Math.sin(elapsedTime * 0.25 + i) * 0.4;
        array[i3 + 1] = initialPositions[i3 + 1] + Math.cos(elapsedTime * 0.2 + i * 0.5) * 0.3;
        array[i3 + 2] = initialPositions[i3 + 2] + Math.sin(elapsedTime * 0.15 + i * 0.2) * 0.25;
      }
      posAttr.needsUpdate = true;
    }
  };
}
