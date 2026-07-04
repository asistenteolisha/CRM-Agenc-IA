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
let pupilL: THREE.Mesh
let pupilR: THREE.Mesh
let mouth: THREE.Mesh
let ring: THREE.Mesh
let antenna: THREE.Group
let animationId: number
let mouseX = 0
let mouseY = 0
let time = 0

function createGlowTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  gradient.addColorStop(0, 'rgba(0, 212, 255, 0.5)')
  gradient.addColorStop(0.4, 'rgba(0, 212, 255, 0.2)')
  gradient.addColorStop(1, 'rgba(0, 212, 255, 0)')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function init() {
  if (!container.value) return

  const size = 160

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.z = 3.5

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(size, size)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  bot = new THREE.Group()

  // Body - main sphere
  const bodyGeo = new THREE.SphereGeometry(0.6, 32, 32)
  const bodyMat = new THREE.MeshPhongMaterial({
    color: 0x0F1629,
    emissive: 0x00D4FF,
    emissiveIntensity: 0.08,
    shininess: 100,
    transparent: true,
    opacity: 0.95,
  })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  bot.add(body)

  // Face plate - lighter area
  const faceGeo = new THREE.SphereGeometry(0.55, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2)
  const faceMat = new THREE.MeshPhongMaterial({
    color: 0x1A2340,
    emissive: 0x00D4FF,
    emissiveIntensity: 0.05,
    shininess: 120,
  })
  const face = new THREE.Mesh(faceGeo, faceMat)
  face.position.z = 0.05
  face.position.y = 0.1
  bot.add(face)

  // Eyes - white part
  const eyeWhiteGeo = new THREE.SphereGeometry(0.14, 16, 16)
  const eyeWhiteMat = new THREE.MeshPhongMaterial({
    color: 0xFFFFFF,
    emissive: 0xFFFFFF,
    emissiveIntensity: 0.3,
  })

  eyeL = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat)
  eyeL.position.set(-0.2, 0.2, 0.55)
  bot.add(eyeL)

  eyeR = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat)
  eyeR.position.set(0.2, 0.2, 0.55)
  bot.add(eyeR)

  // Pupils - neon blue
  const pupilGeo = new THREE.SphereGeometry(0.07, 16, 16)
  const pupilMat = new THREE.MeshPhongMaterial({
    color: 0x00D4FF,
    emissive: 0x00D4FF,
    emissiveIntensity: 1.5,
  })

  pupilL = new THREE.Mesh(pupilGeo, pupilMat)
  pupilL.position.set(-0.2, 0.2, 0.65)
  bot.add(pupilL)

  pupilR = new THREE.Mesh(pupilGeo, pupilMat)
  pupilR.position.set(0.2, 0.2, 0.65)
  bot.add(pupilR)

  // Mouth - smile
  const smileGeo = new THREE.TorusGeometry(0.12, 0.02, 8, 16, Math.PI)
  const smileMat = new THREE.MeshPhongMaterial({
    color: 0x00D4FF,
    emissive: 0x00D4FF,
    emissiveIntensity: 0.8,
  })
  mouth = new THREE.Mesh(smileGeo, smileMat)
  mouth.position.set(0, 0.02, 0.55)
  mouth.rotation.x = Math.PI
  bot.add(mouth)

  // Antenna
  antenna = new THREE.Group()
  const stickGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.2, 8)
  const stickMat = new THREE.MeshPhongMaterial({
    color: 0x00D4FF,
    emissive: 0x00D4FF,
    emissiveIntensity: 0.5,
  })
  const stick = new THREE.Mesh(stickGeo, stickMat)
  stick.position.y = 0.7
  antenna.add(stick)

  const ballGeo = new THREE.SphereGeometry(0.04, 16, 16)
  const ballMat = new THREE.MeshPhongMaterial({
    color: 0x00D4FF,
    emissive: 0x00D4FF,
    emissiveIntensity: 1.5,
  })
  const ball = new THREE.Mesh(ballGeo, ballMat)
  ball.position.y = 0.82
  antenna.add(ball)
  bot.add(antenna)

  // Glow ring
  const ringGeo = new THREE.TorusGeometry(0.75, 0.012, 8, 64)
  const ringMat = new THREE.MeshPhongMaterial({
    color: 0x00D4FF,
    emissive: 0x00D4FF,
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 0.4,
  })
  ring = new THREE.Mesh(ringGeo, ringMat)
  bot.add(ring)

  // Glow sprite
  const glowTexture = createGlowTexture()
  const glowMat = new THREE.SpriteMaterial({
    map: glowTexture,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
  })
  const glow = new THREE.Sprite(glowMat)
  glow.scale.set(2.8, 2.8, 1)
  bot.add(glow)

  scene.add(bot)

  // Lights
  const light = new THREE.PointLight(0x00D4FF, 3, 10)
  light.position.set(0, 2, 3)
  scene.add(light)

  const light2 = new THREE.PointLight(0x8B5CF6, 1, 8)
  light2.position.set(-2, -1, 2)
  scene.add(light2)

  const ambient = new THREE.AmbientLight(0xFFFFFF, 0.5)
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
  time += 0.016

  // Smooth follow
  const targetRotX = mouseY * 0.2
  const targetRotY = mouseX * 0.35
  bot.rotation.x += (targetRotX - bot.rotation.x) * 0.03
  bot.rotation.y += (targetRotY - bot.rotation.y) * 0.03

  // Float
  bot.position.y = Math.sin(time * 1.2) * 0.05

  // Pupils follow mouse
  const pupilOffset = 0.03
  pupilL.position.x = -0.2 + mouseX * pupilOffset
  pupilL.position.y = 0.2 + mouseY * pupilOffset
  pupilR.position.x = 0.2 + mouseX * pupilOffset
  pupilR.position.y = 0.2 + mouseY * pupilOffset

  // Blink - natural
  const blinkCycle = Math.sin(time * 1.8) > 0.97
  const doubleBlink = Math.sin(time * 3.5) > 0.995
  const blink = (blinkCycle || doubleBlink) ? 0.05 : 1
  eyeL.scale.y += (blink - eyeL.scale.y) * 0.2
  eyeR.scale.y += (blink - eyeR.scale.y) * 0.2
  pupilL.scale.y += (blink - pupilL.scale.y) * 0.2
  pupilR.scale.y += (blink - pupilR.scale.y) * 0.2

  // Antenna bounce
  antenna.rotation.z = Math.sin(time * 2) * 0.1
  antenna.rotation.x = Math.sin(time * 1.5) * 0.05

  // Ring rotation
  ring.rotation.z += 0.002
  ring.rotation.x = Math.sin(time * 0.5) * 0.1

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
  width: 160px;
  height: 160px;
  cursor: pointer;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.4));
}

.chatbot-3d:hover {
  transform: scale(1.08);
  filter: drop-shadow(0 0 40px rgba(0, 212, 255, 0.6));
}
</style>
