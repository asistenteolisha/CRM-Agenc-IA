# PLAN BRAND V3 — Rediseño Completo Agenc-IA

> **Objetivo:** Transformar la web actual de "template oscuro genérico" a una marca profesional, cálida y memorable que compita con Automaxia y agencias IA de primer nivel.

---

## 1. NUEVA PALETA DE COLORES — Crema Profesional

Inspiración: Automaxia (blanco + azul corporativo + naranja CTA) + tendencia "warm minimal UI" 2026.

```scss
:root {
  /* Fondos — crema cálido (reemplaza el negro #07110f) */
  --bg-primary:    #FBF7F0;   /* fondo principal — crema claro */
  --bg-secondary:  #F3EDE4;   /* fondo alternativo — beige suave */
  --bg-surface:    #FFFFFF;   /* cards / superficies */
  --bg-elevated:   #FEFCF9;   /* superficies elevadas */

  /* Texto */
  --text-primary:  #1C1915;   /* texto principal — casi negro cálido */
  --text-secondary:#5C564E;   /* texto secundario — gris cálido */
  --text-muted:    #8A8279;   /* texto muted — beige oscuro */
  --text-inverse:  #FBF7F0;   /* texto sobre fondos oscuros */

  /* Acentos */
  --accent-amber:  #D4900B;   /* ámbar/dorado — CTAs, badges, highlights */
  --accent-blue:   #1E6F8C;   /* azul corporativo — links, iconos, confianza */
  --accent-teal:   #0D9488;   /* teal — tecnología, IA, nodos */
  --accent-rose:   #C4455A;   /* rose — alertas, urgencia */
  --accent-wa:     #25D366;   /* WhatsApp green — no se toca */
  --accent-ig:     #E1306C;   /* Instagram — no se toca */
  --accent-fb:     #1877F2;   /* Facebook — no se toca */

  /* Bordes */
  --border-light:  #E6DFD4;
  --border-medium: #D4CCC0;

  /* Sombras */
  --shadow-sm:     0 1px 3px rgba(28, 25, 21, 0.06);
  --shadow-md:     0 4px 16px rgba(28, 25, 21, 0.08);
  --shadow-lg:     0 12px 40px rgba(28, 25, 21, 0.12);
  --shadow-glow:   0 0 40px rgba(212, 144, 11, 0.15);

  /* Radios */
  --radius-sm:     6px;
  --radius:        10px;
  --radius-lg:      16px;
  --radius-xl:      24px;

  /* Tipografía */
  --font-sans:     'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-display:  'Plus Jakarta Sans', var(--font-sans);
  --max-width:     1200px;
}
```

**Regla de aplicación:**
- `--bg-primary` → `<body>`, secciones principales
- `--bg-secondary` → secciones alternadas (faq, integrations, comparison)
- `--bg-surface` → cards (pricing, services, cases, stats)
- `--accent-amber` → TODOS los CTAs primarios, badges, highlights de precio
- `--accent-blue` → links, títulos de sección, iconos de features, tabs activos
- `--accent-teal` → elementos "tech": nodos de IA, tags, código
- `--text-primary` → headings, body text en cards
- `--text-secondary` → párrafos, descripciones
- `--text-muted` → metadatos, fechas, notas al pie

---

## 2. LOGO SVG — Agenc-IA

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" fill="none">
  <!-- Icono: cerebros/nodos conectados -->
  <g transform="translate(0, 2)">
    <!-- Nodo izquierdo (ámbar) -->
    <circle cx="16" cy="22" r="8" fill="#D4900B" opacity="0.9"/>
    <circle cx="16" cy="22" r="4" fill="#FBF7F0"/>
    <!-- Nodo derecho (teal) -->
    <circle cx="36" cy="22" r="8" fill="#0D9488" opacity="0.9"/>
    <circle cx="36" cy="22" r="4" fill="#FBF7F0"/>
    <!-- Conexiones -->
    <line x1="24" y1="22" x2="28" y2="22" stroke="#D4900B" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Punto central -->
    <circle cx="24" cy="22" r="2.5" fill="#1C1915"/>
    <!-- Pulsos -->
    <circle cx="16" cy="22" r="12" fill="none" stroke="#D4900B" stroke-width="0.8" opacity="0.3"/>
    <circle cx="36" cy="22" r="12" fill="none" stroke="#0D9488" stroke-width="0.8" opacity="0.3"/>
  </g>

  <!-- Tipografía -->
  <text x="52" y="32" font-family="'Plus Jakarta Sans', 'Inter', sans-serif" font-weight="800" font-size="26"
        fill="#1C1915" letter-spacing="-0.5">
    Agenc<tspan font-weight="400" fill="#D4900B">-</tspan><tspan fill="#0D9488">IA</tspan>
  </text>
</svg>
```

**Versión compacta (solo icono — para favicon / mobile nav):**
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
  <rect width="48" height="48" rx="12" fill="#FBF7F0"/>
  <circle cx="18" cy="24" r="8" fill="#D4900B" opacity="0.9"/>
  <circle cx="18" cy="24" r="3.5" fill="#FBF7F0"/>
  <circle cx="34" cy="24" r="8" fill="#0D9488" opacity="0.9"/>
  <circle cx="34" cy="24" r="3.5" fill="#FBF7F0"/>
  <line x1="26" y1="24" x2="28" y2="24" stroke="#D4900B" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="24" cy="24" r="2.5" fill="#1C1915"/>
</svg>
```

**Colores del logo:**
- Ámbar (#D4900B): representa el negocio, el ROI, la acción
- Teal (#0D9488): representa la tecnología, la IA
- Conexión: la unión de negocio + IA = Agenc-IA

---

## 3. SISTEMA DE ICONOS — Lucide

**Instalación sin dependencia nueva:** importar solo los SVG que necesitamos como componentes inline. No instalar `lucide-vue-next` — copiamos los paths SVG relevantes en un archivo `src/components/icons.ts`.

```ts
// src/components/icons.ts — paths de Lucide (MIT licensed)
// https://lucide.dev/icons — solo los que usamos

export const icons = {
  // Servicios
  MessageCircle:    'M7.9 20A9 9 0 1 0 4 16.1L2 22Z',       // WhatsApp
  Instagram:        'M...',  // IG
  Facebook:         'M...',  // FB
  Bot:              'M...',  // Agente IA
  ShoppingCart:     'M...',  // E-commerce
  Workflow:         'M...',  // Automatización n8n
  CalendarCheck:    'M...',  // Agendamiento
  FileSearch:       'M...',  // Documental
  ChartNoAxesColumnIncreasing: 'M...', // Dashboard
  Users:            'M...',  // Social media
  Shield:           'M...',  // Moderación
  Lightbulb:        'M...',  // Consultoría
  Globe:            'M...',  // Web funnel
  RefreshCw:        'M...',  // Recuperación leads

  // Features pricing
  Check:            'M20 6 9 17-4-7',
  Zap:              'M13 2 3 14h9l-1 8 10-12h-9l1-8z',

  // Navegación
  Menu:             'M4 12h16M4 6h16M4 18h16',
  ChevronDown:      'm6 9 6 6 6-6',
  ChevronRight:     'm9 18 6-6-6-6',

  // Contacto
  Mail:             'M...',
  Phone:            'M...',
  MapPin:           'M...',
}
```

**Asignación de iconos por servicio:**
| # | Servicio | Icono Lucide |
|---|---------|-------------|
| 1 | Agente de ventas WhatsApp | `MessageCircle` |
| 2 | Agente de atención | `MessageCircle` |
| 3 | E-commerce conversacional | `ShoppingCart` |
| 4 | Funnel Meta completo | `Facebook` |
| 5 | Agente Instagram DMs | `Instagram` |
| 6 | Agente comentarios FB/IG | `MessageCircle` |
| 7 | Social Media Agent | `Users` |
| 8 | Moderador inteligente | `Shield` |
| 9 | Agendamiento automático | `CalendarCheck` |
| 10 | Recuperación leads fríos | `RefreshCw` |
| 11 | Automatización n8n/CRM | `Workflow` |
| 12 | Web funnel IA | `Globe` |
| 13 | Dashboard comercial | `ChartNoAxesColumnIncreasing` |
| 14 | Agente documental | `FileSearch` |
| 15 | Consultoría IA | `Lightbulb` |

---

## 4. ESTRATEGIA DE IMÁGENES

**Principio: cada página debe tener al menos 1 imagen de alto impacto.**

### HomePage
- **Hero background:** gradiente animado (ámbar → teal → crema) con partículas sutiles CSS. Reemplaza el Three.js.
- **Sección "Meta Ecosystem":** 4 imágenes pequeñas (mockups de chats de WhatsApp, Instagram, Facebook, n8n) mostrando el producto real en acción. Fuente: screenshots reales de los agentes funcionando.

### ServicesPage
- **Header:** ilustración abstracta de nodos conectados (SVG inline, animada con CSS).
- **Cards de servicio:** iconos Lucide + miniatura ilustrativa. Cada servicio con un pequeño mockup del chat.

### CasesPage  
- **Header:** foto de un negocio colombiano real (o stock de calidad).
- **Cada case study:** mockup de conversación real del bot + foto del negocio.

### PricingPage
- Sin imágenes grandes — los números e iconos hablan solos.

### ContactPage / SobreNosotros
- **Foto de Daniel** (opcional, si hay).
- **Screenshots del stack:** Hermes, n8n, Meta, Vercel.

### Fuentes de imágenes:
1. **Screenshots reales** del bot en WhatsApp/Instagram/Facebook (prioridad #1)
2. **Unsplash** — búsquedas: "Colombia business", "small business owner", "restaurant Colombia", "car dealership"
3. **IA generada** — para ilustraciones abstractas de flujos, nodos, redes
4. **SVG inline** — para iconos decorativos y patrones de fondo

---

## 5. PLAN DE ANIMACIONES GSAP

```scss
// Reemplazar TODAS las animaciones actuales.
// El plan actual tiene solo fade-up básico. Esto añade variedad.

// ============================================
// HERO — gradiente animado + text stagger
// ============================================
// En el HeroSection, reemplazar <AgentNetwork/> con:
// <div class="hero-gradient" ref="heroBg"></div>

// CSS:
.hero-gradient {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 30% 20%, rgba(212,144,11,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 60%, rgba(13,148,136,0.10) 0%, transparent 60%),
              linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  animation: heroPulse 8s ease-in-out infinite alternate;
}
@keyframes heroPulse {
  0%   { opacity: 0.7; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.03); }
}
```

```ts
// GSAP en HomePage onMounted:
// Hero text stagger (palabra por palabra)
gsap.from('.hero h1 .word', {
  y: 60, autoAlpha: 0, duration: 0.8, ease: 'power4.out',
  stagger: 0.08, delay: 0.3
})

// Hero CTA bounce
gsap.from('.hero__actions .btn', {
  scale: 0.8, autoAlpha: 0, duration: 0.6, ease: 'back.out(2)',
  stagger: 0.15, delay: 1.0
})

// TrustBar fade-in with slight slide
gsap.from('.trust-chip', {
  y: 20, autoAlpha: 0, duration: 0.5, ease: 'power2.out',
  stagger: 0.05,
  scrollTrigger: { trigger: '.trust-bar', start: 'top 85%' }
})

// Problem cards — slide from alternating sides (ya existe, mantener)
// Meta cards — scale-in with spring (ya existe)

// Services cards — reveal on scroll with stagger + slight rotation
gsap.from('.service-card', {
  y: 60, autoAlpha: 0, rotateX: 5, duration: 0.7, ease: 'power3.out',
  stagger: { each: 0.08, from: 'start' },
  scrollTrigger: { trigger: '.service-grid', start: 'top 82%' }
})

// Pricing cards — scale-in with spring (ya existe)
// Stats counters — ya existe con GSAP counter

// Case studies — stagger from bottom with scale
gsap.from('.case-card', {
  y: 80, scale: 0.95, autoAlpha: 0, duration: 0.65, ease: 'power3.out',
  stagger: 0.12,
  scrollTrigger: { trigger: '.case-grid', start: 'top 82%' }
})

// FAQ items — sequential reveal con rotación sutil
gsap.from('.faq-item', {
  x: -20, autoAlpha: 0, duration: 0.4, ease: 'power2.out',
  stagger: 0.06,
  scrollTrigger: { trigger: '.faq-list', start: 'top 85%' }
})

// Comparison rows — stagger from left (ya existe)

// Integration chips — cascade pop-in (ya existe)

// Page transitions — fade between routes
// En App.vue, usar <Transition name="page"> alrededor de <RouterView>
```

```scss
// Page transitions
.page-enter-active { transition: all 0.35s ease-out; }
.page-leave-active { transition: all 0.25s ease-in; }
.page-enter-from { opacity: 0; transform: translateY(20px); }
.page-leave-to { opacity: 0; transform: translateY(-10px); }
```

---

## 6. NUEVA PÁGINA "SOBRE NOSOTROS"

**Ruta:** `/#/nosotros`
**Archivo:** `src/pages/AboutPage.vue`

### Estructura:
```
1. Header: "Sobre Agenc-IA" — H1 + subtítulo
2. Foto/sección Daniel (opcional) + bio corta
3. Misión / Visión / Valores (3 cards con iconos)
4. Stack tecnológico (grid de logos: Vue, GSAP, Three.js, n8n, Meta, Vercel, Hermes)
5. El caso Auto Sales destacado (con link a /casos)
6. CTA final: "¿Querés esto en tu negocio?"
```

### Contenido:
- **Misión:** "Convertir la IA en sistemas operativos reales para PYMES colombianas, no en promesas."
- **Visión:** "Ser la agencia líder en automatización conversacional Meta para el mercado PYME latinoamericano."
- **Stack:** Vue 3 · TypeScript · GSAP · Three.js · n8n · WhatsApp API · Meta Graph API · Vercel · Hermes Agent
- **Caso destacado:** Concesionario en Bucaramanga — "De 4 horas de espera a <30 segundos de respuesta. 3× más leads calificados."

---

## 7. REDISEÑO DEL HERO

### Problemas actuales:
- Three.js oscuro no transmite confianza corporativa
- Demasiado texto técnico en el H1
- Panel lateral de agentes es confuso

### Nuevo diseño (inspirado en Automaxia):
```
┌──────────────────────────────────────────────┐
│  [Logo]  Inicio Servicios Casos Precios...   │  ← Nav limpio
├──────────────────────────────────────────────┤
│                                              │
│    🏆 Agentes IA para PYMES Colombianas     │  ← Badge pequeño
│                                              │
│    Agentes IA que venden, atienden           │
│    y crecen con tu negocio                   │  ← H1 más corto (max 10 palabras)
│                                              │
│    WhatsApp · Instagram · Facebook           │
│    Todo conectado a tu CRM en un solo        │  ← Subtítulo descriptivo
│    sistema. Diagnóstico gratis en 20 min.   │
│                                              │
│    [Agendar diagnóstico]  [Ver servicios]    │  ← 2 CTAs claros
│                                              │
│    ✦ +85% consultas atendidas 24/7          │  ← Métrica social proof
│    ✦ 15 agentes IA listos para tu industria │
│                                              │
│  [Ilustración/mockup de chat WhatsApp real]  │  ← Imagen del producto
│                                              │
├──────────────────────────────────────────────┤
│  WhatsApp · Instagram · Facebook · n8n · CRM │  ← TrustBar
└──────────────────────────────────────────────┘
```

### Cambios concretos:
1. **Eliminar AgentNetwork (Three.js).** Reemplazar con gradiente CSS animado + imagen del producto (mockup de chat real).
2. **H1 más corto:** "Agentes IA que venden, atienden y crecen con tu negocio." (vs el actual de 15 palabras)
3. **Añadir métrica social proof:** "85% de consultas atendidas 24/7" con ícono check.
4. **Añadir imagen del producto:** screenshot real de una conversación de WhatsApp con el bot.
5. **Eliminar panel lateral de agentes** (confuso, métricas de sistema que no le importan al cliente).

---

## 8. REDISEÑO DEL NAV

### Actual: 6 links planos
```
Agenc-IA   Servicios  Casos  ROI  Precios  FAQ  Contacto
```

### Nuevo: dropdown profesional estilo Automaxia
```
Agenc-IA   Servicios ▼   Casos   Precios ▼   Nosotros   Contacto
            ├ WhatsApp
            ├ Instagram
            ├ Facebook
            ├ Automatización
            ├ E-commerce
            └ Consultoría       ├ Starter
                                ├ Business
                                └ Enterprise
```

**Implementación:**
- Solo CSS (no JS adicional). Usar `:hover` / `:focus-within` en desktop, click en mobile.
- Sin mega-menú complejo. Dropdowns simples de 1 nivel.

```vue
<!-- En AppLayout.vue -->
<div class="nav__dropdown">
  <a href="/servicios">Servicios <ChevronDown/></a>
  <div class="nav__dropdown-menu">
    <RouterLink to="/servicios?filter=ventas">Ventas</RouterLink>
    <RouterLink to="/servicios?filter=social">Social Media</RouterLink>
    <RouterLink to="/servicios?filter=ecommerce">E-commerce</RouterLink>
    <RouterLink to="/servicios?filter=automatizacion">Automatización</RouterLink>
    <RouterLink to="/servicios?filter=consultoria">Consultoría</RouterLink>
  </div>
</div>
```

---

## 9. DECISIÓN SOBRE THREE.JS

**Eliminar.** Tres razones:

1. **No aporta al mensaje comercial.** Los clientes de PYMES colombianas no compran porque vieron una red 3D girando. Compran porque alguien les resolvió un problema concreto.
2. **Performance.** 471 kB de bundle que no se usan en ninguna otra página. Ralentiza el LCP (Largest Contentful Paint).
3. **Estilo incorrecto para crema.** La red oscura no encaja con la nueva paleta clara.

**Reemplazar con:**
- **Fondo gradiente CSS animado** (ya descrito en sección 5)
- **Mockup de producto** (screenshot de chat real) como hero image
- **SVG decorativos** ligeros para patrones de fondo (opcional)

**Beneficio:** -471 kB de bundle, LCP más rápido, diseño coherente.

---

## 10. PRIORIDAD DE IMPLEMENTACIÓN

| # | Tarea | Tiempo | Impacto |
|---|-------|--------|---------|
| 1 | **Nueva paleta CSS** — cambiar todas las variables en `main.scss` | 1h | 🔴 Crítico |
| 2 | **Logo SVG** — crear `public/logo.svg`, favicon, usarlo en Nav y Footer | 30m | 🔴 Crítico |
| 3 | **Eliminar Three.js** — quitar `AgentNetwork.vue`, dependencia `three`, limpiar `package.json` | 15m | 🔴 Crítico |
| 4 | **Nuevo Hero** — gradiente CSS, H1 más corto, métrica social proof, mockup imagen | 1.5h | 🔴 Crítico |
| 5 | **Iconos Lucide** — crear `icons.ts`, reemplazar emojis por iconos en servicios, pricing, nav | 1h | 🟡 Alto |
| 6 | **Nav dropdowns** — CSS dropdowns en AppLayout | 45m | 🟡 Alto |
| 7 | **Página "Sobre Nosotros"** — nueva ruta, página, contenido | 1h | 🟡 Alto |
| 8 | **Imágenes** — agregar imágenes de Unsplash + mockups en páginas clave | 1.5h | 🟡 Alto |
| 9 | **Animaciones GSAP avanzadas** — stagger palabras hero, service cards rotate, page transitions | 1.5h | 🟢 Medio |
| 10 | **QA y ajustes finos** — revisar contraste, responsive, performance | 1h | 🟢 Medio |

**Total estimado: ~9-10 horas**

---

## APÉNDICE A: Mockup de imagen del producto

Para la imagen del hero, usar un screenshot de WhatsApp real:

```
┌──────────────────────────┐
│ 🟢 WhatsApp Business     │
├──────────────────────────┤
│                          │
│  Cliente:                │
│  Hola, busco un carro    │
│  automático de hasta     │
│  45 millones.            │
│                          │
│  Agenc-IA Bot:           │
│  ¡Perfecto! Para         │
│  ayudarte mejor: ¿ciudad,│
│  uso y financiación?     │
│                          │
│  Cliente:                │
│  B/manga, familiar,      │
│  podría financiar.       │
│                          │
│  ✅ Lead caliente        │
│  → Enviado al CRM        │
│                          │
└──────────────────────────┘
```

---

## APÉNDICE B: Comparación Antes/Después

| Aspecto | Antes | Después |
|---------|-------|---------|
| Fondo | Negro #07110f | Crema #FBF7F0 |
| Texto | Verde/cyan sobre negro | Casi-negro cálido sobre crema |
| CTAs | Verde #4fffb0 | Ámbar #D4900B |
| Hero | Red 3D girando | Gradiente + screenshot real |
| Logo | Texto "Agenc-IA" | SVG con nodos + tipografía |
| Iconos | Emojis 🚗💰 | Lucide SVG profesionales |
| Nav | Links planos | Dropdowns por categoría |
| Páginas | 5 | 6 (+ Nosotros) |
| Bundle | 753 kB | ~290 kB (-Three.js) |
| Animaciones | fade-up genérico | stagger palabras, spring cards, page transitions |
