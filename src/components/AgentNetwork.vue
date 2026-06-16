<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

let renderer: import('three').WebGLRenderer | null = null
let frameId = 0
let observer: IntersectionObserver | null = null

interface ChannelNode { x: number; y: number; z: number; channel: 'wa' | 'ig' | 'fb' | 'crm' }
interface ColorSet { particles: number; lines: number }
interface PulsePacket {
  from: ChannelNode; to: ChannelNode; progress: number; speed: number; color: number
}

const channelColors: Record<ChannelNode['channel'], ColorSet> = {
  wa:  { particles: 0x25D366, lines: 0x1a8c44 },
  ig:  { particles: 0xE1306C, lines: 0xa31d4c },
  fb:  { particles: 0x1877F2, lines: 0x0e52a0 },
  crm: { particles: 0x4fffb0, lines: 0x38d8ff }
}

let packets: PulsePacket[] = []

onMounted(async () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const {
    BufferGeometry, Float32BufferAttribute, Group, LineBasicMaterial,
    LineSegments, PerspectiveCamera, Points, PointsMaterial, Scene,
    SphereGeometry, Mesh, MeshBasicMaterial, WebGLRenderer
  } = await import('three')

  const scene = new Scene()
  const camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
  const group = new Group()
  scene.add(group)

  renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.position.z = 10

  // ── Channel nodes ──────────────────────────
  const channelNodes: ChannelNode[] = []
  const channels: ChannelNode['channel'][] = ['wa', 'ig', 'fb', 'crm']
  const nodePairs: { from: ChannelNode; to: ChannelNode }[] = []

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

  // Build same-channel pairs for packets
  for (let i = 0; i < channelNodes.length; i++) {
    const next = (i + 3) % channelNodes.length
    if (channelNodes[i].channel === channelNodes[next].channel) {
      nodePairs.push({ from: channelNodes[i], to: channelNodes[next] })
    }
  }

  // ── Lines ──────────────────────────────────
  const linePositions: number[] = []
  for (let i = 0; i < channelNodes.length; i++) {
    const skip = (i + 11) % channelNodes.length
    const a = channelNodes[i], c = channelNodes[skip]
    linePositions.push(a.x, a.y, a.z, c.x, c.y, c.z)
  }

  const lineGeometry = new BufferGeometry()
  lineGeometry.setAttribute('position', new Float32BufferAttribute(linePositions, 3))
  const lines = new LineSegments(lineGeometry, new LineBasicMaterial({
    color: 0x38d8ff, transparent: true, opacity: 0.12
  }))
  group.add(lines)

  // ── Glow spheres ───────────────────────────
  const glowGeo = new SphereGeometry(0.06, 8, 8)
  channelNodes.forEach((n) => {
    const color = channelColors[n.channel]
    const mesh = new Mesh(glowGeo, new MeshBasicMaterial({
      color: color.particles, transparent: true, opacity: 0.65
    }))
    mesh.position.set(n.x, n.y, n.z)
    group.add(mesh)
  })

  // ── Background particles ───────────────────
  const bgCount = 100
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
    color: 0x4fffb0, size: 0.025, transparent: true, opacity: 0.3
  }))
  group.add(bgPoints)

  // ── Pulse packet meshes ────────────────────
  const pulseGeo = new SphereGeometry(0.04, 6, 6)
  const pulseGroup = new Group()
  group.add(pulseGroup)

  const activePulseCount = 8
  const pulseMeshes: import('three').Mesh[] = []
  for (let i = 0; i < activePulseCount; i++) {
    const pair = nodePairs[Math.floor(Math.random() * nodePairs.length)]
    const mat = new MeshBasicMaterial({
      color: channelColors[pair.from.channel].particles,
      transparent: true, opacity: 0.9
    })
    const mesh = new Mesh(pulseGeo, mat)
    mesh.visible = false
    pulseGroup.add(mesh)
    pulseMeshes.push(mesh)

    packets.push({
      from: pair.from, to: pair.to,
      progress: Math.random(), speed: 0.003 + Math.random() * 0.005,
      color: channelColors[pair.from.channel].particles
    })
  }

  // ── Resize ─────────────────────────────────
  const resize = () => {
    if (!renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', resize)

  // ── Animate ────────────────────────────────
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let prevTime = Date.now()

  const animate = () => {
    const now = Date.now()
    const dt = prefersReduced ? 0 : Math.min((now - prevTime) * 0.001, 0.05)
    prevTime = now

    group.rotation.y += dt * 0.15
    group.rotation.x = Math.sin(now * 0.00016) * 0.1
    bgPoints.rotation.y -= dt * 0.07
    bgPoints.rotation.x += dt * 0.03

    // Animate pulse packets
    if (activePulseCount > 0) {
      packets.forEach((pkt, i) => {
        pkt.progress += pkt.speed * (prefersReduced ? 0 : 1)
        if (pkt.progress > 1) {
          pkt.progress = 0
          const newPair = nodePairs[Math.floor(Math.random() * nodePairs.length)]
          pkt.from = newPair.from; pkt.to = newPair.to
          pkt.speed = 0.003 + Math.random() * 0.005
          pkt.color = channelColors[pkt.from.channel].particles
        }

        const mesh = pulseMeshes[i]
        if (!mesh) return
        const t = pkt.progress
        mesh.position.set(
          pkt.from.x + (pkt.to.x - pkt.from.x) * t,
          pkt.from.y + (pkt.to.y - pkt.from.y) * t,
          pkt.from.z + (pkt.to.z - pkt.from.z) * t
        )
        mesh.visible = true
        ;(mesh.material as any).color.set(pkt.color)
        ;(mesh.material as any).opacity = 0.5 + Math.sin(t * Math.PI) * 0.5
      })
    }

    renderer?.render(scene, camera)
    frameId = window.requestAnimationFrame(animate)
  }
  animate()

  observer = new IntersectionObserver(() => {
    /* keep running for now */
  }, { threshold: 0.1 })
  observer.observe(canvas)

  const cleanup = () => {
    window.removeEventListener('resize', resize)
    window.cancelAnimationFrame(frameId)
    observer?.disconnect()
    bgGeo.dispose(); lineGeometry.dispose(); glowGeo.dispose(); pulseGeo.dispose()
    ;(bgPoints.material as import('three').PointsMaterial).dispose()
    ;(lines.material as import('three').LineBasicMaterial).dispose()
    pulseMeshes.forEach(m => (m.material as any).dispose())
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

<style scoped>
.agent-network {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
