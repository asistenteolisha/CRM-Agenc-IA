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
let animationId: number
let mouseX = 0
let mouseY = 0

function init() {
  if (!container.value) return

  const size = 160

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
  camera.position.z = 3

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(size, size)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  container.value.appendChild(renderer.domElement)

  // Bot group
  bot = new THREE.Group()

  // Body
  const bodyGeo = new THREE.SphereGeometry(0.7, 32, 32)
  const bodyMat = new THREE.MeshPhongMaterial({
    color: 0x0A0E1A,
    emissive: 0x00D4FF,
    emissiveIntensity: 0.15,
    shininess: 80,
    transparent: true,
    opacity: 0.9,
  })
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  bot.add(body)

  // Eyes
  const eyeGeo = new THREE.SphereGeometry(0.12, 16, 16)
  const eyeMat = new THREE.MeshPhongMaterial({
    color: 0x00D4FF,
    emissive: 0x00D4FF,
    emissiveIntensity: 1,
  })

  eyeL = new THREE.Mesh(eyeGeo, eyeMat)
  eyeL.position.set(-0.2, 0.15, 0.65)
  bot.add(eyeL)

  eyeR = new THREE.Mesh(eyeGeo, eyeMat)
  eyeR.position.set(0.2, 0.15, 0.65)
  bot.add(eyeR)

  // Smile
  const smileGeo = new THREE.TorusGeometry(0.15, 0.02, 8, 16, Math.PI)
  const smileMat = new THREE.MeshPhongMaterial({
    color: 0x00D4FF,
    emissive: 0x00D4FF,
    emissiveIntensity: 0.5,
  })
  const smile = new THREE.Mesh(smileGeo, smileMat)
  smile.position.set(0, -0.1, 0.65)
  smile.rotation.x = Math.PI
  bot.add(smile)

  // Glow ring
  const ringGeo = new THREE.TorusGeometry(0.85, 0.02, 8, 64)
  const ringMat = new THREE.MeshPhongMaterial({
    color: 0x00D4FF,
    emissive: 0x00D4FF,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.6,
  })
  const ring = new THREE.Mesh(ringGeo, ringMat)
  bot.add(ring)

  scene.add(bot)

  // Lights
  const light = new THREE.PointLight(0x00D4FF, 2, 10)
  light.position.set(0, 2, 3)
  scene.add(light)

  const ambient = new THREE.AmbientLight(0xffffff, 0.4)
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
  const targetRotX = mouseY * 0.3
  const targetRotY = mouseX * 0.5
  bot.rotation.x += (targetRotX - bot.rotation.x) * 0.05
  bot.rotation.y += (targetRotY - bot.rotation.y) * 0.05

  // Float
  bot.position.y = Math.sin(Date.now() * 0.001) * 0.08

  // Blink - more natural with random intervals
  const t = Date.now() * 0.001
  const blinkCycle = Math.sin(t * 2) > 0.98
  const doubleBlink = Math.sin(t * 4) > 0.99
  const blink = (blinkCycle || doubleBlink) ? 0.05 : 1
  eyeL.scale.y += (blink - eyeL.scale.y) * 0.3
  eyeR.scale.y += (blink - eyeR.scale.y) * 0.3

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
  filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.3));
}

.chatbot-3d:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.5));
}
</style>
