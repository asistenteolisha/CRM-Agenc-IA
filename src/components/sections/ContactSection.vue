<script setup lang="ts">
import { ref } from 'vue'
import { services } from '../../data/services'
import { trackEvent } from '../../utils/analytics'
import { withStoredUtmParams } from '../../utils/utm'

type FormState = 'idle' | 'sending' | 'sent' | 'error'

const formState = ref<FormState>('idle')
const showPrivacyPolicy = ref(false)
const form = ref({
  name: '',
  business_type: '',
  phone: '',
  email: '',
  service_interest: services[0]?.title ?? '',
  need: '',
  data_consent: false
})

async function submitLead() {
  formState.value = 'sending'

  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(withStoredUtmParams(form.value))
    })

    formState.value = response.ok ? 'sent' : 'error'

    if (response.ok) {
      trackEvent('lead_submit', {
        business_type: form.value.business_type,
        service_interest: form.value.service_interest
      })

      form.value = {
        name: '',
        business_type: '',
        phone: '',
        email: '',
        service_interest: form.value.service_interest,
        need: '',
        data_consent: false
      }
    }
  } catch {
    formState.value = 'error'
  }

  setTimeout(() => {
    formState.value = 'idle'
  }, 4500)
}

function trackWhatsAppClick() {
  trackEvent('whatsapp_click', { location: 'contact_section' })
}
</script>

<template>
  <section id="contacto" class="contact">
    <div class="contact__copy" data-reveal>
      <p class="eyebrow">Contacto</p>
      <h2>Contanos quÃ© canal te duele mÃ¡s.</h2>
      <p>WhatsApp, Instagram, Facebook, e-commerce o seguimiento comercial. Te devolvemos un diagnÃ³stico corto con el primer flujo recomendado.</p>
      <a href="mailto:leinadgalaxy@gmail.com">leinadgalaxy@gmail.com</a>
      <div class="contact__whatsapp">
        <a href="https://wa.me/573012604061" class="btn btn--secondary" @click="trackWhatsAppClick">Hablar por WhatsApp â†’</a>
      </div>
    </div>
    <form class="lead-form" @submit.prevent="submitLead" data-reveal>
      <input v-model="form.name" name="name" placeholder="Nombre" required autocomplete="name" />
      <input v-model="form.business_type" name="business_type" placeholder="Tipo de negocio" required />
      <div class="lead-form__split">
        <input v-model="form.phone" name="phone" placeholder="WhatsApp / telÃ©fono" required autocomplete="tel" />
        <input v-model="form.email" name="email" type="email" placeholder="Email" required autocomplete="email" />
      </div>
      <select v-model="form.service_interest" name="service_interest">
        <option v-for="s in services" :key="s.id" :value="s.title">{{ s.title }}</option>
        <option>No estoy seguro, quiero diagnÃ³stico</option>
      </select>
      <textarea
        v-model="form.need"
        name="need"
        rows="5"
        placeholder="Â¿QuÃ© problema querÃ©s resolver o quÃ© proceso querÃ©s automatizar?"
        required
      ></textarea>
      <label class="lead-form__consent">
        <input v-model="form.data_consent" name="data_consent" type="checkbox" required />
        <span>
          Acepto la polÃ­tica de tratamiento de datos personales de Agenc-IA. Mis datos serÃ¡n utilizados para contactarme y brindar informaciÃ³n sobre servicios.
          <a href="#politica-privacidad" @click.prevent="showPrivacyPolicy = !showPrivacyPolicy">Ver polÃ­tica de privacidad</a>
        </span>
      </label>
      <p v-if="showPrivacyPolicy" id="politica-privacidad" class="lead-form__privacy">
        Usamos tus datos para responder tu solicitud, ofrecerte informaciÃ³n sobre nuestros servicios y hacer seguimiento comercial relacionado con Agenc-IA. No vendemos tus datos a terceros.
      </p>
      <input type="text" name="company_website" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off" />
      <button
        class="btn btn--primary"
        type="submit"
        :disabled="formState === 'sending' || formState === 'sent' || !form.data_consent"
      >
        <span v-if="formState === 'idle'">Enviar diagnÃ³stico</span>
        <span v-else-if="formState === 'sending'">Enviando...</span>
        <span v-else-if="formState === 'sent'">âœ… Recibido. Te contactamos pronto.</span>
        <span v-else>âŒ Error. IntentÃ¡ por email o WhatsApp.</span>
      </button>
    </form>
  </section>
</template>
