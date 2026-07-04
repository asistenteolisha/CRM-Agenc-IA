<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{ click: [] }>()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isLoading = ref(true)
const showBubble = ref(true)

let app: any = null
let animationId: number

// Spline scene URL - cute robot mascot
const SPLINE_URL = 'https://prod.spline.design/6Wq1Q7YGyM-iAcL2/scene.splinecode'

onMounted(async () => {
  if (!canvasRef.value) return
  
  try {
    const { Application } = await import('@splinetool/runtime')
    app = new Application(canvasRef.value)
    await app.load(SPLINE_URL)
    isLoading.value = false
    
    // Pulse the speech bubble
    setInterval(() => {
      showBubble.value = !showBubble.value
    }, 5000)
  } catch (e) {
    console.warn('Spline load failed:', e)
    isLoading.value = false
  }
})

onUnmounted(() => {
  app?.dispose()
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <div class="mascot-container" @click="emit('click')">
    <!-- Speech bubble -->
    <Transition name="bubble">
      <div v-if="showBubble" class="speech-bubble">
        <span>¿Necesitas asistencia?</span>
        <div class="bubble-tail" />
      </div>
    </Transition>
    
    <!-- 3D Robot -->
    <div class="robot-wrapper">
      <canvas ref="canvasRef" class="robot-canvas" />
      <div v-if="isLoading" class="robot-loading">
        <div class="loading-spinner" />
      </div>
    </div>
    
    <!-- Glow effect -->
    <div class="glow-effect" />
  </div>
</template>

<style scoped>
.mascot-container {
  position: relative;
  width: 200px;
  height: 240px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.mascot-container:hover {
  transform: scale(1.05);
}

.mascot-container:hover .glow-effect {
  opacity: 0.6;
  transform: scale(1.2);
}

/* Speech bubble */
.speech-bubble {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 212, 255, 0.4);
  border-radius: 20px;
  padding: 10px 18px;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.2);
}

.speech-bubble span {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1E293B;
  background: linear-gradient(135deg, #00D4FF, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bubble-tail {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid rgba(255, 255, 255, 0.95);
}

/* Robot */
.robot-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
}

.robot-canvas {
  width: 100%;
  height: 100%;
}

.robot-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%);
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid rgba(0, 212, 255, 0.2);
  border-top-color: #00D4FF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Glow */
.glow-effect {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 60px;
  background: radial-gradient(ellipse, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
  opacity: 0.4;
  transition: all 0.3s ease;
  pointer-events: none;
}

/* Bubble animation */
.bubble-enter-active {
  animation: bubbleIn 0.4s ease-out;
}

.bubble-leave-active {
  animation: bubbleOut 0.3s ease-in;
}

@keyframes bubbleIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes bubbleOut {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px) scale(0.8);
  }
}

/* Hover effects */
.mascot-container:hover .speech-bubble {
  border-color: #00D4FF;
  box-shadow: 0 4px 25px rgba(0, 212, 255, 0.3);
}
</style>
