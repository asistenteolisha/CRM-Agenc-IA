<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{ click: [] }>()
const showBubble = ref(true)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovered = ref(false)

let bubbleInterval: number

onMounted(() => {
  // Toggle bubble
  bubbleInterval = window.setInterval(() => {
    showBubble.value = !showBubble.value
  }, 4000)
  
  // Track mouse for eye movement
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  clearInterval(bubbleInterval)
  window.removeEventListener('mousemove', onMouseMove)
})

function onMouseMove(e: MouseEvent) {
  mouseX.value = (e.clientX / window.innerWidth) * 2 - 1
  mouseY.value = -(e.clientY / window.innerHeight) * 2 + 1
}
</script>

<template>
  <div 
    class="robot-mascot" 
    @click="emit('click')"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Speech bubble -->
    <Transition name="bubble">
      <div v-if="showBubble" class="speech-bubble">
        <span>¿Necesitas asistencia?</span>
        <div class="bubble-tail" />
      </div>
    </Transition>
    
    <!-- Robot body -->
    <div class="robot" :class="{ hovered: isHovered }">
      <!-- Glow behind -->
      <div class="robot-glow" />
      
      <!-- Head -->
      <div class="robot-head">
        <!-- Visor -->
        <div class="robot-visor">
          <!-- Eyes -->
          <div class="robot-eyes">
            <div 
              class="robot-eye left"
              :style="{ transform: `translate(${mouseX * 3}px, ${mouseY * 3}px)` }"
            />
            <div 
              class="robot-eye right"
              :style="{ transform: `translate(${mouseX * 3}px, ${mouseY * 3}px)` }"
            />
          </div>
          <!-- Mouth -->
          <div class="robot-mouth" />
        </div>
        <!-- Antenna -->
        <div class="robot-antenna">
          <div class="antenna-ball" />
        </div>
      </div>
      
      <!-- Body -->
      <div class="robot-body">
        <div class="body-light" />
        <div class="body-light" />
      </div>
      
      <!-- Arms -->
      <div class="robot-arm left" />
      <div class="robot-arm right" />
      
      <!-- Propellers -->
      <div class="propeller left">
        <div class="propeller-blade" />
      </div>
      <div class="propeller right">
        <div class="propeller-blade" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.robot-mascot {
  position: relative;
  width: 160px;
  height: 200px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.robot-mascot:hover {
  transform: scale(1.05);
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

/* Robot */
.robot {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.robot.hovered {
  transform: translateY(-5px);
}

.robot-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
}

/* Head */
.robot-head {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #1A2340, #0F1629);
  border-radius: 50%;
  border: 3px solid rgba(0, 212, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.robot-visor {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: radial-gradient(circle, #0A0E1A 0%, #0F1629 100%);
  border-radius: 50%;
  border: 2px solid rgba(0, 212, 255, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.robot-eyes {
  display: flex;
  gap: 14px;
}

.robot-eye {
  width: 10px;
  height: 10px;
  background: #00D4FF;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.8);
  transition: transform 0.1s ease;
}

.robot-mouth {
  width: 20px;
  height: 10px;
  border: 2px solid #00D4FF;
  border-top: none;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 0 5px rgba(0, 212, 255, 0.5);
}

.robot-antenna {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 15px;
  background: linear-gradient(to top, rgba(0, 212, 255, 0.5), #00D4FF);
}

.antenna-ball {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: #00D4FF;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
  animation: antennaGlow 1.5s ease-in-out infinite;
}

@keyframes antennaGlow {
  0%, 100% { box-shadow: 0 0 10px rgba(0, 212, 255, 0.8); }
  50% { box-shadow: 0 0 20px rgba(0, 212, 255, 1); }
}

/* Body */
.robot-body {
  position: absolute;
  top: 95px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 50px;
  background: linear-gradient(135deg, #1A2340, #0F1629);
  border-radius: 10px;
  border: 2px solid rgba(0, 212, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.body-light {
  width: 8px;
  height: 8px;
  background: #00D4FF;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 212, 255, 0.5);
  animation: bodyLight 2s ease-in-out infinite;
}

.body-light:nth-child(2) {
  animation-delay: 0.5s;
}

@keyframes bodyLight {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Arms */
.robot-arm {
  position: absolute;
  top: 100px;
  width: 20px;
  height: 40px;
  background: linear-gradient(135deg, #1A2340, #0F1629);
  border-radius: 5px;
  border: 2px solid rgba(0, 212, 255, 0.3);
}

.robot-arm.left {
  left: 25px;
  transform: rotate(10deg);
}

.robot-arm.right {
  right: 25px;
  transform: rotate(-10deg);
}

/* Propellers */
.propeller {
  position: absolute;
  bottom: 30px;
  width: 40px;
  height: 10px;
}

.propeller.left {
  left: 20px;
}

.propeller.right {
  right: 20px;
}

.propeller-blade {
  width: 100%;
  height: 100%;
  background: rgba(0, 212, 255, 0.3);
  border-radius: 5px;
  animation: spin 0.2s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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
</style>
