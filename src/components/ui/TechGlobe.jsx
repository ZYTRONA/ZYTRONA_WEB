import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function TechGlobe() {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const frameIdRef = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || 480
    const height = container.clientHeight || 480

    // Theme Colors for Frosted White & Sleek Black
    const config = {
      radius: 2.6,
      rotationSpeed: 0.0015,
      primaryColor: 0x0f172a,     // Deep obsidian black
      secondaryColor: 0x334155,   // Dark slate
      accentColor: 0x000000,      // Pure black
      nodeColor: 0x1e293b,        // Slate 800
      hubColor: 0x475569,         // Slate 600
      glassColor: 0xf1f5f9,       // Frosted white glass
    }

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0.3, 7.2)

    // Renderer with high precision and transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Main globe group
    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const materials = []
    const geometries = []

    // ============================================
    // 1. TRANSLUCENT FROSTED GLASS CORE (Soft Cyan / Blur White)
    // ============================================
    const coreGeometry = new THREE.SphereGeometry(config.radius * 0.95, 64, 64)
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0xecfdf5) }, // Soft mint white
        uColor2: { value: new THREE.Color(0x99f6e4) }, // Translucent teal glow
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Fresnel rim lighting for glass edge
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.2);
          
          // Subtle horizontal scanning wave
          float scan = sin(vPosition.y * 3.0 - uTime * 1.5) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, fresnel * 0.75 + scan * 0.15);
          
          // Translucent alpha (never dark or pitch black)
          float alpha = 0.18 + fresnel * 0.35 + scan * 0.05;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
    })
    const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial)
    globeGroup.add(coreSphere)
    materials.push(coreMaterial)
    geometries.push(coreGeometry)

    // ============================================
    // 2. DOTTED GLOBE MATRIX (Fibonacci Sphere Distribution)
    // ============================================
    const dotCount = 1400
    const dotPositions = []
    const dotSizes = []
    const phi = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = phi * i

      const x = Math.cos(theta) * radiusAtY * config.radius
      const z = Math.sin(theta) * radiusAtY * config.radius
      dotPositions.push(x, y * config.radius, z)

      // Random dot size variation for natural sparkle
      dotSizes.push(1.5 + Math.random() * 2.5)
    }

    const dotGeometry = new THREE.BufferGeometry()
    dotGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3))
    dotGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute(dotSizes, 1))

    const dotMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(config.primaryColor) },
        uColorAccent: { value: new THREE.Color(config.secondaryColor) },
      },
      vertexShader: `
        attribute float aSize;
        varying vec3 vPosition;
        uniform float uTime;
        void main() {
          vPosition = position;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (160.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uColorAccent;
        uniform float uTime;
        varying vec3 vPosition;

        void main() {
          // Circular particle shape
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.1, dist);
          
          // Shimmer wave
          float shimmer = sin(vPosition.y * 5.0 + uTime * 3.0) * 0.5 + 0.5;
          vec3 col = mix(uColor, uColorAccent, shimmer);
          
          gl_FragColor = vec4(col, alpha * 0.75);
        }
      `,
      transparent: true,
      depthWrite: false,
    })
    const dotPoints = new THREE.Points(dotGeometry, dotMaterial)
    globeGroup.add(dotPoints)
    materials.push(dotMaterial)
    geometries.push(dotGeometry)

    // ============================================
    // 3. GLOBAL TECH HUBS & PULSING BEACONS
    // ============================================
    // Key worldwide technology centers (lat/long in radians)
    const hubCoordinates = [
      { lat: 37.7749, lng: -122.4194, name: 'San Francisco' },
      { lat: 40.7128, lng: -74.006, name: 'New York' },
      { lat: 51.5074, lng: -0.1278, name: 'London' },
      { lat: 52.52, lng: 13.405, name: 'Berlin' },
      { lat: 12.9716, lng: 77.5946, name: 'Bangalore' },
      { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
      { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
      { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
      { lat: 25.2048, lng: 55.2708, name: 'Dubai' },
    ]

    const latLngToVector3 = (lat, lng, radius) => {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)
      return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      )
    }

    const hubPoints = hubCoordinates.map((coord) =>
      latLngToVector3(coord.lat, coord.lng, config.radius * 1.01)
    )

    // Draw glowing pulsing rings at each hub
    hubPoints.forEach((point) => {
      // Small solid beacon sphere
      const beaconGeom = new THREE.SphereGeometry(0.065, 16, 16)
      const beaconMat = new THREE.MeshBasicMaterial({
        color: config.hubColor,
      })
      const beaconMesh = new THREE.Mesh(beaconGeom, beaconMat)
      beaconMesh.position.copy(point)
      globeGroup.add(beaconMesh)
      materials.push(beaconMat)
      geometries.push(beaconGeom)

      // Outer ripple ring
      const ringGeom = new THREE.RingGeometry(0.08, 0.14, 24)
      const ringMat = new THREE.MeshBasicMaterial({
        color: config.secondaryColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      })
      const ringMesh = new THREE.Mesh(ringGeom, ringMat)
      ringMesh.position.copy(point)
      ringMesh.lookAt(point.clone().multiplyScalar(2))
      globeGroup.add(ringMesh)
      materials.push(ringMat)
      geometries.push(ringGeom)
    })

    // ============================================
    // 4. ANIMATED INTERCONTINENTAL DATA ARCS
    // ============================================
    const arcPairs = [
      [0, 1], // SF -> NY
      [1, 2], // NY -> London
      [2, 3], // London -> Berlin
      [2, 8], // London -> Dubai
      [8, 4], // Dubai -> Bangalore
      [4, 5], // Bangalore -> Singapore
      [5, 6], // Singapore -> Tokyo
      [6, 7], // Tokyo -> Sydney
      [0, 6], // SF -> Tokyo
    ]

    arcPairs.forEach(([startIdx, endIdx], arcIndex) => {
      const p1 = hubPoints[startIdx]
      const p2 = hubPoints[endIdx]

      // Midpoint elevated away from globe center for curve
      const mid = p1.clone().add(p2).multiplyScalar(0.5)
      const distance = p1.distanceTo(p2)
      mid.normalize().multiplyScalar(config.radius + distance * 0.35)

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2)
      const curvePoints = curve.getPoints(60)

      const arcGeom = new THREE.BufferGeometry().setFromPoints(curvePoints)
      const arcMat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(config.secondaryColor) },
          uOffset: { value: arcIndex * 0.3 },
        },
        vertexShader: `
          varying float vProgress;
          void main() {
            vProgress = uv.x;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uTime;
          uniform float uOffset;
          varying float vProgress;

          void main() {
            // Flowing data packet
            float t = mod(uTime * 0.8 + uOffset, 1.0);
            float packet = smoothstep(0.18, 0.0, abs(vProgress - t));
            float alpha = 0.25 + packet * 0.75;
            vec3 col = mix(uColor * 0.8, vec3(1.0), packet * 0.8);
            gl_FragColor = vec4(col, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
      })

      // Generate UV coords for curve
      const uvs = new Float32Array(curvePoints.length * 2)
      for (let i = 0; i < curvePoints.length; i++) {
        uvs[i * 2] = i / (curvePoints.length - 1)
        uvs[i * 2 + 1] = 0
      }
      arcGeom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))

      const arcLine = new THREE.Line(arcGeom, arcMat)
      globeGroup.add(arcLine)
      materials.push(arcMat)
      geometries.push(arcGeom)
    })

    // ============================================
    // 5. ELEGANT ORBITAL LATITUDE & LONGITUDE RINGS
    // ============================================
    const ringRadii = [config.radius * 1.08, config.radius * 1.18]
    ringRadii.forEach((r, idx) => {
      const ringPoints = []
      for (let i = 0; i <= 100; i++) {
        const theta = (i / 100) * Math.PI * 2
        ringPoints.push(new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r))
      }
      const ringGeom = new THREE.BufferGeometry().setFromPoints(ringPoints)
      const ringMat = new THREE.LineBasicMaterial({
        color: idx === 0 ? config.primaryColor : config.secondaryColor,
        transparent: true,
        opacity: 0.35,
      })
      const ringLine = new THREE.Line(ringGeom, ringMat)
      ringLine.rotation.x = Math.PI / 3 + idx * 0.4
      ringLine.rotation.y = idx * 0.6
      globeGroup.add(ringLine)
      materials.push(ringMat)
      geometries.push(ringGeom)
    })

    // ============================================
    // 6. ATMOSPHERIC HALO GLOW
    // ============================================
    const atmosphereGeom = new THREE.SphereGeometry(config.radius * 1.22, 48, 48)
    const atmosphereMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(config.secondaryColor) },
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
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          gl_FragColor = vec4(uColor, intensity * 0.45);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
    })
    const atmosphere = new THREE.Mesh(atmosphereGeom, atmosphereMat)
    globeGroup.add(atmosphere)
    materials.push(atmosphereMat)
    geometries.push(atmosphereGeom)

    // Initial slight tilt for aesthetic projection
    globeGroup.rotation.x = 0.22
    globeGroup.rotation.y = -0.4

    // ============================================
    // INTERACTION & ANIMATION LOOP
    // ============================================
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0.22
    let targetRotationY = -0.4
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    const handlePointerDown = (e) => {
      isDragging = true
      prevMouseX = e.clientX || e.touches?.[0]?.clientX || 0
      prevMouseY = e.clientY || e.touches?.[0]?.clientY || 0
    }

    const handlePointerMove = (e) => {
      const clientX = e.clientX || e.touches?.[0]?.clientX || 0
      const clientY = e.clientY || e.touches?.[0]?.clientY || 0

      if (isDragging) {
        const deltaX = clientX - prevMouseX
        const deltaY = clientY - prevMouseY
        prevMouseX = clientX
        prevMouseY = clientY

        targetRotationY += deltaX * 0.005
        targetRotationX += deltaY * 0.005
      } else {
        const rect = container.getBoundingClientRect()
        mouseX = ((clientX - rect.left) / width - 0.5) * 0.4
        mouseY = ((clientY - rect.top) / height - 0.5) * 0.4
      }
    }

    const handlePointerUp = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('mouseup', handlePointerUp)
    container.addEventListener('touchstart', handlePointerDown, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })
    window.addEventListener('touchend', handlePointerUp)

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation Loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Continuous gentle auto rotation
      if (!isDragging) {
        targetRotationY += config.rotationSpeed
      }

      // Smooth damping interpolation
      globeGroup.rotation.y += (targetRotationY + mouseX - globeGroup.rotation.y) * 0.06
      globeGroup.rotation.x += (targetRotationX + mouseY - globeGroup.rotation.x) * 0.06

      // Update shader uniforms
      materials.forEach((mat) => {
        if (mat.uniforms?.uTime) {
          mat.uniforms.uTime.value = elapsedTime
        }
      })

      renderer.render(scene, camera)
      frameIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup on unmount
    return () => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current)

      container.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('mouseup', handlePointerUp)
      container.removeEventListener('touchstart', handlePointerDown)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('touchend', handlePointerUp)
      window.removeEventListener('resize', handleResize)

      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())

      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose()
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement)
        }
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="tech-globe-container"
      style={{
        width: '100%',
        height: '100%',
        cursor: 'grab',
        touchAction: 'none'
      }}
      aria-label="Interactive 3D Technology Globe"
    />
  )
}

export default TechGlobe
