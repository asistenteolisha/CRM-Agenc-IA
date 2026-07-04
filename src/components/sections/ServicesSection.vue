<script setup lang="ts">
import { ref } from 'vue'
import { services } from '../../data/services'
import IconInline from '../IconInline.vue'
import { trackEvent } from '../../utils/analytics'

type Cat = 'todas' | 'ventas' | 'soporte' | 'ecommerce' | 'social' | 'automatizacion' | 'consultoria' | 'premium'
const cats: { key: Cat; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'ventas', label: 'Ventas' },
  { key: 'soporte', label: 'Soporte' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'social', label: 'Social' },
  { key: 'automatizacion', label: 'Automatización' },
  { key: 'consultoria', label: 'Consultoría' },
  { key: 'premium', label: 'Premium' },
]

const activeFilter = ref<Cat>('todas')
type Service = (typeof services)[number]

// Map each service to its Lucide icon
const serviceIcons: Record<string, string> = {
  'whatsapp-sales-agent':     'MessageCircle',
  'instagram-dm-agent':        'Instagram',
  'facebook-lead-ad-funnel':   'Facebook',
  'cold-lead-recovery':        'RefreshCw',
  'customer-support-agent':    'MessageCircle',
  'smart-moderation':          'Shield',
  'conversational-ecommerce':  'ShoppingCart',
  'social-comments-agent':     'MessageCircle',
  'social-media-agent':        'Users',
  'n8n-crm-automation':        'Workflow',
  'web-funnel-ai':             'Globe',
  'auto-scheduling':           'CalendarCheck',
  'commercial-dashboard':      'ChartColumnIncreasing',
  'document-backoffice-agent': 'FileSearch',
  'ia-consulting-roadmap':     'Lightbulb',
  'managed-service':           'ConciergeBell',
  'trained-agents':            'Brain',
  'monitoring-247':            'Eye',
  'weekly-reports':            'BarChart3',
  'ai-optimization':           'Sparkles',
}

function trackServiceClick(service: Service) {
  trackEvent('service_click', {
    service_id: service.id,
    service_name: service.title,
    service_category: service.category
  })
}
</script>

<template>
  <section id="servicios" class="section">
    <div class="section__head" data-reveal>
      <p class="eyebrow">Servicios</p>
      <h2>No comprás un bot. Comprás un flujo que atiende, vende, registra y avisa cuando toca intervenir.</h2>
    </div>
    <div class="service-filters" data-reveal>
      <button v-for="cat in cats" :key="cat.key"
              class="filter-chip" :class="{ active: activeFilter === cat.key }"
              @click="activeFilter = cat.key">{{ cat.label }}</button>
    </div>
    <div class="service-grid">
      <article v-for="s in services.filter(x => activeFilter === 'todas' || x.category === activeFilter)"
               :key="s.id" class="service-card" data-reveal @click="trackServiceClick(s)">
        <div class="service-card__glow"></div>
        <div class="service-card__icon">
          <IconInline :name="serviceIcons[s.id] ?? 'Bot'" :size="18" />
        </div>
        <div class="service-card__cat">{{ s.category }}</div>
        <h3>{{ s.title }}</h3>
        <p>{{ s.short }}</p>
        <p class="service-card__outcome">{{ s.outcome }}</p>
        <div class="tags">
          <span v-for="t in s.metaCapabilities.slice(0, 4)" :key="t">{{ t }}</span>
          <span v-if="s.metaCapabilities.length > 4" class="tag-more">+{{ s.metaCapabilities.length - 4 }}</span>
        </div>
        <div v-if="s.startingAt" class="service-card__price">{{ s.startingAt }}</div>
      </article>
    </div>
  </section>
</template>
