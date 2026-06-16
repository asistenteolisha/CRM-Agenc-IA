# Plan Maestro: Actualización Web Agenc-IA

> **Objetivo:** Transformar la web actual de Agenc-IA en un sitio profesional de agencia de IA completo, con servicios ampliados, animaciones ricas, demos interactivos, secciones de prueba social, y preparado para producción con clientes reales.

## Estado Actual

**Tech Stack:** Vue 3 + Vite + TypeScript + GSAP + Three.js + Lenis + SCSS
**Deploy:** Vercel (con serverless function `/api/lead` → n8n webhook)
**Diseño:** Dark theme (#07110f), acentos verde/cyan, tipografía Inter
**Secciones actuales:** Hero (con animación 3D de red), Problema (3 pains), Servicios (6), Demo (chat carros usados), Proceso (5 pasos), Casos (3 strip), Stats (4), Contacto (form → n8n)
**Bilíngüe:** ES/EN toggle

## Sitios de Referencia Analizados

1. **agenciaia.com.co (Automaxia)** — Metodología 4 fases, servicios por departamento, integraciones (HubSpot, Salesforce, WhatsApp), KPIs, comparativa vs alternativas
2. **vonoaweb.com** — Pricing claro por servicio, caso real con métricas (antes/después), sección FAQ, formulario de cotización, CTAs fuertes
3. **ignaciojm.com** — Testimonios con resultados medibles ($ ahorrados, % conversión), servicios por vertical, consultor IA personal
4. **hywiz.com** — Portfolio con case studies detallados, servicios por tipo de agente (SDR, Support, Voice), resultados medibles

---

## FASE 0: Preparación y Estructura (Antes de tocar código)

### Tareas de Setup

- [ ] **0.1** Clonar repo a `E:\workspace\Agenc-IA` (trabajar en branch `v2`)
- [ ] **0.2** Verificar que `pnpm dev` funciona sin errores
- [ ] **0.3** Definir paleta de colores extendida (mantener base dark + añadir gradientes para nuevas secciones)
- [ ] **0.4** Crear estructura de componentes modular (carpeta `src/components/`, `src/sections/`, `src/data/`)

---

## FASE 1: Arquitectura de Componentes y Datos

### 1.1 Separar datos en archivos dedicados

**Archivo:** `src/data/content.ts`

Mover todos los arrays hardcodeados del App.vue a un archivo de datos centralizado con tipado fuerte:

```typescript
// src/data/content.ts
export interface Service {
  id: string
  title: string
  description: string
  tags: string[]
  icon: string // emoji o nombre de icono
  features: string[]
  pricing?: { setup?: string; monthly?: string }
}

export interface CaseStudy {
  id: string
  client: string
  industry: string
  problem: string
  solution: string
  results: { metric: string; value: string }[]
  testimonial?: { author: string; role: string; quote: string }
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  details: string[]
}

// ... exports para ES y EN
```

### 1.2 Crear componentes de sección reutilizables

Estructura propuesta:
```
src/
├── components/
│   ├── ui/
│   │   ├── AppNav.vue          # Navbar con mobile hamburger
│   │   ├── AppFooter.vue       # Footer completo (NUEVO)
│   │   ├── Button.vue          # Botón reutilizable
│   │   ├── Card.vue            # Card con hover effects
│   │   ├── Badge.vue           # Eyebrow/badge
│   │   ├── Modal.vue           # Modal para demos/videos
│   │   └── Tooltip.vue
│   ├── sections/
│   │   ├── HeroSection.vue
│   │   ├── ProblemSection.vue
│   │   ├── ServicesSection.vue
│   │   ├── DemoSection.vue
│   │   ├── ProcessSection.vue
│   │   ├── PricingSection.vue     # NUEVO
│   │   ├── CaseStudiesSection.vue # NUEVO (reemplaza case-strip)
│   │   ├── TestimonialsSection.vue # NUEVO
│   │   ├── IntegrationsSection.vue # NUEVO
│   │   ├── FaqSection.vue          # NUEVO
│   │   ├── StatsSection.vue
│   │   └── ContactSection.vue
│   ├── interactive/
│   │   ├── AgentNetwork.vue     # Ya existe
│   │   ├── ChatDemo.vue         # NUEVO - demo interactiva animada
│   │   ├── RoiCalculator.vue    # NUEVO - calculadora de ROI
│   │   └── LiveMetrics.vue      # NUEVO - panel de métricas animadas
│   └── BrandLogo.vue            # Logo SVG animado
├── data/
│   ├── content.es.ts
│   ├── content.en.ts
│   └── types.ts
├── styles/
│   ├── main.scss
│   ├── variables.scss           # Variables extendidas
│   ├── animations.scss          # Animaciones GSAP/CSS
│   └── components/              # Estilos por componente
└── composables/
    ├── useScrollAnimation.ts    # GSAP ScrollTrigger reutilizable
    ├── useIntersectionObserver.ts
    └── useLocale.ts             # i18n composable
```

---

## FASE 2: Servicios Ampliados (de 6 a 10+)

### Servicios actuales (6):
1. Agente de ventas
2. Agente de atención
3. Agente oficina/legal
4. Agente hospitality
5. Automatización n8n
6. Funnel web listo para IA

### Servicios nuevos a añadir (6+):

7. **Agente de WhatsApp Business (Meta API)**
   - Respuestas automáticas 24/7
   - Catálogos interactivos
   - Flujos de conversación multi-paso
   - Integración con Meta Business Suite
   - Tags: `['WhatsApp API', 'Meta', 'Catálogo']`

8. **Agente de redes sociales (FB/IG Comments)**
   - Respuesta automática a comentarios en Facebook e Instagram
   - Moderación inteligente
   - Captura de leads desde comentarios
   - Tags: `['Facebook', 'Instagram', 'Comments']`

9. **Marketing digital con IA**
   - SEO automatizado con IA
   - Google Ads + Meta Ads management
   - Creación de contenido con IA (flyers, shorts)
   - Reportes automatizados
   - Tags: `['SEO', 'Ads', 'Contenido IA']`

10. **Diseño web profesional + chatbot**
    - Landing pages con chatbot integrado
    - E-commerce con IA
    - SEO técnico incluido
    - Tags: `['Web Design', 'UX/UI', 'E-commerce']`

11. **Consultoría y estrategia IA**
    - Diagnóstico de madurez digital
    - Roadmap de implementación IA
    - Formación de equipos
    - Tags: `['Consultoría', 'Estrategia', 'Formación']`

12. **Sistemas a la medida**
    - APIs de Claude, GPT, Gemini
    - Integración con ERPs/CRMs (SAP, Salesforce, HubSpot)
    - RAG personalizado con datos del negocio
    - Tags: `['APIs', 'RAG', 'Custom']`

### Implementación:

**Archivo:** `src/sections/ServicesSection.vue`

- Grid de cards con iconos SVG animados
- Click en card → expander detalles + features + pricing teaser
- Filtro por categoría: `Ventas | Atención | Automatización | Marketing | Consultoría`
- Animación: stagger reveal con GSAP, hover lift con glow effect

---

## FASE 3: Nuevas Secciones

### 3.1 Pricing / Planes

**Sección:** `PricingSection.vue`

3 tiers inspirados en VonoaWeb + Automaxia:

| Plan | Precio (COP) | Incluye |
|------|-------------|---------|
| **Starter** | $500.000/mes | 1 agente WhatsApp, hasta 500 conversaciones, soporte básico |
| **Business** | $1.200.000/mes | 2 agentes, n8n workflows, CRM integration, reportes, soporte prioritario |
| **Enterprise** | Cotización personalizada | Agentes ilimitados, APIs custom, SLA, account manager dedicado |

Setup fee separado. Card del plan Business con badge "Más popular".

### 3.2 Case Studies Detallados

**Sección:** `CaseStudiesSection.vue`

Reemplazar el `case-strip` actual por cards expandibles con:
- Nombre del cliente/industria
- Problema → Solución → Resultados (métricas reales)
- Testimonial del cliente (cuando haya)
- Screenshots del bot en acción (mockup de chat de WhatsApp)

**Caso principal: Auto Sales (carros usados)**
- Problema: "El 60% de leads por WhatsApp no recibían respuesta en menos de 4 horas"
- Solución: "Agente IA que califica presupuesto, tipo de carro, ciudad y urgencia en <30 segundos"
- Resultados: "3x más leads calificados, 85% consultas atendidas 24/7, $2M COP ahorrados/mes en personal"

**Caso: Restaurante/Café**
- SOPs, menús, proveedores, inventario

**Caso: Oficina legal/consultoría**
- Documentos, research, agenda

### 3.3 Testimonios

**Sección:** `TestimonialsSection.vue`

- Carousel/slider con testimonios
- Cada testimonio: foto/avatar, nombre, cargo, empresa, quote, métricas destacadas
- Animación: auto-play con pausa on hover
- Si no hay clientes reales aún: usar testimonios de beta testers o el caso "Amigo" como piloto

### 3.4 Integraciones / Ecosistema

**Sección:** `IntegrationsSection.vue`

Grid de logos de herramientas que integran:
- **Comunicación:** WhatsApp Business, Facebook Messenger, Instagram DM, Telegram
- **Automatización:** n8n, Make.com, Zapier
- **CRM:** HubSpot, Salesforce, Zoho, Pipedrive
- **E-commerce:** Shopify, WooCommerce
- **Pagos:** Stripe, MercadoPago, Nequi, Daviplata
- **Cloud:** AWS, Google Cloud, Vercel
- **IA:** OpenAI, Anthropic, Google Gemini, Meta LLaMA
- **Datos:** PostgreSQL, BigQuery, Pinecone

Animación: logos aparecen con stagger, hover agranda + tooltip con descripción.

### 3.5 FAQ

**Sección:** `FaqSection.vue`

8-10 preguntas frecuentes con accordion:

1. ¿Qué es un agente IA y cómo funciona?
2. ¿Cuánto tiempo toma implementar un agente?
3. ¿Necesito conocimientos técnicos?
4. ¿Qué pasa si el agente no sabe responder?
5. ¿Cuánto cuesta un agente personalizado?
6. ¿Se integra con mi CRM/herramientas actuales?
7. ¿Mis datos están seguros?
8. ¿Puedo probar antes de comprometerme?
9. ¿Qué diferencia a Agenc-IA de un chatbot genérico?
10. ¿Ofrecen soporte post-implementación?

### 3.6 Footer Completo

**Componente:** `AppFooter.vue`

- Logo + tagline
- Links: Servicios, Precios, Casos, FAQ, Contacto
- Redes sociales: LinkedIn, GitHub, WhatsApp directo, Instagram
- Legal: Términos, Privacidad
- "© 2026 Agenc-IA. Todos los derechos reservados."
- Badge: "Hecho con IA + criterio humano 🇨🇴"

### 3.7 Sección "Sobre Nosotros" / Equipo

**Sección:** `AboutSection.vue`

- Quién está detrás (Daniel + la red de agentes)
- Misión / Visión / Valores
- Stack tecnológico (Hermes, n8n, WhatsApp API, Meta, Vercel)
- Diferenciadores vs competencia

### 3.8 Demo Interactiva Mejorada

**Reemplazar:** la demo estática de chat por una animada

- `ChatDemo.vue`: Burbujas aparecen una por una con typing indicator
- Múltiples escenarios: Ventas (carros), Atención (restaurante), Legal
- Tabs para cambiar entre industrias
- Botón "Probar tú mismo" → abre widget de chat real (o link a WhatsApp)

### 3.9 Calculadora de ROI

**Componente:** `RoiCalculator.vue`

Inputs:
- Leads recibidos por mes
- Horas del equipo en tareas repetitivas
- Ticket promedio de venta

Outputs (calculados):
- Leads perdidos por demora
- Horas/mes ahorradas con agente
- Revenue adicional estimado
- ROI del primer trimestre

---

## FASE 4: Animaciones y UX Mejorada

### 4.1 Hero mejorado

- Mantener AgentNetwork (Three.js) pero con más partículas y glow
- Texto del hero con animación typewriter o split-text por palabras
- Panel lateral del sistema con estados animados (puntos que pulsan, datos que fluyen)
- Background: gradient mesh animado sutil

### 4.2 Scroll Animations

- GSAP ScrollTrigger para cada sección con efectos diferentes:
  - Fade + slide up (actual)
  - Parallax en imágenes
  - Scale on scroll para cards
  - Text reveal por caracteres en headings importantes
  - Horizontal scroll para case studies en mobile

### 4.3 Micro-interacciones

- Botones: ripple effect on click, glow on hover
- Cards: tilt effect sutil (como Apple cards)
- Links: underline animation
- Form inputs: floating labels + focus glow
- Nav: background opacity cambia con scroll

### 4.4 Videos

- Video de fondo en hero (loop sutil de código/flujos n8n ejecutándose)
- Video demo del bot en acción (grabar pantalla de WhatsApp)
- Videos testimoniales (cuando haya)

### 4.5 Transiciones de página

- Si se añaden más páginas/rutas: transiciones con Vue Router + GSAP
- Por ahora: smooth scroll con anclas mejoradas (Lenis ya está)

---

## FASE 5: Mobile y Accesibilidad

### 5.1 Mobile-First Improvements

- Hamburger menu con animación (ya nav__links se oculta en mobile)
- Bottom floating CTA bar en mobile
- Swipe gestures para carousel de testimonios
- Touch-friendly cards (sin hover, tap para expandir)

### 5.2 Accesibilidad

- ARIA labels completos
- Keyboard navigation
- Focus management en modals
- Alt text en todas las imágenes
- Color contrast ratio ≥ 4.5:1 (ya cumple con green on dark)
- Skip to content link

---

## FASE 6: SEO, Performance y Deploy

### 6.1 SEO

- Meta tags dinámicos por sección
- Open Graph image (generar con IA: logo + tagline)
- Sitemap.xml
- Robots.txt
- Schema.org structured data (LocalBusiness, Service)
- Canonical URLs

### 6.2 Performance

- Lazy loading de componentes pesados (Three.js, GSAP)
- Image optimization (WebP/AVIF)
- Code splitting por sección
- Preload critical fonts
- Lighthouse score target: 90+ en todas las métricas

### 6.3 Deploy Pipeline

- Vercel (actual) con preview deploys por PR
- Environment variables para API keys
- Custom domain: agenc-ia.co o agenc-ia.com.co
- SSL automático
- Analytics: Vercel Analytics o Plausible

---

## FASE 7: Integración con el Bot Real

### 7.1 Widget de Chat en Vivo

- Botón flotante "Habla con nuestro agente" (esquina inferior derecha)
- Abre widget de chat que conecta al bot real de WhatsApp
- Link directo: `https://wa.me/573001234567?text=Hola,%20quiero%20info`
- O embed iframe del bot si se implementa como webchat

### 7.2 Formulario → Lead → Notificación

- El form actual ya envía a n8n webhook ✓
- Añadir: respuesta automática por WhatsApp cuando el lead deja su número
- Añadir: notificación al equipo (Telegram/Discord)

### 7.3 Dashboard de Demos (Futuro)

- Página protegida donde clientes pueden ver su agente en acción
- Métricas en tiempo real: conversaciones, leads, conversiones

---

## Orden de Ejecución Recomendado

| Fase | Tiempo estimado | Prioridad |
|------|----------------|-----------|
| 0. Setup | 30 min | 🔴 Alta |
| 1. Arquitectura componentes | 2-3h | 🔴 Alta |
| 2. Servicios ampliados | 2h | 🔴 Alta |
| 3. Nuevas secciones | 4-5h | 🔴 Alta |
| 4. Animaciones y UX | 3h | 🟡 Media |
| 5. Mobile y accesibilidad | 2h | 🟡 Media |
| 6. SEO y deploy | 1-2h | 🟡 Media |
| 7. Integración bot real | 1h | 🟢 Baja (depende del primer cliente) |

**Total estimado: 15-18 horas de trabajo**

---

## Stack Final Propuesto

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Framework | Vue 3 + TypeScript | Actual ✓ |
| Build | Vite 6 | Actual ✓ |
| Animaciones | GSAP + ScrollTrigger | Actual ✓ |
| 3D | Three.js | Actual, expandir |
| Smooth scroll | Lenis | Actual ✓ |
| Estilos | SCSS | Actual, modularizar |
| Deploy | Vercel | Actual ✓ |
| API | Vercel Serverless | Actual, expandir |
| Backend | n8n webhooks | Actual ✓ |
| Chat | WhatsApp Business API | Meta API habilitada |
| Analytics | Vercel Analytics | NUEVO |
| Icons | Lucide o Phosphor | NUEVO (SVG) |

---

## Archivos a Crear/Modificar (Resumen)

### Nuevos archivos (~15):
```
src/data/types.ts
src/data/content.es.ts
src/data/content.en.ts
src/composables/useScrollAnimation.ts
src/composables/useLocale.ts
src/components/ui/AppFooter.vue
src/components/ui/Modal.vue
src/components/sections/PricingSection.vue
src/components/sections/CaseStudiesSection.vue
src/components/sections/TestimonialsSection.vue
src/components/sections/IntegrationsSection.vue
src/components/sections/FaqSection.vue
src/components/sections/AboutSection.vue
src/components/interactive/ChatDemo.vue
src/components/interactive/RoiCalculator.vue
```

### Archivos a modificar (~5):
```
src/App.vue              # Reorganizar con nuevos componentes
src/styles/main.scss     # Modularizar, añadir animaciones
index.html               # SEO meta tags, OG image
package.json             # Posibles nuevas deps (lucide-vue-next)
vite.config.ts           # Lazy loading config
```

---

## Próximo paso

Una vez aprobado este plan, empezamos por la **Fase 0 + Fase 1** (setup y arquitectura) y avanzamos fase por fase. Cada fase se puede probar independientemente con `pnpm dev`.

¿Quieres que arranquemos con la implementación?
