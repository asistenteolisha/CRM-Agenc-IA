<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const container = ref<HTMLElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let particles: THREE.Points
let animationId: number
let mouseX = 0
let mouseY = 0

const isMobile = ref(false)

function createCircleTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext('2d')!
  
  // Draw soft circle with glow
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.3, 'rgba(200, 230, 255, 0.8)')
  gradient.addColorStop(0.7, 'rgba(100, 180, 255, 0.3)')
  gradient.addColorStop(1, 'rgba(0, 100, 200, 0)')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 32, 32)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function init() {
  if (!container.value) return

  isMobile.value = window.innerWidth < 768
  const count = isMobile.value ? 1500 : 4000

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 25
    positions[i3 + 1] = (Math.random() - 0.5) * 25
    positions[i3 + 2] = (Math.random() - 0.5) * 25

    // Mix of blue, cyan, and purple
    const r = Math.random()
    let hue: number
    if (r > 0.7) hue = 0.75 // purple
    else if (r > 0.3) hue = 0.55 // blue
    else hue = 0.5 // cyan
    
    const color = new THREE.Color().setHSL(hue, 0.8, 0.7)
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
    
    // Random sizes for depth
    sizes[i] = Math.random() * 3 + 1
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  // Use circle texture for soft round particles
  const circleTexture = createCircleTexture()
  
  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    map: circleTexture,
    sizeAttenuation: true,
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('resize', onResize)

  animate()
}

function onMouseMove(e: MouseEvent) {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1
}

function onTouchMove(e: TouchEvent) {
  if (e.touches.length > 0) {
    mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1
    mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
  }
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  animationId = requestAnimationFrame(animate)

  const positions = particles.geometry.attributes.position.array as Float32Array
  const count = positions.length / 3

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const x = positions[i3]
    const y = positions[i3 + 1]

    const targetX = mouseX * 10
    const targetY = mouseY * 10

    const dx = targetX - x
    const dy = targetY - y
    const distSq = dx * dx + dy * dy

    if (distSq > 0.01) {
      const force = 0.00005 / (distSq + 0.5)
      positions[i3] += dx * force
      positions[i3 + 1] += dy * force
    }

    // Gentle drift
    positions[i3] += (Math.random() - 0.5) * 0.0005
    positions[i3 + 1] += (Math.random() - 0.5) * 0.0005

    // Bounds
    if (Math.abs(positions[i3]) > 14) positions[i3] *= 0.95
    if (Math.abs(positions[i3 + 1]) > 14) positions[i3 + 1] *= 0.95
  }

  particles.geometry.attributes.position.needsUpdate = true
  particles.rotation.y += 0.00008
  particles.rotation.x += 0.00004

  renderer.render(scene, camera)
}

onMounted(() => init())

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('resize', onResize)
  renderer?.dispose()
  particles?.geometry.dispose()
  if (particles?.material instanceof THREE.Material) particles.material.dispose()
})
</script>

<template>
  <div ref="container" class="starfield" />
</template>

<style scoped>
.starfield {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.85;
}
</style>
