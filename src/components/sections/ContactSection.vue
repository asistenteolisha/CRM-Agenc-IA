<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { services } from '../../data/services'

type FormState = 'idle' | 'sending' | 'sent' | 'error'
const formState = ref<FormState>('idle')
const form = ref({
  name: '', business_type: '', phone: '', email: '',
  service_interest: services[0]?.title ?? '', need: '',
  utm_source: '', utm_campaign: '', utm_medium: ''
})

// Auto-fill UTM from URL
onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  form.value.utm_source = params.get('utm_source') || ''
  form.value.utm_campaign = params.get('utm_campaign') || ''
  form.value.utm_medium = params.get('utm_medium') || ''
})

const submitLead = async () => {
  formState.value = 'sending'
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    formState.value = response.ok ? 'sent' : 'error'
    if (response.ok) {
      form.value = {
        name: '', business_type: '', phone: '', email: '',
        service_interest: form.value.service_interest, need: '',
        utm_source: form.value.utm_source, utm_campaign: form.value.utm_campaign, utm_medium: form.value.utm_medium
      }
    }
  } catch {
    formState.value = 'error'
  }
  setTimeout(() => { formState.value = 'idle' }, 4500)
}
</script>

<template>
  <section id="contacto" class="contact">
    <div class="contact__copy" data-reveal>
      <p class="eyebrow">Contacto</p>
      <h2>Contanos qué canal te duele más.</h2>
      <p>WhatsApp, Instagram, Facebook, e-commerce o seguimiento comercial. Te devolvemos un diagnóstico corto con el primer flujo recomendado.</p>
      <a href="mailto:leinadgalaxy@gmail.com">leinadgalaxy@gmail.com</a>
      <div class="contact__whatsapp">
        <a href="https://wa.me/573012604061" class="btn btn--secondary">Hablar por WhatsApp →</a>
      </div>
    </div>
    <form class="lead-form" @submit.prevent="submitLead" data-reveal>
      <input v-model="form.name" name="name" placeholder="Nombre" required autocomplete="name" />
      <input v-model="form.business_type" name="business_type" placeholder="Tipo de negocio" required />
      <div class="lead-form__split">
        <input v-model="form.phone" name="phone" placeholder="WhatsApp / teléfono" required autocomplete="tel" />
        <input v-model="form.email" name="email" type="email" placeholder="Email" required autocomplete="email" />
      </div>
      <select v-model="form.service_interest" name="service_interest">
        <option v-for="s in services" :key="s.id" :value="s.title">{{ s.title }}</option>
        <option>No estoy seguro, quiero diagnóstico</option>
      </select>
      <textarea v-model="form.need" name="need" rows="5"
                placeholder="¿Qué problema querés resolver o qué proceso querés automatizar?" required></textarea>
      <!-- honeypot -->
      <input type="text" name="company_website" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off" />
      <!-- UTM tracking -->
      <input type="hidden" v-model="form.utm_source" name="utm_source" />
      <input type="hidden" v-model="form.utm_campaign" name="utm_campaign" />
      <input type="hidden" v-model="form.utm_medium" name="utm_medium" />
      <button class="btn btn--primary" type="submit" :disabled="formState === 'sending' || formState === 'sent'">
        <span v-if="formState === 'idle'">Enviar diagnóstico</span>
        <span v-else-if="formState === 'sending'">Enviando...</span>
        <span v-else-if="formState === 'sent'">✅ Recibido. Te contactamos pronto.</span>
        <span v-else>❌ Error. Intentá por email o WhatsApp.</span>
      </button>
    </form>
  </section>
</template>
