/**
 * Custom Vignette & Chromatic Dispersion Shader
 * Adds subtle optical chromatic aberration at the viewport periphery
 * and grounds edges in deep void black.
 */

export const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: null },
    offset: { value: 1.0 },
    darkness: { value: 1.4 },
    dispersion: { value: 0.0018 }
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float offset;
    uniform float darkness;
    uniform float dispersion;
    varying vec2 vUv;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      vec2 dir = vUv - center;
      float dist = length(dir);

      // Chromatic dispersion towards the periphery
      vec2 rUv = vUv + dir * (dist * dispersion);
      vec2 bUv = vUv - dir * (dist * dispersion);

      float r = texture2D(tDiffuse, rUv).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, bUv).b;

      // Radial smoothstep vignette
      float vignette = smoothstep(0.85 * offset, 1.35 * offset, dist);
      vec3 col = vec3(r, g, b);
      col = mix(col, col * (1.0 - darkness * 0.8), vignette);

      // Subtle contrast curve
      col = pow(col, vec3(1.05));

      gl_FragColor = vec4(col, 1.0);
    }
  `
};
