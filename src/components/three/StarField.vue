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

function init() {
  if (!container.value) return

  isMobile.value = window.innerWidth < 768
  const count = isMobile.value ? 2000 : 5000

  // Scene
  scene = new THREE.Scene()

  // Camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  // Particles
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 20
    positions[i3 + 1] = (Math.random() - 0.5) * 20
    positions[i3 + 2] = (Math.random() - 0.5) * 20

    // Mix of blue and purple
    const hue = Math.random() > 0.7 ? 0.75 : 0.55 // purple or blue
    const color = new THREE.Color().setHSL(hue, 0.8, 0.6)
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const material = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  // Events
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

    // Target: mouse position in 3D space
    const targetX = mouseX * 8
    const targetY = mouseY * 8

    // Gravity toward cursor
    const dx = targetX - x
    const dy = targetY - y
    const distSq = dx * dx + dy * dy

    if (distSq > 0.01) {
      const force = 0.00005 / (distSq + 0.5)
      positions[i3] += dx * force
      positions[i3 + 1] += dy * force
    }

    // Gentle drift
    positions[i3] += (Math.random() - 0.5) * 0.0008
    positions[i3 + 1] += (Math.random() - 0.5) * 0.0008

    // Bounds
    if (Math.abs(positions[i3]) > 12) positions[i3] *= 0.95
    if (Math.abs(positions[i3 + 1]) > 12) positions[i3 + 1] *= 0.95
  }

  particles.geometry.attributes.position.needsUpdate = true
  particles.rotation.y += 0.0001
  particles.rotation.x += 0.00005

  renderer.render(scene, camera)
}

onMounted(() => {
  init()
})

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
  opacity: 0.8;
}
</style>
