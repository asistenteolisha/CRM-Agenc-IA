<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{ click: [] }>()
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isLoading = ref(true)
const hasError = ref(false)

let app: any = null

onMounted(async () => {
  if (!canvasRef.value) return
  
  try {
    const { Application } = await import('@splinetool/runtime')
    app = new Application(canvasRef.value)
    
    // Load a cute robot scene from Spline
    await app.load('https://prod.spline.design/6Wq1Q7YGyM-iAcL2/scene.splinecode')
    
    isLoading.value = false
  } catch (e) {
    console.warn('Spline load failed, falling back:', e)
    hasError.value = true
    isLoading.value = false
  }
})

onUnmounted(() => {
  app?.dispose()
})
</script>

<template>
  <div class="spline-mascot" @click="emit('click')">
    <canvas ref="canvasRef" class="spline-canvas" />
    <div v-if="isLoading" class="spline-loading">
      <div class="loading-dot" />
    </div>
    <div v-if="hasError" class="spline-fallback" @click="emit('click')">
      <div class="fallback-bot">
        <div class="bot-eyes">
          <div class="eye left" />
          <div class="eye right" />
        </div>
        <div class="bot-mouth" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.spline-mascot {
  width: 180px;
  height: 180px;
  cursor: pointer;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.4));
  position: relative;
}

.spline-mascot:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 40px rgba(0, 212, 255, 0.6));
}

.spline-canvas {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.spline-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 14, 26, 0.8);
  border-radius: 50%;
}

.loading-dot {
  width: 12px;
  height: 12px;
  background: #00D4FF;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}

.spline-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, rgba(10, 14, 26, 0.95) 70%);
  border-radius: 50%;
  border: 2px solid rgba(0, 212, 255, 0.3);
}

.fallback-bot {
  text-align: center;
}

.bot-eyes {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 12px;
}

.eye {
  width: 16px;
  height: 16px;
  background: #00D4FF;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
  animation: blink 3s infinite;
}

@keyframes blink {
  0%, 95%, 100% { transform: scaleY(1); }
  97% { transform: scaleY(0.1); }
}

.bot-mouth {
  width: 30px;
  height: 15px;
  border: 3px solid #00D4FF;
  border-top: none;
  border-radius: 0 0 15px 15px;
  margin: 0 auto;
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.5);
}
</style>
