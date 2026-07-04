<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{ click: [] }>()
const showBubble = ref(true)
const isLoaded = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

let bubbleInterval: number
let modelViewer: any = null

// Toggle bubble every 4 seconds
onMounted(() => {
  bubbleInterval = window.setInterval(() => {
    showBubble.value = !showBubble.value
  }, 4000)
  
  // Track mouse
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  clearInterval(bubbleInterval)
  window.removeEventListener('mousemove', onMouseMove)
})

function onMouseMove(e: MouseEvent) {
  mouseX.value = (e.clientX / window.innerWidth) * 2 - 1
  mouseY.value = -(e.clientY / window.innerHeight) * 2 + 1
  
  // Rotate model slightly toward cursor
  if (modelViewer) {
    const yaw = mouseX.value * 15  // -15 to +15 degrees
    const pitch = mouseY.value * 5  // -5 to +5 degrees
    modelViewer.orientation = `${pitch}deg ${yaw}deg 0deg`
  }
}

function onModelLoad(e: any) {
  isLoaded.value = true
  modelViewer = e.target
  
  // Set initial orientation
  if (modelViewer) {
    modelViewer.orientation = '0deg 0deg 0deg'
  }
}
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
    
    <!-- 3D Model -->
    <div class="model-wrapper" :class="{ loaded: isLoaded }">
      <model-viewer
        src="https://modelviewer.dev/shared-assets/models/RobotExpressive.glb"
        alt="Agenc-IA Robot Assistant"
        orientation="0deg 0deg 0deg"
        camera-controls
        disable-zoom
        disable-pan
        interaction-prompt="none"
        shadow-intensity="0"
        environment-image="neutral"
        exposure="1.2"
        style="width: 100%; height: 100%; background: transparent;"
        @load="onModelLoad"
      />
      
      <!-- Loading state -->
      <div v-if="!isLoaded" class="model-loading">
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
  width: 160px;
  height: 200px;
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
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(0, 212, 255, 0.4);
  border-radius: 18px;
  padding: 8px 16px;
  white-space: nowrap;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.2);
}

.speech-bubble span {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  background: linear-gradient(135deg, #00D4FF, #8B5CF6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bubble-tail {
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 7px solid rgba(255, 255, 255, 0.95);
}

/* Model wrapper */
.model-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.model-wrapper.loaded {
  opacity: 1;
}

.model-loading {
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
  width: 100px;
  height: 50px;
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
  from { opacity: 0; transform: translateX(-50%) translateY(10px) scale(0.8); }
  to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
}

@keyframes bubbleOut {
  from { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  to { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.8); }
}

/* Hover effects */
.mascot-container:hover .speech-bubble {
  border-color: #00D4FF;
  box-shadow: 0 4px 25px rgba(0, 212, 255, 0.3);
}
</style>
