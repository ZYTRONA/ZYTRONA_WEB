import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Dark Premium TechGlobe Component
 * A futuristic 3D network globe for ZYTRONA with enhanced animations
 */
const TechGlobe = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const frameIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Configuration - Dark but visible colors
    const config = {
      radius: 2.8,
      rotationSpeed: 0.0018,
      primaryColor: 0x0077bb,      // Dark cyan
      secondaryColor: 0x004488,    // Dark blue
      accentColor: 0x00aadd,       // Visible accent
      darkColor: 0x001833,         // Very dark blue core
    };

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Globe group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const materials = [];
    const geometries = [];
    const pixelRatio = renderer.getPixelRatio();
    const phi = Math.PI * (3 - Math.sqrt(5));

    // ============================================
    // 1. DARK CORE SPHERE with scanning effect
    // ============================================
    const coreGeometry = new THREE.SphereGeometry(config.radius * 0.88, 64, 64);
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0x000810) },
        uColor2: { value: new THREE.Color(0x001525) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
          vec3 color = mix(uColor1, uColor2, fresnel * 0.8);
          
          // Multiple horizontal scan lines
          float scanY1 = mod(uTime * 0.4, 2.0) - 1.0;
          float scanY2 = mod(uTime * 0.25 + 1.0, 2.0) - 1.0;
          float scanLine1 = 1.0 - smoothstep(0.0, 0.08, abs(vPosition.y / 2.8 - scanY1));
          float scanLine2 = 1.0 - smoothstep(0.0, 0.06, abs(vPosition.y / 2.8 - scanY2));
          color += vec3(0.0, 0.25, 0.4) * scanLine1 * 0.5;
          color += vec3(0.0, 0.15, 0.3) * scanLine2 * 0.3;
          
          // Rotating grid pattern
          float rotAngle = uTime * 0.2;
          float rx = vPosition.x * cos(rotAngle) - vPosition.z * sin(rotAngle);
          float rz = vPosition.x * sin(rotAngle) + vPosition.z * cos(rotAngle);
          float grid = sin(vPosition.y * 25.0) * sin(rx * 25.0 + uTime * 2.0);
          grid = smoothstep(0.75, 1.0, grid) * 0.04;
          color += vec3(0.0, 0.35, 0.55) * grid;
          
          // Pulse wave from poles
          float poleWave = sin(abs(vPosition.y) * 3.0 - uTime * 2.5) * 0.5 + 0.5;
          color += vec3(0.0, 0.1, 0.2) * poleWave * 0.15;
          
          gl_FragColor = vec4(color, 0.92);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: true,
    });
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreSphere);
    materials.push(coreMaterial);
    geometries.push(coreGeometry);

    // ============================================
    // 2. HEXAGONAL GRID with wave animation
    // ============================================
    const hexRadius = config.radius * 1.005;
    const hexPoints = [];
    const hexCount = 500;

    for (let i = 0; i < hexCount; i++) {
      const y = 1 - (i / (hexCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      hexPoints.push(new THREE.Vector3(
        Math.cos(theta) * radiusAtY * hexRadius,
        y * hexRadius,
        Math.sin(theta) * radiusAtY * hexRadius
      ));
    }

    const hexLinePositions = [];
    const hexLineIndices = [];
    let lineIdx = 0;
    for (let i = 0; i < hexPoints.length; i++) {
      for (let j = i + 1; j < hexPoints.length; j++) {
        const dist = hexPoints[i].distanceTo(hexPoints[j]);
        if (dist < hexRadius * 0.22 && dist > hexRadius * 0.08) {
          hexLinePositions.push(
            hexPoints[i].x, hexPoints[i].y, hexPoints[i].z,
            hexPoints[j].x, hexPoints[j].y, hexPoints[j].z
          );
          hexLineIndices.push(lineIdx, lineIdx);
          lineIdx += 2;
        }
      }
    }

    const hexGeometry = new THREE.BufferGeometry();
    hexGeometry.setAttribute("position", new THREE.Float32BufferAttribute(hexLinePositions, 3));
    geometries.push(hexGeometry);

    const hexMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(config.primaryColor) },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying float vDist;
        void main() {
          vPosition = position;
          vDist = length(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        varying vec3 vPosition;
        varying float vDist;
        
        void main() {
          // Multiple pulsing waves
          float wave1 = sin(vDist * 4.0 - uTime * 3.0) * 0.5 + 0.5;
          float wave2 = sin(vDist * 2.5 + uTime * 2.0) * 0.5 + 0.5;
          // Spiral wave
          float angle = atan(vPosition.z, vPosition.x);
          float spiral = sin(angle * 3.0 + vPosition.y * 2.0 - uTime * 2.5) * 0.5 + 0.5;
          float alpha = 0.08 + wave1 * 0.08 + wave2 * 0.06 + spiral * 0.06;
          gl_FragColor = vec4(uColor * 0.7, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const hexLines = new THREE.LineSegments(hexGeometry, hexMaterial);
    globeGroup.add(hexLines);
    materials.push(hexMaterial);

    // ============================================
    // 3. LATITUDE RINGS with pulse animation
    // ============================================
    const latCount = 7;
    const latLines = [];
    for (let i = 1; i < latCount; i++) {
      const latPhi = (i / latCount) * Math.PI;
      const latRadius = config.radius * Math.sin(latPhi);
      const latY = config.radius * Math.cos(latPhi);

      const latPoints = [];
      for (let j = 0; j <= 128; j++) {
        const angle = (j / 128) * Math.PI * 2;
        latPoints.push(new THREE.Vector3(
          latRadius * Math.cos(angle),
          latY,
          latRadius * Math.sin(angle)
        ));
      }

      const latGeometry = new THREE.BufferGeometry().setFromPoints(latPoints);
      const latMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(config.primaryColor) },
          uIndex: { value: i },
        },
        vertexShader: `
          varying vec3 vPos;
          varying float vAngle;
          void main() {
            vPos = position;
            vAngle = atan(position.z, position.x);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uTime;
          uniform float uIndex;
          varying vec3 vPos;
          varying float vAngle;
          void main() {
            // Traveling light around ring
            float travelSpeed = 1.5 + uIndex * 0.2;
            float lightPos = mod(uTime * travelSpeed, 6.28318);
            float dist = abs(vAngle - lightPos + 3.14159);
            dist = min(dist, 6.28318 - dist);
            float travelLight = 1.0 - smoothstep(0.0, 0.8, dist);
            // Base pulse
            float pulse = 0.5 + 0.5 * sin(uTime * 2.0 + uIndex * 0.8);
            float alpha = 0.1 + pulse * 0.08 + travelLight * 0.35;
            vec3 col = mix(uColor * 0.5, uColor, travelLight);
            gl_FragColor = vec4(col, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const latLine = new THREE.Line(latGeometry, latMaterial);
      globeGroup.add(latLine);
      latLines.push(latLine);
      materials.push(latMaterial);
      geometries.push(latGeometry);
    }

    // ============================================
    // 4. LONGITUDE ARCS with staggered animation
    // ============================================
    const longCount = 12;
    for (let i = 0; i < longCount; i++) {
      const longPoints = [];
      const longAngle = (i / longCount) * Math.PI;

      for (let j = 0; j <= 64; j++) {
        const longPhi = (j / 64) * Math.PI;
        longPoints.push(new THREE.Vector3(
          config.radius * Math.sin(longPhi) * Math.cos(longAngle),
          config.radius * Math.cos(longPhi),
          config.radius * Math.sin(longPhi) * Math.sin(longAngle)
        ));
      }

      const longGeometry = new THREE.BufferGeometry().setFromPoints(longPoints);
      const longMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(config.primaryColor) },
          uIndex: { value: i },
        },
        vertexShader: `
          varying float vY;
          varying float vProgress;
          void main() {
            vY = position.y;
            vProgress = (position.y + 2.8) / 5.6;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uTime;
          uniform float uIndex;
          varying float vY;
          varying float vProgress;
          void main() {
            // Multiple traveling lights going opposite directions
            float travel1 = mod(uTime * 1.2 + uIndex * 0.4, 6.0) - 3.0;
            float travel2 = mod(-uTime * 0.9 + uIndex * 0.5 + 3.0, 6.0) - 3.0;
            float glow1 = 1.0 - smoothstep(0.0, 0.5, abs(vY - travel1));
            float glow2 = 1.0 - smoothstep(0.0, 0.4, abs(vY - travel2));
            float glow = max(glow1, glow2 * 0.7);
            // Pulse effect
            float pulse = sin(uTime * 3.0 + uIndex) * 0.3 + 0.7;
            float alpha = 0.06 + glow * 0.35 * pulse;
            vec3 col = mix(uColor * 0.4, uColor, glow);
            gl_FragColor = vec4(col, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const longLine = new THREE.Line(longGeometry, longMaterial);
      globeGroup.add(longLine);
      materials.push(longMaterial);
      geometries.push(longGeometry);
    }

    // ============================================
    // 5. NETWORK NODES with flicker animation
    // ============================================
    const nodeCount = 280;
    const nodePositionsArray = new Float32Array(nodeCount * 3);
    const nodeSizes = new Float32Array(nodeCount);
    const nodeIntensities = new Float32Array(nodeCount);
    const nodeOffsets = new Float32Array(nodeCount);
    const nodeVectors = [];

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY * config.radius;
      const z = Math.sin(theta) * radiusAtY * config.radius;
      const yPos = y * config.radius;

      nodeVectors.push(new THREE.Vector3(x, yPos, z));
      nodePositionsArray[i * 3] = x;
      nodePositionsArray[i * 3 + 1] = yPos;
      nodePositionsArray[i * 3 + 2] = z;

      const rand = Math.random();
      if (rand > 0.92) {
        nodeSizes[i] = 0.1;
        nodeIntensities[i] = 1.0;
      } else if (rand > 0.75) {
        nodeSizes[i] = 0.05;
        nodeIntensities[i] = 0.7;
      } else {
        nodeSizes[i] = 0.025;
        nodeIntensities[i] = 0.4;
      }
      nodeOffsets[i] = Math.random() * 10.0;
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositionsArray, 3));
    nodeGeometry.setAttribute("size", new THREE.BufferAttribute(nodeSizes, 1));
    nodeGeometry.setAttribute("intensity", new THREE.BufferAttribute(nodeIntensities, 1));
    nodeGeometry.setAttribute("offset", new THREE.BufferAttribute(nodeOffsets, 1));
    geometries.push(nodeGeometry);

    const nodeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(config.accentColor) },
        uPixelRatio: { value: pixelRatio },
      },
      vertexShader: `
        attribute float size;
        attribute float intensity;
        attribute float offset;
        uniform float uPixelRatio;
        uniform float uTime;
        varying float vIntensity;
        varying float vFlicker;
        varying float vPulsePhase;
        
        void main() {
          vIntensity = intensity;
          // Complex flicker effect
          float flicker = sin(uTime * 10.0 + offset * 25.0) * 0.25 + 0.75;
          flicker *= sin(uTime * 4.0 + offset * 8.0) * 0.15 + 0.85;
          flicker *= sin(uTime * 1.5 + offset * 2.0) * 0.2 + 0.8;
          // Random pop effect
          float pop = step(0.97, sin(uTime * 0.5 + offset * 50.0)) * 0.5;
          vFlicker = flicker + pop;
          vPulsePhase = sin(uTime * 3.0 + offset * 4.0);
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float pulse = 1.0 + 0.5 * sin(uTime * 2.5 + offset * 3.0);
          float breathe = 1.0 + 0.2 * sin(uTime * 0.8);
          gl_PointSize = size * uPixelRatio * (400.0 / -mvPosition.z) * pulse * intensity * breathe;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vIntensity;
        varying float vFlicker;
        varying float vPulsePhase;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float core = 1.0 - smoothstep(0.0, 0.12, dist);
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          glow = pow(glow, 1.8);
          
          vec3 coreColor = vec3(0.85, 0.95, 1.0);
          vec3 finalColor = mix(uColor * 0.7, coreColor, core * 0.85);
          
          float alpha = (core + glow * 0.6) * vIntensity * vFlicker * 0.85;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    globeGroup.add(nodes);
    materials.push(nodeMaterial);

    // ============================================
    // 6. CONNECTION LINES with data flow
    // ============================================
    const connectionDist = config.radius * 0.4;
    const connectionPositions = [];
    const connectionAlphas = [];
    const connectionOffsets = [];

    for (let i = 0; i < nodeVectors.length; i++) {
      for (let j = i + 1; j < nodeVectors.length; j++) {
        const dist = nodeVectors[i].distanceTo(nodeVectors[j]);
        if (dist < connectionDist && Math.random() > 0.6) {
          connectionPositions.push(
            nodeVectors[i].x, nodeVectors[i].y, nodeVectors[i].z,
            nodeVectors[j].x, nodeVectors[j].y, nodeVectors[j].z
          );
          const alpha = 1 - dist / connectionDist;
          connectionAlphas.push(alpha, alpha);
          const off = Math.random() * 10;
          connectionOffsets.push(off, off);
        }
      }
    }

    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute("position", new THREE.Float32BufferAttribute(connectionPositions, 3));
    connectionGeometry.setAttribute("alpha", new THREE.Float32BufferAttribute(connectionAlphas, 1));
    connectionGeometry.setAttribute("offset", new THREE.Float32BufferAttribute(connectionOffsets, 1));
    geometries.push(connectionGeometry);

    const connectionMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(config.primaryColor) },
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float alpha;
        attribute float offset;
        varying float vAlpha;
        varying float vOffset;
        varying vec3 vPos;
        void main() {
          vAlpha = alpha;
          vOffset = offset;
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        varying float vAlpha;
        varying float vOffset;
        varying vec3 vPos;
        void main() {
          // Data packet traveling along line
          float packet = mod(uTime * 3.0 + vOffset * 2.0, 4.0);
          float packetGlow = 1.0 - smoothstep(0.0, 0.3, abs(length(vPos) - packet));
          // Base pulse
          float pulse = 0.4 + 0.6 * sin(uTime * 2.5 + vOffset);
          float flicker = sin(uTime * 6.0 + vOffset * 4.0) * 0.2 + 0.8;
          float alpha = vAlpha * 0.25 * pulse * flicker + packetGlow * 0.3;
          vec3 col = mix(uColor * 0.5, uColor, packetGlow);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
    globeGroup.add(connections);
    materials.push(connectionMaterial);

    // ============================================
    // 7. ENERGY RINGS (animated orbital rings)
    // ============================================
    const orbitalRadii = [config.radius * 1.2, config.radius * 1.4, config.radius * 1.6];
    const orbitals = [];
    const orbitalMaterials = [];

    orbitalRadii.forEach((orbRadius, index) => {
      const orbPoints = [];
      for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2;
        orbPoints.push(new THREE.Vector3(
          orbRadius * Math.cos(angle),
          0,
          orbRadius * Math.sin(angle)
        ));
      }

      const orbGeometry = new THREE.BufferGeometry().setFromPoints(orbPoints);
      const orbMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(config.primaryColor) },
          uIndex: { value: index },
        },
        vertexShader: `
          varying float vAngle;
          void main() {
            vAngle = atan(position.z, position.x);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uTime;
          uniform float uIndex;
          varying float vAngle;
          void main() {
            // Rotating bright spot
            float spot = mod(uTime * (0.8 + uIndex * 0.2) + uIndex, 6.28318);
            float dist = abs(vAngle - spot + 3.14159);
            dist = min(dist, 6.28318 - dist);
            float glow = 1.0 - smoothstep(0.0, 1.2, dist);
            float alpha = 0.12 + glow * 0.4;
            vec3 col = mix(uColor * 0.5, uColor, glow);
            gl_FragColor = vec4(col, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const orbLine = new THREE.Line(orbGeometry, orbMaterial);
      orbLine.rotation.x = Math.PI * 0.42 + index * 0.12;
      orbLine.rotation.z = index * 0.35;
      globeGroup.add(orbLine);
      orbitals.push(orbLine);
      orbitalMaterials.push(orbMaterial);
      materials.push(orbMaterial);
      geometries.push(orbGeometry);
    });

    // ============================================
    // 8. SUBTLE ATMOSPHERE
    // ============================================
    const atmosGeometry = new THREE.SphereGeometry(config.radius * 1.06, 64, 64);
    const atmosMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(config.primaryColor) },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          float pulse = 0.7 + 0.3 * sin(uTime * 0.5);
          gl_FragColor = vec4(uColor * 0.7, intensity * 0.25 * pulse);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
    globeGroup.add(atmosphere);
    materials.push(atmosMaterial);
    geometries.push(atmosGeometry);

    // ============================================
    // 9. FLOATING DUST PARTICLES
    // ============================================
    const particleCount = 800;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleAlphas = new Float32Array(particleCount);
    const particleOffsets = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = config.radius * (1.15 + Math.pow(Math.random(), 0.5) * 2.0);
      const theta = Math.random() * Math.PI * 2;
      const phiAngle = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = r * Math.sin(phiAngle) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phiAngle) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phiAngle);

      particleSizes[i] = 0.008 + Math.random() * 0.02;
      particleAlphas[i] = 0.15 + Math.random() * 0.35;
      particleOffsets[i] = Math.random() * 20.0;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute("alpha", new THREE.BufferAttribute(particleAlphas, 1));
    particleGeometry.setAttribute("offset", new THREE.BufferAttribute(particleOffsets, 1));
    geometries.push(particleGeometry);

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(config.primaryColor) },
        uPixelRatio: { value: pixelRatio },
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        attribute float offset;
        uniform float uPixelRatio;
        uniform float uTime;
        varying float vAlpha;
        
        void main() {
          vec3 pos = position;
          // Organic floating motion
          pos.x += sin(uTime * 0.15 + offset) * 0.15;
          pos.y += cos(uTime * 0.12 + offset * 0.7) * 0.12;
          pos.z += sin(uTime * 0.1 + offset * 1.3) * 0.1;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Twinkle effect
          float twinkle = sin(uTime * 4.0 + offset * 8.0) * 0.4 + 0.6;
          vAlpha = alpha * twinkle;
          
          gl_PointSize = size * uPixelRatio * (150.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(uColor * 0.5, alpha * vAlpha * 0.3);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    materials.push(particleMaterial);

    // ============================================
    // 10. DATA STREAMS with trail effect
    // ============================================
    const streamCount = 300;
    const streamPositions = new Float32Array(streamCount * 3);
    const streamSizes = new Float32Array(streamCount);
    const streamOffsets = new Float32Array(streamCount);
    const streamSpeeds = new Float32Array(streamCount);

    for (let i = 0; i < streamCount; i++) {
      const x = -config.radius * 5 - Math.random() * config.radius * 3;
      const y = (Math.random() - 0.5) * config.radius * 4;
      const z = (Math.random() - 0.5) * config.radius * 3;

      streamPositions[i * 3] = x;
      streamPositions[i * 3 + 1] = y;
      streamPositions[i * 3 + 2] = z;

      streamSizes[i] = 0.01 + Math.random() * 0.02;
      streamOffsets[i] = Math.random() * 15;
      streamSpeeds[i] = 0.8 + Math.random() * 0.6;
    }

    const streamGeometry = new THREE.BufferGeometry();
    streamGeometry.setAttribute("position", new THREE.BufferAttribute(streamPositions, 3));
    streamGeometry.setAttribute("size", new THREE.BufferAttribute(streamSizes, 1));
    streamGeometry.setAttribute("offset", new THREE.BufferAttribute(streamOffsets, 1));
    streamGeometry.setAttribute("speed", new THREE.BufferAttribute(streamSpeeds, 1));
    geometries.push(streamGeometry);

    const streamMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(config.primaryColor) },
        uPixelRatio: { value: pixelRatio },
      },
      vertexShader: `
        attribute float size;
        attribute float offset;
        attribute float speed;
        uniform float uPixelRatio;
        uniform float uTime;
        varying float vAlpha;
        varying float vTrail;
        
        void main() {
          vec3 pos = position;
          float flow = mod(uTime * speed + offset, 14.0);
          pos.x += flow * 1.5;
          
          // Slight wave motion
          pos.y += sin(uTime * 2.0 + offset) * 0.05;
          
          float fadeIn = smoothstep(-14.0, -10.0, pos.x);
          float fadeOut = 1.0 - smoothstep(-3.5, -1.5, pos.x);
          vAlpha = fadeIn * fadeOut;
          vTrail = flow / 14.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float pulse = 0.6 + 0.4 * sin(uTime * 4.0 + offset * 5.0);
          gl_PointSize = size * uPixelRatio * (140.0 / -mvPosition.z) * pulse;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        varying float vTrail;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          // Brighter as approaches globe
          vec3 col = mix(uColor * 0.4, uColor * 0.8, vTrail);
          gl_FragColor = vec4(col, alpha * vAlpha * 0.5);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const streams = new THREE.Points(streamGeometry, streamMaterial);
    scene.add(streams);
    materials.push(streamMaterial);

    // ============================================
    // 11. PULSE WAVE RINGS
    // ============================================
    const pulseRings = [];
    const pulseCount = 3;
    for (let i = 0; i < pulseCount; i++) {
      const ringGeometry = new THREE.RingGeometry(config.radius * 0.95, config.radius * 1.0, 64);
      const ringMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(config.primaryColor) },
          uIndex: { value: i },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uTime;
          uniform float uIndex;
          varying vec2 vUv;
          void main() {
            float pulse = mod(uTime * 0.4 + uIndex * 1.5, 4.5);
            float scale = pulse;
            float fade = 1.0 - pulse / 4.5;
            fade = pow(fade, 2.0);
            gl_FragColor = vec4(uColor * 0.4, fade * 0.15);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI * 0.5;
      ring.userData.baseScale = 1;
      ring.userData.index = i;
      globeGroup.add(ring);
      pulseRings.push(ring);
      materials.push(ringMaterial);
      geometries.push(ringGeometry);
    }

    // Initial globe tilt
    globeGroup.rotation.x = 0.15;
    globeGroup.rotation.z = 0.08;

    // Animation
    const startTime = Date.now();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsed = (Date.now() - startTime) * 0.001;

      // Update uniforms
      materials.forEach((mat) => {
        if (mat.uniforms?.uTime) mat.uniforms.uTime.value = elapsed;
      });

      // Rotate globe with subtle oscillation
      const oscillation = Math.sin(elapsed * 0.3) * 0.0003;
      globeGroup.rotation.y += config.rotationSpeed + oscillation;
      
      // Subtle breathing effect on globe tilt
      globeGroup.rotation.x = 0.15 + Math.sin(elapsed * 0.2) * 0.02;
      globeGroup.rotation.z = 0.08 + Math.cos(elapsed * 0.15) * 0.015;

      // Animate pulse rings with varied speeds
      pulseRings.forEach((ring, i) => {
        const speed = 0.5 + i * 0.15;
        const pulse = ((elapsed * speed + i * 1.2) % 4.5);
        const scale = 1 + pulse * 0.9;
        ring.scale.set(scale, scale, 1);
        ring.rotation.z = elapsed * 0.1 * (i + 1);
      });

      // Counter-rotate orbitals with wobble
      orbitals.forEach((orb, i) => {
        orb.rotation.z += config.rotationSpeed * (0.5 + i * 0.2);
        orb.rotation.x = Math.PI * 0.42 + i * 0.12 + Math.sin(elapsed * 0.3 + i) * 0.03;
      });

      // Rotate particles with wave motion
      particles.rotation.y -= config.rotationSpeed * 0.2;
      particles.rotation.x = Math.sin(elapsed * 0.1) * 0.05;

      // Rotate streams slightly
      streams.rotation.y = Math.sin(elapsed * 0.1) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;

      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);

      const newPixelRatio = Math.min(window.devicePixelRatio, 2);
      rendererRef.current.setPixelRatio(newPixelRatio);
      nodeMaterial.uniforms.uPixelRatio.value = newPixelRatio;
      particleMaterial.uniforms.uPixelRatio.value = newPixelRatio;
      streamMaterial.uniforms.uPixelRatio.value = newPixelRatio;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);

      geometries.forEach((geo) => geo.dispose());
      materials.forEach((mat) => mat.dispose());

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (container?.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
        background: "transparent",
      }}
    />
  );
};

export default TechGlobe;
