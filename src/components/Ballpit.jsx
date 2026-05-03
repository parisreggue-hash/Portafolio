import { useEffect, useRef } from 'react';
import {
  Vector3,
  MeshPhysicalMaterial,
  InstancedMesh,
  Clock,
  AmbientLight,
  SphereGeometry,
  ShaderChunk,
  Scene,
  Color,
  Object3D,
  SRGBColorSpace,
  MathUtils,
  PMREMGenerator,
  Vector2,
  WebGLRenderer,
  PerspectiveCamera,
  PointLight,
  ACESFilmicToneMapping,
  Plane,
  Raycaster
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

class ThreeApp {
  constructor(e) {
    this._config = { ...e };
    this._clock = new Clock();
    this._time = { elapsed: 0, delta: 0 };
    this._isVisible = false;
    this._isRunning = false;
    this._resizeTimeout = null;
    this._animFrame = null;
    this._composer = null;
    this.size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
    this.render = this._defaultRender.bind(this);
    this.onBeforeRender = () => {};
    this.onAfterRender = () => {};
    this.onAfterResize = () => {};
    this.isDisposed = false;
    this._initCamera();
    this._initScene();
    this._initRenderer();
    this.resize();
    this._initObservers();
  }
  _initCamera() {
    this.camera = new PerspectiveCamera();
    this.cameraFov = this.camera.fov;
  }
  _initScene() {
    this.scene = new Scene();
  }
  _initRenderer() {
    if (this._config.canvas) {
      this.canvas = this._config.canvas;
    } else if (this._config.id) {
      this.canvas = document.getElementById(this._config.id);
    }
    this.canvas.style.display = 'block';
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
      ...(this._config.rendererOptions ?? {})
    });
    this.renderer.outputColorSpace = SRGBColorSpace;
  }
  _initObservers() {
    if (!(this._config.size instanceof Object)) {
      window.addEventListener('resize', this._onResize.bind(this));
      if (this._config.size === 'parent' && this.canvas.parentNode) {
        this._resizeObserver = new ResizeObserver(this._onResize.bind(this));
        this._resizeObserver.observe(this.canvas.parentNode);
      }
    }
    this._intersectionObserver = new IntersectionObserver((entries) => {
      this._isVisible = entries[0].isIntersecting;
      this._isVisible ? this._startLoop() : this._stopLoop();
    }, { root: null, rootMargin: '0px', threshold: 0 });
    this._intersectionObserver.observe(this.canvas);
    document.addEventListener('visibilitychange', this._onVisibility.bind(this));
  }
  _onVisibility() {
    if (this._isVisible) {
      document.hidden ? this._stopLoop() : this._startLoop();
    }
  }
  _onResize() {
    if (this._resizeTimeout) clearTimeout(this._resizeTimeout);
    this._resizeTimeout = setTimeout(this.resize.bind(this), 100);
  }
  resize() {
    let w, h;
    if (this._config.size instanceof Object) {
      w = this._config.size.width;
      h = this._config.size.height;
    } else if (this._config.size === 'parent' && this.canvas.parentNode) {
      w = this.canvas.parentNode.offsetWidth;
      h = this.canvas.parentNode.offsetHeight;
    } else {
      w = window.innerWidth;
      h = window.innerHeight;
    }
    this.size.width = w;
    this.size.height = h;
    this.size.ratio = w / h;
    this._updateCamera();
    this._updateRenderer();
    this.onAfterResize(this.size);
  }
  _updateCamera() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.camera.isPerspectiveCamera && this.cameraFov) {
      if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
        const t = Math.tan(MathUtils.degToRad(this.cameraFov / 2)) / (this.camera.aspect / this.cameraMaxAspect);
        this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(t));
      } else {
        this.camera.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }
  updateWorldSize() {
    if (this.camera.isPerspectiveCamera) {
      const fov = (this.camera.fov * Math.PI) / 180;
      this.size.wHeight = 2 * Math.tan(fov / 2) * this.camera.position.length();
      this.size.wWidth = this.size.wHeight * this.camera.aspect;
    }
  }
  _updateRenderer() {
    this.renderer.setSize(this.size.width, this.size.height);
    let pr = window.devicePixelRatio;
    if (this.maxPixelRatio && pr > this.maxPixelRatio) pr = this.maxPixelRatio;
    if (this.minPixelRatio && pr < this.minPixelRatio) pr = this.minPixelRatio;
    this.renderer.setPixelRatio(pr);
    this.size.pixelRatio = pr;
  }
  _startLoop() {
    if (this._isRunning) return;
    const animate = () => {
      this._animFrame = requestAnimationFrame(animate);
      this._time.delta = this._clock.getDelta();
      this._time.elapsed += this._time.delta;
      this.onBeforeRender(this._time);
      this.render();
      this.onAfterRender(this._time);
    };
    this._isRunning = true;
    this._clock.start();
    animate();
  }
  _stopLoop() {
    if (this._isRunning) {
      cancelAnimationFrame(this._animFrame);
      this._isRunning = false;
      this._clock.stop();
    }
  }
  _defaultRender() {
    this.renderer.render(this.scene, this.camera);
  }
  clear() {
    this.scene.traverse(obj => {
      if (obj.isMesh) {
        if (obj.material) {
          Object.keys(obj.material).forEach(k => {
            const v = obj.material[k];
            if (v && typeof v.dispose === 'function') v.dispose();
          });
          obj.material.dispose();
        }
        if (obj.geometry) obj.geometry.dispose();
      }
    });
    this.scene.clear();
  }
  dispose() {
    window.removeEventListener('resize', this._onResize.bind(this));
    this._resizeObserver?.disconnect();
    this._intersectionObserver?.disconnect();
    document.removeEventListener('visibilitychange', this._onVisibility.bind(this));
    this._stopLoop();
    this.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.isDisposed = true;
  }
}

const pointerMap = new Map();
const pointerPos = new Vector2();
let pointerListening = false;

function createPointer(config) {
  const state = {
    position: new Vector2(),
    nPosition: new Vector2(),
    hover: false,
    touching: false,
    onEnter() {},
    onMove() {},
    onClick() {},
    onLeave() {},
    ...config
  };
  if (!pointerMap.has(config.domElement)) {
    pointerMap.set(config.domElement, state);
    if (!pointerListening) {
      document.body.addEventListener('pointermove', onPointerMove);
      document.body.addEventListener('pointerleave', onPointerLeave);
      document.body.addEventListener('click', onPointerClick);
      // ✅ Por esto:
document.body.addEventListener('touchstart', onTouchStart, { passive: true });
document.body.addEventListener('touchmove', onTouchMove, { passive: true });
document.body.addEventListener('touchend', onTouchEnd, { passive: true });
document.body.addEventListener('touchcancel', onTouchEnd, { passive: true });
      pointerListening = true;
    }
  }
  state.dispose = () => {
    pointerMap.delete(config.domElement);
    if (pointerMap.size === 0) {
      document.body.removeEventListener('pointermove', onPointerMove);
      document.body.removeEventListener('pointerleave', onPointerLeave);
      document.body.removeEventListener('click', onPointerClick);
      document.body.removeEventListener('touchstart', onTouchStart);
      document.body.removeEventListener('touchmove', onTouchMove);
      document.body.removeEventListener('touchend', onTouchEnd);
      document.body.removeEventListener('touchcancel', onTouchEnd);
      pointerListening = false;
    }
  };
  return state;
}

function onPointerMove(e) {
  pointerPos.x = e.clientX;
  pointerPos.y = e.clientY;
  processPointer();
}

function processPointer() {
  for (const [elem, state] of pointerMap) {
    const rect = elem.getBoundingClientRect();
    if (isInside(rect)) {
      updatePos(state, rect);
      if (!state.hover) { state.hover = true; state.onEnter(state); }
      state.onMove(state);
    } else if (state.hover && !state.touching) {
      state.hover = false;
      state.onLeave(state);
    }
  }
}

function onPointerClick(e) {
  pointerPos.x = e.clientX;
  pointerPos.y = e.clientY;
  for (const [elem, state] of pointerMap) {
    const rect = elem.getBoundingClientRect();
    updatePos(state, rect);
    if (isInside(rect)) state.onClick(state);
  }
}

function onPointerLeave() {
  for (const state of pointerMap.values()) {
    if (state.hover) { state.hover = false; state.onLeave(state); }
  }
}

function onTouchStart(e) {
  if (e.touches.length > 0) {
   
    pointerPos.x = e.touches[0].clientX;
    pointerPos.y = e.touches[0].clientY;
    for (const [elem, state] of pointerMap) {
      const rect = elem.getBoundingClientRect();
      if (isInside(rect)) {
        state.touching = true;
        updatePos(state, rect);
        if (!state.hover) { state.hover = true; state.onEnter(state); }
        state.onMove(state);
      }
    }
  }
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
  
    pointerPos.x = e.touches[0].clientX;
    pointerPos.y = e.touches[0].clientY;
    for (const [elem, state] of pointerMap) {
      const rect = elem.getBoundingClientRect();
      updatePos(state, rect);
      if (isInside(rect)) {
        if (!state.hover) { state.hover = true; state.touching = true; state.onEnter(state); }
        state.onMove(state);
      } else if (state.hover && state.touching) {
        state.onMove(state);
      }
    }
  }
}

function onTouchEnd() {
  for (const state of pointerMap.values()) {
    if (state.touching) {
      state.touching = false;
      if (state.hover) { state.hover = false; state.onLeave(state); }
    }
  }
}

function updatePos(state, rect) {
  state.position.x = pointerPos.x - rect.left;
  state.position.y = pointerPos.y - rect.top;
  state.nPosition.x = (state.position.x / rect.width) * 2 - 1;
  state.nPosition.y = (-state.position.y / rect.height) * 2 + 1;
}

function isInside(rect) {
  return pointerPos.x >= rect.left && pointerPos.x <= rect.left + rect.width &&
         pointerPos.y >= rect.top  && pointerPos.y <= rect.top  + rect.height;
}

const { randFloat, randFloatSpread } = MathUtils;

class BallphysicsEngine {
  constructor(config) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.center = new Vector3();
    this._initPositions();
    this.setSizes();
  }
  _initPositions() {
    const { config, positionData } = this;
    this.center.toArray(positionData, 0);
    for (let i = 1; i < config.count; i++) {
      const b = 3 * i;
      positionData[b]     = randFloatSpread(2 * config.maxX);
      positionData[b + 1] = randFloatSpread(2 * config.maxY);
      positionData[b + 2] = randFloatSpread(2 * config.maxZ);
    }
  }
  setSizes() {
    const { config, sizeData } = this;
    sizeData[0] = config.size0;
    for (let i = 1; i < config.count; i++) {
      sizeData[i] = randFloat(config.minSize, config.maxSize);
    }
  }
  update(time) {
    const { config, center, positionData, sizeData, velocityData } = this;
    const pos = new Vector3(), vel = new Vector3();
    const pos2 = new Vector3(), vel2 = new Vector3();
    const diff = new Vector3(), push = new Vector3(), push2 = new Vector3();
    const centerPos = new Vector3();

    let start = 0;
    if (config.controlSphere0) {
      start = 1;
      centerPos.fromArray(positionData, 0);
      centerPos.lerp(center, 0.1).toArray(positionData, 0);
      new Vector3(0,0,0).toArray(velocityData, 0);
    }

    for (let i = start; i < config.count; i++) {
      const b = 3 * i;
      pos.fromArray(positionData, b);
      vel.fromArray(velocityData, b);
      vel.y -= time.delta * config.gravity * sizeData[i];
      vel.multiplyScalar(config.friction);
      vel.clampLength(0, config.maxVelocity);
      pos.add(vel);
      pos.toArray(positionData, b);
      vel.toArray(velocityData, b);
    }

    for (let i = start; i < config.count; i++) {
      const b = 3 * i;
      pos.fromArray(positionData, b);
      vel.fromArray(velocityData, b);
      const r = sizeData[i];

      for (let j = i + 1; j < config.count; j++) {
        const b2 = 3 * j;
        pos2.fromArray(positionData, b2);
        vel2.fromArray(velocityData, b2);
        const r2 = sizeData[j];
        diff.copy(pos2).sub(pos);
        const dist = diff.length();
        const sumR = r + r2;
        if (dist < sumR) {
          const overlap = sumR - dist;
          push.copy(diff).normalize().multiplyScalar(0.5 * overlap);
          push2.copy(push).multiplyScalar(Math.max(vel2.length(), 1));
          const push1 = push.clone().multiplyScalar(Math.max(vel.length(), 1));
          pos.sub(push);
          vel.sub(push1);
          pos.toArray(positionData, b);
          vel.toArray(velocityData, b);
          pos2.add(push);
          vel2.add(push2);
          pos2.toArray(positionData, b2);
          vel2.toArray(velocityData, b2);
        }
      }

      if (config.controlSphere0) {
        centerPos.fromArray(positionData, 0);
        diff.copy(centerPos).sub(pos);
        const dist = diff.length();
        const sumR0 = r + sizeData[0];
        if (dist < sumR0) {
          const d = sumR0 - dist;
          push.copy(diff.normalize()).multiplyScalar(d);
          const push1 = push.clone().multiplyScalar(Math.max(vel.length(), 2));
          pos.sub(push);
          vel.sub(push1);
        }
      }

      if (Math.abs(pos.x) + r > config.maxX) {
        pos.x = Math.sign(pos.x) * (config.maxX - r);
        vel.x = -vel.x * config.wallBounce;
      }
      if (config.gravity === 0) {
        if (Math.abs(pos.y) + r > config.maxY) {
          pos.y = Math.sign(pos.y) * (config.maxY - r);
          vel.y = -vel.y * config.wallBounce;
        }
      } else if (pos.y - r < -config.maxY) {
        pos.y = -config.maxY + r;
        vel.y = -vel.y * config.wallBounce;
      }
      const maxB = Math.max(config.maxZ, config.maxSize);
      if (Math.abs(pos.z) + r > maxB) {
        pos.z = Math.sign(pos.z) * (config.maxZ - r);
        vel.z = -vel.z * config.wallBounce;
      }
      pos.toArray(positionData, b);
      vel.toArray(velocityData, b);
    }
  }
}

class SubsurfaceMaterial extends MeshPhysicalMaterial {
  constructor(params) {
    super(params);
    this.uniforms = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 }
    };
    this.defines.USE_UV = '';
    this.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.uniforms);

      shader.fragmentShader =
        `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
        ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        `
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }

        void main() {
        `
      );

      const patched = ShaderChunk.lights_fragment_begin.replaceAll(
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );',
        `
        RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
        RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `
      );
      shader.fragmentShader = shader.fragmentShader.replace('#include <lights_fragment_begin>', patched);
      if (this.onBeforeCompile2) this.onBeforeCompile2(shader);
    };
  }
}

const DEFAULT_CONFIG = {
  count: 200,
  colors: [0, 0, 0],
  ambientColor: 0xffffff,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: {
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.15
  },
  minSize: 0.5,
  maxSize: 1,
  size0: 1,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: true
};

const dummy = new Object3D();

class BallpitMesh extends InstancedMesh {
  constructor(renderer, opts = {}) {
    const config = { ...DEFAULT_CONFIG, ...opts };
    const env = new RoomEnvironment();
    const envTexture = new PMREMGenerator(renderer, 0.04).fromScene(env).texture;
    const geo = new SphereGeometry();
    const mat = new SubsurfaceMaterial({ envMap: envTexture, ...config.materialParams });
    mat.envMapRotation.x = -Math.PI / 2;
    super(geo, mat, config.count);
    this.config = config;
    this.physics = new BallphysicsEngine(config);
    this._addLights();
    this.setColors(config.colors);
  }
  _addLights() {
    this.ambientLight = new AmbientLight(this.config.ambientColor, this.config.ambientIntensity);
    this.add(this.ambientLight);
    this.light = new PointLight(this.config.colors[0], this.config.lightIntensity);
    this.add(this.light);
  }
  setColors(colors) {
    if (!Array.isArray(colors) || colors.length < 2) return;
    const colorObjs = colors.map(c => new Color(c));
    for (let i = 0; i < this.count; i++) {
      const t = i / this.count;
      const scaled = t * (colors.length - 1);
      const idx = Math.floor(scaled);
      const alpha = scaled - idx;
      const start = colorObjs[idx];
      const end = colorObjs[Math.min(idx + 1, colorObjs.length - 1)];
      const mixed = new Color(
        start.r + alpha * (end.r - start.r),
        start.g + alpha * (end.g - start.g),
        start.b + alpha * (end.b - start.b)
      );
      this.setColorAt(i, mixed);
      if (i === 0) this.light.color.copy(mixed);
    }
    this.instanceColor.needsUpdate = true;
  }
  update(time) {
    this.physics.update(time);
    for (let i = 0; i < this.count; i++) {
      dummy.position.fromArray(this.physics.positionData, 3 * i);
      if (i === 0 && this.config.followCursor === false) {
        dummy.scale.setScalar(0);
      } else {
        dummy.scale.setScalar(this.physics.sizeData[i]);
      }
      dummy.updateMatrix();
      this.setMatrixAt(i, dummy.matrix);
      if (i === 0) this.light.position.copy(dummy.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

function createBallpit(canvas, opts = {}) {
  const app = new ThreeApp({
    canvas,
    size: 'parent',
    rendererOptions: { antialias: true, alpha: true }
  });
  app.renderer.toneMapping = ACESFilmicToneMapping;
  app.camera.position.set(0, 0, 20);
  app.camera.lookAt(0, 0, 0);
  app.cameraMaxAspect = 1.5;
  app.resize();

  let mesh;
  let paused = false;

  function init(config) {
    if (mesh) { app.clear(); app.scene.remove(mesh); }
    mesh = new BallpitMesh(app.renderer, config);
    app.scene.add(mesh);
  }

  init(opts);

  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const target = new Vector3();

  canvas.style.touchAction = 'pan-y';
  canvas.style.userSelect = 'none';

  const pointer = createPointer({
    domElement: canvas,
    onMove() {
      raycaster.setFromCamera(pointer.nPosition, app.camera);
      app.camera.getWorldDirection(plane.normal);
      raycaster.ray.intersectPlane(plane, target);
      mesh.physics.center.copy(target);
      mesh.config.controlSphere0 = true;
    },
    onLeave() {
      mesh.config.controlSphere0 = false;
    }
  });

  app.onBeforeRender = (time) => {
    if (!paused) mesh.update(time);
  };
  app.onAfterResize = (size) => {
    mesh.config.maxX = size.wWidth / 2;
    mesh.config.maxY = size.wHeight / 2;
  };

  return {
    three: app,
    get spheres() { return mesh; },
    setCount(n) { init({ ...mesh.config, count: n }); },
    togglePause() { paused = !paused; },
    dispose() { pointer.dispose(); app.dispose(); }
  };
}

const Ballpit = ({ className = '', followCursor = true, ...props }) => {
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const timer = setTimeout(() => {
      if (!canvasRef.current) return;
      instanceRef.current = createBallpit(canvas, { followCursor, ...props });
    }, 50);
    return () => {
      clearTimeout(timer);
      if (instanceRef.current) {
        instanceRef.current.dispose();
        instanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default Ballpit;
