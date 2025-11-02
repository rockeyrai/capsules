const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fluidFragmentShader = `
uniform sampler2D uPrevTrails;
uniform vec2 uMouse;
uniform vec2 uPrevMouse;
uniform vec2 uResolution;
uniform float uDecay;
uniform bool uIsMoving;

varying vec2 vUv;

void main() {
  vec4 prevState = texture2D(uPrevTrails, vUv);
  float newValue = prevState.r * uDecay;

  if (uIsMoving) {
    // center of the circle in normalized UV
    vec2 mousePos = uMouse;

    // distance from the mouse center
    float dist = length(vUv - mousePos);

    // control how wide the circle appears
    float radius = 0.08;       // 🔧 circle size
    float softness = 0.05;     // 🔧 edge smoothness

    // smooth circular falloff
    float intensity = smoothstep(radius, radius - softness, dist);

    // add intensity to the trail
    newValue += intensity * 0.4;  // 🔧 overall brightness
  }

  gl_FragColor = vec4(newValue, 0.0, 0.0, 1.0);
}

`;

const displayFragmentShader = `
uniform sampler2D uFluid;
uniform sampler2D uTopTexture;
uniform sampler2D uBottomTexture;
uniform vec2 uResolution;
uniform float uDpr;
uniform vec2 uTopTextureSize;
uniform vec2 uBottomTextureSize;

varying vec2 vUv;

vec2 getCoverUV(vec2 uv, vec2 textureSize) {
  if (textureSize.x < 1.0 || textureSize.y < 1.0) return uv;

  vec2 s = uResolution / textureSize;
  float scale = max(s.x, s.y);

  vec2 scaledSize = textureSize * scale;
  vec2 offset = (uResolution - scaledSize) * 0.5;
  return (uv * uResolution - offset) / scaledSize;
}

void main() {
  float fluid = texture2D(uFluid, vUv).r;

  vec2 topUV = getCoverUV(vUv, uTopTextureSize);
  vec4 topColor = texture2D(uTopTexture, topUV);

  vec2 bottomUV = getCoverUV(vUv, uBottomTextureSize);
  vec4 bottomColor = texture2D(uBottomTexture, bottomUV);

  float threshold = 0.02;
  float edgeWidth = 0.004 / uDpr;

  float t = smoothstep(threshold, threshold + edgeWidth, fluid);

  vec4 finalColor = mix(bottomColor, topColor, t);
  gl_FragColor = finalColor;
}
`;

export { vertexShader, fluidFragmentShader, displayFragmentShader };
