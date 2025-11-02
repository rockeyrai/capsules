
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./PortfolioFeature1.module.css";
import {
  vertexShader,
  fluidFragmentShader,
  displayFragmentShader,
} from "./shader";

const PortfolioFeature1: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // ✅ Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      precision: "highp",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ✅ Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // ✅ Mouse & movement states
    const mouse = new THREE.Vector2(0.5, 0.5);
    const prevMouse = new THREE.Vector2(0.5, 0.5);
    let isMoving = false;
    let lastMoveTime = 0;

    // ✅ Ping-pong targets for fluid trails
    const size = 500;
    const pingPongTargets = [
      new THREE.WebGLRenderTarget(size, size, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      }),
      new THREE.WebGLRenderTarget(size, size, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
      }),
    ];
    let currentTarget = 0;

    // ✅ Placeholder textures
    const topTexture = createPlaceholderTexture("#0000ff");
    const bottomTexture = createPlaceholderTexture("#ff0000");

    const topTextureSize = new THREE.Vector2(1, 1);
    const bottomTextureSize = new THREE.Vector2(1, 1);

    // ✅ Fluid simulation shader material
    const trailsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPrevTrails: { value: null },
        uMouse: { value: mouse },
        uPrevMouse: { value: prevMouse },
        uDecay: { value: 0.97 },
        uIsMoving: { value: false },
      },
      vertexShader,
      fragmentShader: fluidFragmentShader,
    });

    // ✅ Display shader material
    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uFluid: { value: null },
        uTopTexture: { value: topTexture },
        uBottomTexture: { value: bottomTexture },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uDpr: { value: window.devicePixelRatio },
        uTopTextureSize: { value: topTextureSize },
        uBottomTextureSize: { value: bottomTextureSize },
      },
      vertexShader,
      fragmentShader: displayFragmentShader,
    });

    // ✅ Load actual images if needed
    loadImage("/hero/image1.jpg", topTexture, topTextureSize, true);
    loadImage("/hero/image2.jpg", bottomTexture, bottomTextureSize, false);

    // ✅ Plane geometry & meshes
    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    const displayMesh = new THREE.Mesh(planeGeometry, displayMaterial);
    scene.add(displayMesh);

    const simMesh = new THREE.Mesh(planeGeometry, trailsMaterial);
    const simScene = new THREE.Scene();
    simScene.add(simMesh);

    // ✅ Clear render targets initially
    pingPongTargets.forEach((target) => {
      renderer.setRenderTarget(target);
      renderer.clear();
    });
    renderer.setRenderTarget(null);

    // ✅ Mouse handling
    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        prevMouse.copy(mouse);
        mouse.x = (event.clientX - rect.left) / rect.width;
        mouse.y = 1 - (event.clientY - rect.top) / rect.height;

        isMoving = true;
        lastMoveTime = performance.now();
      } else {
        isMoving = false;
      }
    };

    const onWindowResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      displayMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      displayMaterial.uniforms.uDpr.value = window.devicePixelRatio;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onWindowResize);

    // ✅ Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (isMoving && performance.now() - lastMoveTime > 50) {
        isMoving = false;
      }

      const prevTarget = pingPongTargets[currentTarget];
      currentTarget = (currentTarget + 1) % 2;
      const currentRenderTarget = pingPongTargets[currentTarget];

      trailsMaterial.uniforms.uPrevTrails.value = prevTarget.texture;
      trailsMaterial.uniforms.uMouse.value.copy(mouse);
      trailsMaterial.uniforms.uPrevMouse.value.copy(prevMouse);
      trailsMaterial.uniforms.uIsMoving.value = isMoving;

      renderer.setRenderTarget(currentRenderTarget);
      renderer.render(simScene, camera);

      displayMaterial.uniforms.uFluid.value = currentRenderTarget.texture;

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
    };

    animate();

    // ✅ Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      pingPongTargets.forEach((t) => t.dispose());
    };

    // ---------- Helper Functions ----------

    function createPlaceholderTexture(color: string): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get 2D context");
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 512, 512);
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    }

    function loadImage(
      url: string,
      targetTexture: THREE.Texture,
      textureSize: THREE.Vector2,
      isTop: boolean
    ) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const originWidth = img.width;
        const originHeight = img.height;
        textureSize.set(originWidth, originHeight);

        const maxSize = 4096;
        let newWidth = originWidth;
        let newHeight = originHeight;

        if (originWidth > maxSize || originHeight > maxSize) {
          if (originWidth > originHeight) {
            newWidth = maxSize;
            newHeight = Math.floor(originHeight * (maxSize / originWidth));
          } else {
            newHeight = maxSize;
            newWidth = Math.floor(originWidth * (maxSize / originHeight));
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const newTexture = new THREE.CanvasTexture(canvas);
        newTexture.minFilter = THREE.LinearFilter;
        newTexture.magFilter = THREE.LinearFilter;

        if (isTop) {
          displayMaterial.uniforms.uTopTexture.value = newTexture;
        } else {
          displayMaterial.uniforms.uBottomTexture.value = newTexture;
        }
      };

      img.onerror = (err) => console.error(`Error loading image: ${url}`, err);
      img.src = url;
    }
  }, []);

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </section>
  );
};

export default PortfolioFeature1;
