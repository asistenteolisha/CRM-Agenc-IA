<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

let renderer: import('three').WebGLRenderer | null = null
let frameId = 0
let observer: IntersectionObserver | null = null
const muted = ref(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

interface ChannelNode { x: number; y: number; z: number; channel: 'wa' | 'ig' | 'fb' | 'crm' }
interface ColorSet { particles: number; lines: number }

const channelColors: Record<ChannelNode['channel'], ColorSet> = {
  wa:  { particles: 0x25D366, lines: 0x1a8c44 },
  ig:  { particles: 0xE1306C, lines: 0xa31d4c },
  fb:  { particles: 0x1877F2, lines: 0x0e52a0 },
  crm: { particles: 0x4fffb0, lines: 0x38d8ff }
}

onMounted(async () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const {
    BufferGeometry, Float32BufferAttribute, Group, LineBasicMaterial,
    LineSegments, PerspectiveCamera, Points, PointsMaterial, Scene, SphereGeometry,
    Mesh, MeshBasicMaterial, WebGLRenderer
  } = await import('three')

  const scene = new Scene()
  const camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
  const group = new Group()
  scene.add(group)

  renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
  renderer.setSize(window.innerWidth, window.innerHeight)

  camera.position.z = 10

  // ── Build channel nodes ─────────────────────
  const channelNodes: ChannelNode[] = []
  const channels: ChannelNode['channel'][] = ['wa', 'ig', 'fb', 'crm']

  for (let i = 0; i < 64; i++) {
    const angle = i * 0.62
    const radius = 2.4 + Math.sin(i * 0.4) * 0.9
    const ch = channels[i % 4]
    channelNodes.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle * 1.15) * radius * 0.58,
      z: (Math.sin(angle * 0.69) * 3.6) - 0.5,
      channel: ch
    })
  }

  // ── Lines between nodes ─────────────────────
  const linePositions: number[] = []
  for (let i = 0; i < channelNodes.length; i++) {
    const next = (i + 3) % channelNodes.length
    const skip = (i + 11) % channelNodes.length
    const a = channelNodes[i], b = channelNodes[next], c = channelNodes[skip]

    if (a.channel === b.channel) {
      linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
    linePositions.push(a.x, a.y, a.z, c.x, c.y, c.z)
  }

  const lineGeometry = new BufferGeometry()
  lineGeometry.setAttribute('position', new Float32BufferAttribute(linePositions, 3))

  const lines = new LineSegments(lineGeometry, new LineBasicMaterial({
    color: 0x38d8ff, transparent: true, opacity: 0.14
  }))
  group.add(lines)

  // ── Glow spheres at key positions ───────────
  const glowGeo = new SphereGeometry(0.06, 8, 8)
  channelNodes.forEach((n) => {
    const color = channelColors[n.channel]
    const mesh = new Mesh(glowGeo, new MeshBasicMaterial({
      color: color.particles, transparent: true, opacity: 0.7
    }))
    mesh.position.set(n.x, n.y, n.z)
    group.add(mesh)
  })

  // ── Small particle field behind ─────────────
  const bgCount = 120
  const bgPositions: number[] = []
  for (let i = 0; i < bgCount; i++) {
    bgPositions.push(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6 - 3
    )
  }
  const bgGeo = new BufferGeometry()
  bgGeo.setAttribute('position', new Float32BufferAttribute(bgPositions, 3))
  const bgPoints = new Points(bgGeo, new PointsMaterial({
    color: 0x4fffb0, size: 0.025, transparent: true, opacity: 0.35
  }))
  group.add(bgPoints)

  // ── Resize ──────────────────────────────────
  const resize = () => {
    if (!renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', resize)

  // ── Animate ─────────────────────────────────
  let prevTime = Date.now()
  const animate = () => {
    const now = Date.now()
    const dt = muted.value ? 0 : (now - prevTime) * 0.001
    prevTime = now

    group.rotation.y += dt * 0.18
    group.rotation.x = Math.sin(now * 0.00016) * 0.1

    bgPoints.rotation.y -= dt * 0.08
    bgPoints.rotation.x += dt * 0.04

    renderer?.render(scene, camera)
    frameId = window.requestAnimationFrame(animate)
  }
  animate()

  // ── Visibility observer ─────────────────────
  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting && !muted.value) {
      // Canvas still renders but could be paused. Keep rendering for now.
    }
  }, { threshold: 0.1 })
  observer.observe(canvas)

  // ── Cleanup ─────────────────────────────────
  const cleanup = () => {
    window.removeEventListener('resize', resize)
    window.cancelAnimationFrame(frameId)
    observer?.disconnect()
    bgGeo.dispose(); lineGeometry.dispose(); glowGeo.dispose()
    ;(bgPoints.material as import('three').PointsMaterial).dispose()
    ;(lines.material as import('three').LineBasicMaterial).dispose()
    renderer?.dispose(); renderer = null
  }
  ;(cleanup as any).__cleanup = cleanup
})

onUnmounted(() => {
  ;(onMounted as any).__cleanup?.()
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
