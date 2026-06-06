<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type { LineBasicMaterial, PointsMaterial, WebGLRenderer } from 'three'

const canvasRef = ref<HTMLCanvasElement | null>(null)

let renderer: WebGLRenderer | null = null
let frameId = 0
let cleanupScene: (() => void) | null = null

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(async () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const {
    BufferGeometry,
    Float32BufferAttribute,
    Group,
    LineBasicMaterial,
    LineSegments,
    PerspectiveCamera,
    Points,
    PointsMaterial,
    Scene,
    WebGLRenderer
  } = await import('three')

  const scene = new Scene()
  const camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
  const group = new Group()
  scene.add(group)

  renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
  renderer.setSize(window.innerWidth, window.innerHeight)

  camera.position.z = 10

  const nodes: number[] = []
  const linePositions: number[] = []
  const totalNodes = 76

  for (let i = 0; i < totalNodes; i += 1) {
    const angle = i * 0.72
    const radius = 2.2 + (i % 9) * 0.32
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle * 1.17) * radius * 0.56
    const z = (Math.sin(angle * 0.71) * 3.8) - 0.8
    nodes.push(x, y, z)
  }

  for (let i = 0; i < totalNodes; i += 1) {
    const next = (i + 7) % totalNodes
    const skip = (i + 19) % totalNodes
    linePositions.push(
      nodes[i * 3], nodes[i * 3 + 1], nodes[i * 3 + 2],
      nodes[next * 3], nodes[next * 3 + 1], nodes[next * 3 + 2],
      nodes[i * 3], nodes[i * 3 + 1], nodes[i * 3 + 2],
      nodes[skip * 3], nodes[skip * 3 + 1], nodes[skip * 3 + 2]
    )
  }

  const nodeGeometry = new BufferGeometry()
  nodeGeometry.setAttribute('position', new Float32BufferAttribute(nodes, 3))

  const lineGeometry = new BufferGeometry()
  lineGeometry.setAttribute('position', new Float32BufferAttribute(linePositions, 3))

  const points = new Points(
    nodeGeometry,
    new PointsMaterial({
      color: 0x4fffb0,
      size: 0.045,
      transparent: true,
      opacity: 0.82
    })
  )

  const lines = new LineSegments(
    lineGeometry,
    new LineBasicMaterial({
      color: 0x38d8ff,
      transparent: true,
      opacity: 0.16
    })
  )

  group.add(lines, points)

  const resize = () => {
    if (!renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', resize)

  const animate = () => {
    group.rotation.y += prefersReducedMotion() ? 0 : 0.0018
    group.rotation.x = Math.sin(Date.now() * 0.00018) * 0.12
    renderer?.render(scene, camera)
    frameId = window.requestAnimationFrame(animate)
  }

  animate()

  cleanupScene = () => {
    window.removeEventListener('resize', resize)
    window.cancelAnimationFrame(frameId)
    nodeGeometry.dispose()
    lineGeometry.dispose()
    ;(points.material as PointsMaterial).dispose()
    ;(lines.material as LineBasicMaterial).dispose()
    renderer?.dispose()
    renderer = null
  }
})

onUnmounted(() => {
  cleanupScene?.()
  cleanupScene = null
})
</script>

<template>
  <canvas ref="canvasRef" class="agent-network" aria-hidden="true"></canvas>
</template>

<style scoped lang="scss">
.agent-network {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
