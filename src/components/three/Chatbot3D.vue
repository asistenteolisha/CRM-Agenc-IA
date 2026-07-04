<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

const emit = defineEmits<{ click: [] }>()
const container = ref<HTMLElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let bot: THREE.Group
let eyeL: THREE.Mesh
let eyeR: THREE.Mesh
let mouth: THREE.Mesh
let ring: THREE.Mesh
let animationId: number
let mouseX = 0
let mouseY = 0

function createGlowTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  gradient.addColorStop(0, 'rgba(0, 212, 255, 0.4)')
  gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.1)')
  gradient.addColorStop(1, 'rgba(0, 212, 255, 0)')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function init() {
  if (!container.value) return

  const size = 140

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.z = 3

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(size, size)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  bot = new THREE.Group()

  // Body - main sphere
  const bodyGeo = new THREE.SphereGeometry(0.65, 32, 32)
  const bodyMat = new THREE.MeshPhongMaterial({
    color: 0x0A0E1A,
    emissive: 0x00D4FF,
    emissiveIntensity: 0.12,
    shininess: 80,
    transparent: true,
    opacity: 0.95,
  })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  bot.add(body)

  // Eyes - larger, more expressive
  const eyeGeo = new THREE.SphereGeometry(0.13, 16, 16)
  const eyeMat = new THREE.MeshPhongMaterial({
    color: 0x00D4FF,
    emissive: 0x00D4FF,
    emissiveIntensity: 1.2,
  })

  eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.22, 0.18, 0.6)
  bot.add(eyeL)

  eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.22, 0.18, 0.6)
  bot.add(eyeR)

  // Mouth - smile
  const smileGeo = new THREE.TorusGeometry(0.14, 0.025, 8, 16, Math.PI)
  const smileMat = new THREE.MeshPhongMaterial({
    color: 0x00D4FF,
    emissive: 0x00D4FF,
    emissiveIntensity: 0.6,
  })
  mouth = new THREE.Mesh(smileGeo, smileMat)
  mouth.position.set(0, -0.08, 0.6)
  mouth.rotation.x = Math.PI
  bot.add(mouth)

  // Glow ring
  const ringGeo = new THREE.TorusGeometry(0.8, 0.015, 8, 64)
  const ringMat = new THREE.MeshPhongMaterial({
    color: 0x00D4FF,
    emissive: 0x00D4FF,
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 0.5,
  })
  ring = new THREE.Mesh(ringGeo, ringMat)
  bot.add(ring)

  // Glow sprite behind
  const glowTexture = createGlowTexture()
  const glowMat = new THREE.SpriteMaterial({
    map: glowTexture,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  })
  const glow = new THREE.Sprite(glowMat)
  glow.scale.set(2.5, 2.5, 1)
  bot.add(glow)

  scene.add(bot)

  // Lights
  const light = new THREE.PointLight(0x00D4FF, 2, 10)
  light.position.set(0, 2, 3)
  scene.add(light)

  const ambient = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambient)

  window.addEventListener('mousemove', onMouseMove)
  animate()
}

function onMouseMove(e: MouseEvent) {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1
}

function animate() {
  animationId = requestAnimationFrame(animate)

  // Smooth follow
  const targetRotX = mouseY * 0.25
  const targetRotY = mouseX * 0.4
  bot.rotation.x += (targetRotX - bot.rotation.x) * 0.04
  bot.rotation.y += (targetRotY - bot.rotation.y) * 0.04

  // Float
  bot.position.y = Math.sin(Date.now() * 0.0012) * 0.06

  // Blink - natural with lerp
  const t = Date.now() * 0.001
  const blinkCycle = Math.sin(t * 1.8) > 0.97
  const doubleBlink = Math.sin(t * 3.5) > 0.995
  const blink = (blinkCycle || doubleBlink) ? 0.05 : 1
  eyeL.scale.y += (blink - eyeL.scale.y) * 0.25
  eyeR.scale.y += (blink - eyeR.scale.y) * 0.25

  // Ring rotation
  ring.rotation.z += 0.003

  renderer.render(scene, camera)
}

onMounted(() => init())

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', onMouseMove)
  renderer?.dispose()
})
</script>

<template>
  <div ref="container" class="chatbot-3d" @click="emit('click')" />
</template>

<style scoped>
.chatbot-3d {
  width: 140px;
  height: 140px;
  cursor: pointer;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 0 25px rgba(0, 212, 255, 0.35));
}

.chatbot-3d:hover {
  transform: scale(1.08);
  filter: drop-shadow(0 0 35px rgba(0, 212, 255, 0.5));
}
</style>
