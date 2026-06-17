# PLAN-BRAND-V3 - Rediseño completo Agenc-IA

Fecha: 2026-06-16

Objetivo: transformar Agenc-IA de un sitio oscuro, técnico y genérico a una marca cálida, profesional y confiable para PYMES colombianas que venden por WhatsApp, Instagram y Facebook.

Decisión base: no sumar dependencias para resolver branding. El repo ya tiene Vue 3, SCSS, GSAP, ScrollTrigger, Lenis y Three.js. Para V3, GSAP + SVG + CSS + buenas imágenes hacen el trabajo. Three.js sale del hero.

## 1. Nueva paleta crema/cálida profesional

La paleta debe dejar de verse "terminal hacker". El fondo será crema claro, las superficies marfil, el CTA cobre/ámbar y los detalles IA verde petróleo. Para que no quede todo beige, se usa azul tinta como color de profundidad y verde petróleo como color técnico.

### 1.1 Tokens de marca

| Token | Hex | Uso exacto |
|---|---:|---|
| `--bg` | `#FBF4E8` | Fondo general del sitio |
| `--bg-soft` | `#F4E7D3` | Bandas alternas y fondos de secciones |
| `--surface` | `#FFFDF8` | Cards, nav, dropdowns, formularios |
| `--surface-warm` | `#F8EAD7` | Hover, cards destacadas suaves |
| `--surface-strong` | `#EED7B8` | Pricing recomendado, bordes cálidos |
| `--text` | `#211A14` | Titulares y texto principal |
| `--muted` | `#665A4A` | Párrafos y descripciones |
| `--dim` | `#8B7B69` | Captions, notas y metadata |
| `--line` | `rgba(68, 45, 24, 0.14)` | Bordes normales |
| `--line-strong` | `rgba(184, 107, 34, 0.42)` | Bordes activos |
| `--brand` | `#B86B22` | CTA primario, logo, highlights |
| `--brand-dark` | `#7A3F12` | Hover de CTA y texto cobre oscuro |
| `--brand-soft` | `#F3C27A` | Badges, fondos cálidos, acentos |
| `--ai` | `#2F7D6D` | IA, tags, flujos, éxito operativo |
| `--ai-dark` | `#194E45` | Texto y hover de elementos IA |
| `--ink-blue` | `#23344D` | Secciones de autoridad, footer, contraste |
| `--coral` | `#C95F43` | Problemas, pérdidas, alertas |
| `--success` | `#2E8A57` | Checks y estados positivos |
| `--wa` | `#25D366` | WhatsApp |
| `--ig` | `#C13584` | Instagram |
| `--fb` | `#1877F2` | Facebook |

### 1.2 Reemplazo del `:root`

En `src/styles/main.scss`, reemplazar los tokens actuales por:

```scss
:root {
  color-scheme: light;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --bg: #FBF4E8;
  --bg-soft: #F4E7D3;
  --surface: #FFFDF8;
  --surface-warm: #F8EAD7;
  --surface-strong: #EED7B8;

  --text: #211A14;
  --muted: #665A4A;
  --dim: #8B7B69;

  --line: rgba(68, 45, 24, 0.14);
  --line-strong: rgba(184, 107, 34, 0.42);

  --brand: #B86B22;
  --brand-dark: #7A3F12;
  --brand-soft: #F3C27A;
  --ai: #2F7D6D;
  --ai-dark: #194E45;
  --ink-blue: #23344D;
  --coral: #C95F43;
  --success: #2E8A57;

  --wa: #25D366;
  --ig: #C13584;
  --fb: #1877F2;

  --shadow-sm: 0 8px 24px rgba(52, 34, 18, 0.08);
  --shadow-md: 0 18px 48px rgba(52, 34, 18, 0.12);
  --shadow-lg: 0 28px 80px rgba(52, 34, 18, 0.16);

  --radius: 8px;
  --radius-lg: 12px;
  --max: 1180px;
}
```

### 1.3 Fondo global

```scss
body {
  margin: 0;
  min-width: 320px;
  overflow-x: hidden;
  color: var(--text);
  background:
    linear-gradient(180deg, rgba(255, 253, 248, 0.72), rgba(251, 244, 232, 0.94) 42%, var(--bg)),
    radial-gradient(circle at 12% 8%, rgba(243, 194, 122, 0.36), transparent 28%),
    radial-gradient(circle at 86% 0%, rgba(47, 125, 109, 0.12), transparent 30%),
    linear-gradient(135deg, rgba(35, 52, 77, 0.05), transparent 38%),
    var(--bg);
}
```

### 1.4 Aplicación por componente

| Componente | Aplicación exacta |
|---|---|
| `.nav` | Fondo `rgba(255,253,248,.88)`, borde `--line`, sombra `--shadow-sm` |
| `.nav__brand strong` | `color: var(--brand)` |
| `.nav__cta` | Fondo `--brand`, texto blanco |
| `.hero` | Fondo claro, imagen real y overlay crema |
| `.eyebrow` | `color: var(--brand-dark)`, uppercase, sin monospace salvo datos técnicos |
| `.btn--primary` | Fondo `--brand`, hover `--brand-dark`, texto blanco |
| `.btn--secondary` | Fondo `--surface`, borde `--line`, texto `--text` |
| `.service-card` | Fondo `--surface`, borde `--line`, sombra `--shadow-sm` |
| `.service-card:hover` | Borde `--line-strong`, translateY `-3px` |
| `.service-card__cat` | `color: var(--ai-dark)` |
| `.service-card__price` | `color: var(--brand-dark)` |
| `.pricing-card.recommended` | Fondo `linear-gradient(180deg, #FFF8EB, #FFFDF8)`, borde `--brand` |
| `.pricing-badge` | Fondo `--brand`, texto blanco |
| `.problem-card span` | `background: var(--coral)` |
| `.case-result strong` | `color: var(--ai-dark)` |
| `.lead-form` | Fondo `--surface`, inputs blancos |
| `.app-footer` | Fondo `--ink-blue`, texto `#FFFDF8`, links `#EED7B8` |

### 1.5 Botones y cards base

```scss
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  gap: 8px;
  padding: 0 18px;
  border-radius: var(--radius);
  font-weight: 760;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform .2s ease, border-color .2s ease, background .2s ease, box-shadow .2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &--primary {
    background: var(--brand);
    color: #fff;
    box-shadow: 0 18px 42px rgba(184, 107, 34, .28);

    &:hover {
      background: var(--brand-dark);
      box-shadow: 0 22px 52px rgba(122, 63, 18, .28);
    }
  }

  &--secondary {
    background: rgba(255, 253, 248, .88);
    border-color: var(--line);
    color: var(--text);
  }
}

.service-card,
.pricing-card,
.case-card,
.usecase-card,
.problem-card,
.roi-result-card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
}
```

## 2. Logo SVG para Agenc-IA

Concepto: chip + red neuronal + monograma `IA`. El chip comunica automatización; los nodos comunican flujos conectados; el color cobre mantiene la marca cálida; el verde petróleo conserva la señal IA/tecnología.

Usar este SVG en `AppLayout.vue` y footer. Si se crea componente, guardarlo como `src/components/brand/AgencLogo.vue`.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="64" viewBox="0 0 280 64" role="img" aria-labelledby="agenciaLogoTitle">
  <title id="agenciaLogoTitle">Agenc-IA</title>
  <defs>
    <linearGradient id="agenciaCopper" x1="8" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#F3C27A"/>
      <stop offset="0.52" stop-color="#B86B22"/>
      <stop offset="1" stop-color="#7A3F12"/>
    </linearGradient>
    <linearGradient id="agenciaTeal" x1="16" y1="48" x2="54" y2="14" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#194E45"/>
      <stop offset="1" stop-color="#2F7D6D"/>
    </linearGradient>
    <filter id="agenciaShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#342212" flood-opacity="0.14"/>
    </filter>
  </defs>

  <g id="agencia-mark" filter="url(#agenciaShadow)">
    <rect x="6" y="6" width="52" height="52" rx="14" fill="#FFFDF8" stroke="#EED7B8" stroke-width="1.5"/>
    <rect x="13" y="13" width="38" height="38" rx="10" fill="url(#agenciaCopper)"/>

    <path d="M22 23h20M22 41h20M23 22v20M41 22v20" stroke="#FFF8EB" stroke-opacity="0.58" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M22 32h-7M49 32h-7M32 22v-7M32 49v-7" stroke="#B86B22" stroke-width="2" stroke-linecap="round"/>

    <path d="M23 39c5-12 13-12 18 0" fill="none" stroke="#FFFDF8" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M25 34c2.4-4 5.2-6 8.1-6 3 0 5.8 2 8.1 6" fill="none" stroke="#FFFDF8" stroke-opacity="0.78" stroke-width="2" stroke-linecap="round"/>

    <circle cx="21" cy="26" r="3.2" fill="#FFFDF8"/>
    <circle cx="43" cy="26" r="3.2" fill="#FFFDF8"/>
    <circle cx="32" cy="43" r="3.2" fill="#FFFDF8"/>
    <path d="M24 27l6 13M40 27l-6 13M24.5 26h15" stroke="url(#agenciaTeal)" stroke-width="1.8" stroke-linecap="round"/>

    <text x="25.2" y="36.2" fill="#194E45" font-family="Inter, Arial, sans-serif" font-size="10" font-weight="900" letter-spacing=".4">IA</text>
  </g>

  <path d="M75 18h1.5c2.5 0 4.4 1.9 4.4 4.4v19.2c0 2.5-1.9 4.4-4.4 4.4H75" fill="none" stroke="#EED7B8" stroke-width="1.5" stroke-linecap="round"/>

  <text x="88" y="39" font-family="Inter, Arial, sans-serif" font-size="30" font-weight="850" letter-spacing="-0.3" fill="#211A14">
    Agenc<tspan fill="#B86B22">-IA</tspan>
  </text>
  <text x="90" y="53" font-family="Inter, Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="1.9" fill="#665A4A">
    AGENTES PARA VENDER 24/7
  </text>
</svg>
```

Uso recomendado:

```vue
<RouterLink class="nav__brand" to="/" aria-label="Agenc-IA inicio">
  <AgencLogo class="nav__logo" />
</RouterLink>
```

## 3. Sistema de iconos Lucide

Lucide es suficiente. No usar emojis para servicios ni pricing. No instalar otra librería si se puede evitar: copiar SVG inline de los iconos usados o crear un `Icon.vue` local. Si el equipo prefiere imports directos, `lucide-vue-next` es aceptable, pero no necesario para el plan.

### 3.1 Iconos por servicio

| Servicio actual | Icono Lucide | Color |
|---|---|---:|
| Agente de ventas por WhatsApp | `MessageCircle` | `--wa` |
| Agente de Instagram DMs | `MessagesSquare` | `--ig` |
| Funnel Meta Completo | `Funnel` | `--fb` |
| Recuperación de leads fríos | `RefreshCcw` | `--brand` |
| Agente de atención al cliente | `Headphones` | `--ai` |
| Moderador inteligente de comunidad | `ShieldCheck` | `--coral` |
| E-commerce conversacional | `ShoppingCart` | `--brand` |
| Agente de comentarios FB/IG | `MessageSquare` | `--ig` |
| Social Media Agent | `CalendarDays` | `--fb` |
| Automatización n8n + CRM | `Workflow` | `--ai` |
| Web funnel listo para IA | `Globe` | `--ink-blue` |
| Agendamiento automático | `CalendarCheck` | `--success` |
| Dashboard comercial y social | `LayoutDashboard` | `--ai-dark` |
| Agente documental / backoffice | `FileText` | `--ink-blue` |
| Consultoría IA y roadmap | `Lightbulb` | `--brand` |

### 3.2 Iconos por feature de pricing

| Feature o límite | Icono |
|---|---|
| 1 agente IA / agentes ilimitados | `Bot` |
| Conversaciones al mes | `MessagesSquare` |
| Flujo n8n / flujos ilimitados | `Workflow` |
| Soporte por WhatsApp | `MessageCircle` |
| Ajustes de guion | `SlidersHorizontal` |
| Reporte mensual | `ChartNoAxesCombined` |
| Integración CRM | `Handshake` |
| Dashboard comercial | `LayoutDashboard` |
| Soporte 24/7 | `Clock` |
| Moderación FB/IG | `ShieldCheck` |
| Templates HSM | `BadgeCheck` |
| Integración CRM/ERP/API | `PlugZap` |
| SLA | `Timer` |
| Account manager dedicado | `CircleUserRound` |
| Entrenamiento de equipo | `GraduationCap` |
| RAG con datos propios | `Brain` |
| E-commerce conversacional | `Store` |
| Costos de Meta no incluidos | `CircleAlert` |
| Canales adicionales | `CirclePlus` |
| Setup único | `Wallet` |
| Cotización personalizada | `FileText` |

### 3.3 Iconos por sección

| Sección | Icono |
|---|---|
| Hero | `Sparkles` + `Brain` |
| TrustBar | `BadgeCheck` |
| El problema | `TriangleAlert` |
| Ecosistema Meta | `Share2` |
| Servicios | `LayoutGrid` |
| Industrias | `Building2` |
| Demo interactiva | `Play` |
| Casos | `BriefcaseBusiness` |
| Stats | `TrendingUp` |
| ROI | `Calculator` |
| Pricing | `Wallet` |
| Comparación | `Scale` |
| FAQ | `CircleQuestionMark` |
| Contacto | `Send` |
| Sobre Nosotros | `UsersRound` |

### 3.4 Mapa real para el repo

```ts
// src/data/iconMaps.ts
export const serviceIconById = {
  'whatsapp-sales-agent': 'MessageCircle',
  'instagram-dm-agent': 'MessagesSquare',
  'facebook-lead-ad-funnel': 'Funnel',
  'cold-lead-recovery': 'RefreshCcw',
  'customer-support-agent': 'Headphones',
  'smart-moderation': 'ShieldCheck',
  'conversational-ecommerce': 'ShoppingCart',
  'social-comments-agent': 'MessageSquare',
  'social-media-agent': 'CalendarDays',
  'n8n-crm-automation': 'Workflow',
  'web-funnel-ai': 'Globe',
  'auto-scheduling': 'CalendarCheck',
  'commercial-dashboard': 'LayoutDashboard',
  'document-backoffice-agent': 'FileText',
  'ia-consulting-roadmap': 'Lightbulb'
} as const

export const sectionIcons = {
  hero: 'Sparkles',
  trust: 'BadgeCheck',
  problem: 'TriangleAlert',
  ecosystem: 'Share2',
  services: 'LayoutGrid',
  industries: 'Building2',
  demo: 'Play',
  cases: 'BriefcaseBusiness',
  stats: 'TrendingUp',
  roi: 'Calculator',
  pricing: 'Wallet',
  comparison: 'Scale',
  faq: 'CircleQuestionMark',
  contact: 'Send',
  about: 'UsersRound'
} as const
```

## 4. Estrategia de imágenes

Regla: cada imagen debe probar una situación real de negocio. Evitar fotos oscuras, abstractas o de personas apuntando a pantallas. Usar imágenes de negocios, screenshots propios y mockups de producto.

### 4.1 Dónde usar imágenes

| Ubicación | Tipo | Archivo sugerido |
|---|---|---|
| Home hero | Foto cálida de negocio + mockup de WhatsApp/CRM | `public/images/hero/hero-negocio-whatsapp.webp` |
| Servicios hero | Collage de canales Meta y CRM | `public/images/hero/servicios-canales-meta.webp` |
| Caso Auto Sales | Concesionario + screenshot bot | `public/images/cases/auto-sales.webp` |
| Restaurante | Cocina o salón con reservas | `public/images/cases/restaurant.webp` |
| Clínica | Recepción o agenda clínica | `public/images/cases/clinic.webp` |
| Inmobiliaria | Asesor mostrando inmueble | `public/images/cases/real-estate.webp` |
| Demo interactiva | Screenshot propio de chat | `public/images/product/chat-demo-sales.webp` |
| ROI/Pricing | Dashboard propio | `public/images/product/dashboard-roi.webp` |
| Sobre Nosotros | Foto fundador/equipo | `public/images/about/daniel-founder.webp` |

### 4.2 Fuentes y URLs de ejemplo

Usar estas URLs como búsqueda, no como descarga automática:

- Negocios colombianos: `https://unsplash.com/s/photos/colombia-business`
- Dueños de negocio: `https://unsplash.com/s/photos/small-business-owner`
- Concesionario/ventas: `https://unsplash.com/s/photos/car-dealership-salesperson`
- Restaurante operativo: `https://www.pexels.com/search/restaurant%20owner%20laptop/`
- Clínica/recepción: `https://www.pexels.com/search/clinic%20reception/`
- E-commerce/packing: `https://unsplash.com/s/photos/ecommerce-packaging`
- Mockups dashboard: `https://dribbble.com/search/saas-dashboard`
- WhatsApp Business Platform: `https://business.whatsapp.com/products/business-platform`

### 4.3 Screenshots propios del bot

Prioridad: screenshots reales o mockups propios. No usar datos de clientes reales.

Guion para screenshot Auto Sales:

- Cliente: "Laura Gómez"
- Mensaje: "Hola, busco un carro automático hasta 45 millones."
- Bot: "Perfecto. ¿Ciudad, uso principal y financiación?"
- Cliente: "Bucaramanga, familiar, podría financiar."
- Resumen: "Lead caliente 86/100, CRM creado, vendedor alertado."

Exportar como WebP a:

```text
public/images/product/whatsapp-auto-sales.webp
public/images/product/crm-lead-summary.webp
public/images/product/dashboard-meta-leads.webp
```

### 4.4 Prompts para imágenes generadas

Hero:

```text
Fotografía editorial realista de una pequeña empresa colombiana moderna, luz cálida de mañana, dueño revisando mensajes de WhatsApp Business en un laptop, ambiente profesional y cercano, tonos crema y madera clara, sin texto legible, sin logos de marcas, profundidad de campo suave, estilo consultoría tecnológica premium.
```

Auto Sales:

```text
Fotografía realista de concesionario de carros usados en Colombia, vendedor latino con tablet revisando leads, fila de vehículos limpios, luz natural cálida, estética profesional, sin logos visibles, composición horizontal para web.
```

Sobre Nosotros:

```text
Retrato profesional de fundador latino de agencia de automatización IA, fondo de oficina cálida, laptop con dashboard desenfocado, luz natural, expresión confiable, composición vertical, sin texto ni logos.
```

### 4.5 Tratamiento CSS de imágenes

```scss
.media-frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(68, 45, 24, .12);
  background: var(--surface);
  box-shadow: var(--shadow-md);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 54%, rgba(33, 26, 20, .18));
    pointer-events: none;
  }
}
```

## 5. Plan de animaciones GSAP

### 5.1 Composable base

Crear `src/composables/useBrandMotion.ts` para no repetir animaciones por página.

```ts
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useBrandMotion(rootSelector = 'body') {
  let ctx: gsap.Context | null = null

  onMounted(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    ctx = gsap.context(() => {
      setupReveal()
      setupParallaxImages()
      setupSectionLines()
    }, rootSelector)
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}

function setupReveal() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 28,
      autoAlpha: 0,
      duration: .75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 84%',
        once: true
      }
    })
  })
}

function setupParallaxImages() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.fromTo(el, { yPercent: -6 }, {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  })
}

function setupSectionLines() {
  gsap.utils.toArray<HTMLElement>('[data-line]').forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: .8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 86%',
        once: true
      }
    })
  })
}
```

### 5.2 Hero

Animaciones:

- H1 por líneas.
- Burbujas WhatsApp en cascada.
- Tarjeta CRM entrando desde la derecha.
- Línea SVG dibujada con `strokeDashoffset`.
- Foto con parallax.
- Blob cálido morfeando con `borderRadius`, sin plugins extra.

```ts
export function setupHeroMotion() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.hero__eyebrow', { y: 16, autoAlpha: 0, duration: .45 })
    .from('.hero__title-line', { yPercent: 110, duration: .8, stagger: .08 }, '-=.1')
    .from('.hero__lead', { y: 18, autoAlpha: 0, duration: .55 }, '-=.35')
    .from('.hero__actions .btn', { y: 14, autoAlpha: 0, duration: .42, stagger: .08 }, '-=.25')
    .from('.hero-product', { y: 32, rotate: -1.5, autoAlpha: 0, duration: .75 }, '-=.45')
    .from('.hero-chat .bubble', { x: 24, autoAlpha: 0, duration: .38, stagger: .16 }, '-=.2')
    .from('.hero-crm-card', { x: -24, autoAlpha: 0, duration: .5 }, '-=.25')

  gsap.to('.hero-photo img', {
    yPercent: 7,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  })

  gsap.to('.hero-blob', {
    borderRadius: '42% 58% 48% 52% / 52% 44% 56% 48%',
    scale: 1.05,
    duration: 5,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  })

  const connector = document.querySelector<SVGPathElement>('.hero-connector path')
  if (connector) {
    const length = connector.getTotalLength()
    gsap.set(connector, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(connector, {
      strokeDashoffset: 0,
      duration: .9,
      ease: 'power2.out',
      delay: 1.1
    })
  }
}
```

### 5.3 Nav

```ts
export function setupNavMotion() {
  gsap.from('.nav', { y: -18, autoAlpha: 0, duration: .55, ease: 'power3.out' })

  ScrollTrigger.create({
    start: 'top -40',
    end: 99999,
    toggleClass: { targets: '.nav', className: 'nav--scrolled' }
  })
}
```

CSS dropdown:

```scss
.nav__dropdown {
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
  clip-path: inset(0 0 12% 0 round 12px);
  transition: opacity .18s ease, transform .18s ease, clip-path .18s ease;
}

.nav__item:hover .nav__dropdown,
.nav__item:focus-within .nav__dropdown {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
  clip-path: inset(0 0 0 0 round 12px);
}
```

### 5.4 Problema

```ts
gsap.utils.toArray<HTMLElement>('.problem-card').forEach((card, i) => {
  gsap.from(card, {
    y: 36,
    autoAlpha: 0,
    duration: .55,
    delay: i * .06,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 86%',
      once: true
    }
  })

  gsap.from(card.querySelector('.problem-card__line'), {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: .5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 86%',
      once: true
    }
  })
})
```

### 5.5 Ecosistema Meta

Convertir las cuatro cards en un mapa:

- Izquierda: WhatsApp, Instagram, Facebook.
- Centro: Agenc-IA.
- Derecha: CRM, n8n, Dashboard.
- Líneas SVG animadas.

```ts
export function setupEcosystemMotion() {
  gsap.from('.ecosystem-node', {
    scale: .86,
    autoAlpha: 0,
    duration: .5,
    stagger: .08,
    ease: 'back.out(1.4)',
    scrollTrigger: {
      trigger: '.ecosystem-map',
      start: 'top 76%',
      once: true
    }
  })

  document.querySelectorAll<SVGPathElement>('.ecosystem-line').forEach((path) => {
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: .8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.ecosystem-map',
        start: 'top 72%',
        once: true
      }
    })
  })
}
```

### 5.6 Servicios

Al cambiar filtro, animar solo las cards visibles:

```ts
import { nextTick } from 'vue'
import { gsap } from 'gsap'

async function animateServiceFilter() {
  await nextTick()
  gsap.fromTo('.service-card',
    { y: 18, autoAlpha: 0, scale: .98 },
    { y: 0, autoAlpha: 1, scale: 1, duration: .36, stagger: .035, ease: 'power2.out' }
  )
}
```

```vue
<button
  v-for="cat in cats"
  :key="cat.key"
  class="filter-chip"
  :class="{ active: activeFilter === cat.key }"
  @click="activeFilter = cat.key; animateServiceFilter()"
>
  {{ cat.label }}
</button>
```

### 5.7 Demo interactiva

Usar hooks reales de `TransitionGroup`:

```vue
<TransitionGroup
  name="msg"
  @before-enter="beforeMsgEnter"
  @enter="msgEnter"
>
  <p v-for="(msg, i) in visibleMessages" :key="i" class="bubble" :class="'bubble--' + msg.role">
    {{ msg.text }}
  </p>
</TransitionGroup>
```

```ts
function beforeMsgEnter(el: Element) {
  gsap.set(el, { y: 14, autoAlpha: 0, scale: .98 })
}

function msgEnter(el: Element, done: () => void) {
  gsap.to(el, {
    y: 0,
    autoAlpha: 1,
    scale: 1,
    duration: .32,
    ease: 'power2.out',
    onComplete: done
  })
}
```

### 5.8 Casos de estudio

```ts
gsap.utils.toArray<HTMLElement>('.case-card').forEach((card) => {
  gsap.from(card.querySelector('.case-card__media img'), {
    yPercent: -6,
    ease: 'none',
    scrollTrigger: {
      trigger: card,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })

  gsap.from(card.querySelector('.case-quote'), {
    clipPath: 'inset(0 0 100% 0)',
    autoAlpha: 0,
    duration: .55,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 72%',
      once: true
    }
  })
})
```

### 5.9 ROI

```ts
watch(roiResult, () => {
  gsap.fromTo('.roi-result-card.highlight',
    { scale: .985, boxShadow: '0 0 0 rgba(184,107,34,0)' },
    {
      scale: 1,
      boxShadow: '0 18px 48px rgba(184,107,34,.18)',
      duration: .32,
      ease: 'power2.out'
    }
  )
})
```

### 5.10 Pricing

```ts
gsap.from('.pricing-card', {
  y: 34,
  autoAlpha: 0,
  duration: .62,
  stagger: .09,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.pricing-grid',
    start: 'top 80%',
    once: true
  }
})

gsap.from('.pricing-card.recommended .pricing-features li', {
  x: -10,
  autoAlpha: 0,
  duration: .3,
  stagger: .035,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.pricing-card.recommended',
    start: 'top 76%',
    once: true
  }
})
```

### 5.11 Page transitions

```vue
<RouterView v-slot="{ Component }">
  <Transition mode="out-in" @enter="pageEnter" @leave="pageLeave">
    <component :is="Component" />
  </Transition>
</RouterView>
```

```ts
function pageLeave(el: Element, done: () => void) {
  gsap.to(el, {
    autoAlpha: 0,
    y: 10,
    duration: .18,
    ease: 'power1.in',
    onComplete: done
  })
}

function pageEnter(el: Element, done: () => void) {
  gsap.fromTo(el,
    { autoAlpha: 0, y: 12 },
    { autoAlpha: 1, y: 0, duration: .32, ease: 'power2.out', onComplete: done }
  )
}
```

## 6. Nueva página "Sobre Nosotros"

Ruta: `/sobre-nosotros`

Archivo: `src/pages/AboutPage.vue`

Objetivo: explicar quién está detrás, cómo se trabaja y por qué Agenc-IA no vende bots genéricos sino sistemas operativos conversacionales.

### 6.1 Estructura

1. Hero:
   - Eyebrow: `Sobre Agenc-IA`
   - H1: `Automatización conversacional para negocios que necesitan vender, no jugar con bots.`
   - Subtítulo: `Diseñamos agentes IA conectados a WhatsApp, Instagram, Facebook, CRM y n8n para que las PYMES colombianas respondan más rápido, vendan mejor y midan cada conversación.`

2. Perfil:
   - Título: `Liderado por criterio técnico y foco comercial`
   - Copy: `Agenc-IA nace para resolver un problema concreto: los negocios ya reciben demanda por redes, pero la operación manual no alcanza a responder, registrar y hacer seguimiento.`

3. Principios:
   - Primero negocio, después IA.
   - Handoff humano claro.
   - Medición desde el día uno.

4. Método:
   - Diagnóstico.
   - Diseño de flujo.
   - Implementación.
   - Entrenamiento.
   - Medición y mejora.

5. Stack:
   - WhatsApp Business Cloud API, Instagram Messaging, Facebook Lead Ads, Meta Webhooks, n8n, OpenAI GPT, Google Sheets, Looker Studio, HubSpot, Zoho CRM, Vue, Vercel.

6. Caso destacado:
   - Auto Sales AI OS.
   - Métricas: `<30s`, `3x`, `$1.2M`, `85%`.

### 6.2 Vue real

```vue
<script setup lang="ts">
const principles = [
  {
    title: 'Primero negocio, después IA',
    text: 'Un agente solo sirve si recupera ventas, libera horas o mejora atención. Si no mueve una métrica, no se construye.'
  },
  {
    title: 'Handoff humano claro',
    text: 'El sistema responde y clasifica, pero sabe cuándo avisar a una persona. La IA no debe bloquear una venta compleja.'
  },
  {
    title: 'Medición desde el día uno',
    text: 'Cada flujo registra origen, intención, estado y próxima acción. Sin datos, no hay mejora.'
  }
]

const method = [
  'Diagnóstico de canales y fugas',
  'Diseño conversacional por negocio',
  'Integración con Meta, n8n y CRM',
  'Pruebas con conversaciones reales',
  'Dashboard y mejora mensual'
]

const stack = [
  'WhatsApp Business Cloud API',
  'Instagram Messaging',
  'Facebook Lead Ads',
  'Meta Webhooks',
  'n8n',
  'OpenAI GPT',
  'Google Sheets',
  'Looker Studio',
  'HubSpot',
  'Zoho CRM',
  'Vue',
  'Vercel'
]
</script>

<template>
  <div class="page-about">
    <section class="about-hero">
      <div class="about-hero__copy" data-reveal>
        <p class="eyebrow">Sobre Agenc-IA</p>
        <h1>Automatización conversacional para negocios que necesitan vender, no jugar con bots.</h1>
        <p>
          Diseñamos agentes IA conectados a WhatsApp, Instagram, Facebook, CRM y n8n
          para que las PYMES colombianas respondan más rápido, vendan mejor y midan cada conversación.
        </p>
      </div>
      <figure class="about-hero__media media-frame" data-reveal>
        <img src="/images/about/daniel-founder.webp" alt="Fundador de Agenc-IA revisando un dashboard de automatización" data-parallax>
      </figure>
    </section>

    <section class="section section--split">
      <div data-reveal>
        <p class="eyebrow">Cómo pensamos</p>
        <h2>La IA es útil cuando queda conectada a una operación real.</h2>
      </div>
      <div class="principle-list">
        <article v-for="p in principles" :key="p.title" class="principle-card" data-reveal>
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </article>
      </div>
    </section>

    <section class="section about-method">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Método</p>
        <h2>De fuga de mensajes a sistema medible.</h2>
      </div>
      <ol class="method-steps">
        <li v-for="(step, i) in method" :key="step" data-reveal>
          <span>{{ String(i + 1).padStart(2, '0') }}</span>
          <strong>{{ step }}</strong>
        </li>
      </ol>
    </section>

    <section class="section about-stack">
      <div class="section__head" data-reveal>
        <p class="eyebrow">Stack</p>
        <h2>Tecnología conocida, conectada con criterio.</h2>
      </div>
      <div class="stack-grid">
        <span v-for="item in stack" :key="item" class="stack-chip" data-reveal>{{ item }}</span>
      </div>
    </section>

    <section class="section about-case">
      <div class="about-case__content" data-reveal>
        <p class="eyebrow">Caso destacado</p>
        <h2>Auto Sales AI OS</h2>
        <p>
          Agente de ventas por WhatsApp para concesionarios: califica presupuesto, ciudad,
          urgencia y financiación; luego entrega un resumen con puntaje al vendedor.
        </p>
      </div>
      <div class="case-results" data-reveal>
        <div class="case-result"><strong>&lt;30s</strong><span>primera respuesta</span></div>
        <div class="case-result"><strong>3x</strong><span>leads calificados</span></div>
        <div class="case-result"><strong>$1.2M</strong><span>ahorro mensual estimado</span></div>
        <div class="case-result"><strong>85%</strong><span>consultas atendidas 24/7</span></div>
      </div>
    </section>

    <section class="section cta-section" data-reveal>
      <h2>Hablemos de tu canal más lento.</h2>
      <p>En 20 minutos identificamos dónde se pierden leads y qué flujo conviene automatizar primero.</p>
      <RouterLink to="/contacto" class="btn btn--primary">Agendar diagnóstico</RouterLink>
    </section>
  </div>
</template>
```

Ruta:

```ts
import AboutPage from './pages/AboutPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/servicios', name: 'services', component: ServicesPage },
  { path: '/casos', name: 'cases', component: CasesPage },
  { path: '/precios', name: 'pricing', component: PricingPage },
  { path: '/sobre-nosotros', name: 'about', component: AboutPage },
  { path: '/contacto', name: 'contact', component: ContactPage }
]
```

## 7. Rediseño del hero

### 7.1 Decisión

Reemplazar el hero actual con una escena de producto. El usuario debe entender en los primeros 5 segundos:

- Esto automatiza WhatsApp, Instagram y Facebook.
- Hay CRM/dashboard, no solo chatbot.
- Está pensado para negocios colombianos.
- El resultado es comercial: respuesta rápida, lead calificado y vendedor alertado.

### 7.2 Copy nuevo

```ts
const hero = {
  badge: 'IA operativa para canales Meta',
  title: 'Convierte mensajes sueltos en ventas registradas.',
  lead: 'Agenc-IA responde, califica, registra y avisa a tu equipo cuando hay una oportunidad real. Para PYMES colombianas que venden por WhatsApp, Instagram y Facebook.',
  primaryCta: 'Agendar diagnóstico',
  secondaryCta: 'Ver caso Auto Sales'
}
```

### 7.3 Estructura Vue

```vue
<section class="hero hero--brand">
  <div class="hero__bg">
    <figure class="hero-photo">
      <img src="/images/hero/hero-negocio-whatsapp.webp" alt="Negocio colombiano atendiendo mensajes de clientes con Agenc-IA" data-parallax>
    </figure>
    <div class="hero-blob" aria-hidden="true"></div>
  </div>

  <div class="hero__inner">
    <div class="hero__copy">
      <p class="eyebrow hero__eyebrow">{{ heroBadge }}</p>
      <h1>
        <span class="hero__title-line">Convierte mensajes sueltos</span>
        <span class="hero__title-line">en ventas registradas.</span>
      </h1>
      <p class="hero__lead">{{ heroLead }}</p>
      <div class="hero__actions">
        <RouterLink to="/contacto" class="btn btn--primary">{{ primaryCta }}</RouterLink>
        <RouterLink to="/casos" class="btn btn--secondary">{{ secondaryCta }}</RouterLink>
      </div>
      <div class="hero-trust">
        <span>Meta Cloud API</span>
        <span>n8n</span>
        <span>CRM</span>
        <span>Dashboard</span>
      </div>
    </div>

    <aside class="hero-product" aria-label="Demo visual de Agenc-IA">
      <div class="hero-phone hero-chat">
        <div class="hero-phone__top">
          <span class="status-dot"></span>
          <strong>WhatsApp</strong>
        </div>
        <p class="bubble bubble--client">Hola, busco un carro automático hasta 45 millones.</p>
        <p class="bubble bubble--agent">Perfecto. ¿Ciudad, uso principal y financiación?</p>
        <p class="bubble bubble--client">Bucaramanga, familiar, podría financiar.</p>
      </div>

      <svg class="hero-connector" viewBox="0 0 220 80" aria-hidden="true">
        <path d="M8 18 C80 8 118 70 212 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <div class="hero-crm-card">
        <span>Lead caliente</span>
        <strong>86/100</strong>
        <small>CRM creado, vendedor alertado</small>
      </div>
    </aside>
  </div>
</section>
```

### 7.4 SCSS del hero

```scss
.hero--brand {
  position: relative;
  min-height: 92svh;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: var(--text);

  .hero__bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .hero-photo {
    position: absolute;
    inset: 0 0 0 48%;
    margin: 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 108%;
      object-fit: cover;
      object-position: center;
      filter: saturate(.96) contrast(.98);
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, var(--bg) 0%, rgba(251,244,232,.82) 22%, rgba(251,244,232,.18) 62%),
        linear-gradient(180deg, transparent 70%, var(--bg));
    }
  }

  .hero-blob {
    position: absolute;
    width: 440px;
    height: 360px;
    right: 8%;
    top: 16%;
    border-radius: 58% 42% 52% 48% / 48% 54% 46% 52%;
    background: linear-gradient(135deg, rgba(243,194,122,.44), rgba(47,125,109,.18));
    filter: blur(8px);
    opacity: .72;
  }

  .hero__inner {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 430px;
    gap: 64px;
    align-items: center;
    width: min(var(--max), calc(100% - 40px));
    margin: 0 auto;
    padding: 126px 0 72px;
  }

  .hero__title-line {
    display: block;
    overflow: hidden;
  }

  .hero-product {
    position: relative;
    min-height: 500px;
  }

  .hero-phone,
  .hero-crm-card {
    background: rgba(255,253,248,.92);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(18px);
  }

  .hero-phone {
    width: min(100%, 340px);
    padding: 18px;
  }

  .hero-crm-card {
    position: absolute;
    right: 0;
    bottom: 48px;
    width: 240px;
    padding: 18px;
    display: grid;
    gap: 4px;

    span { color: var(--ai-dark); font-size: .78rem; font-weight: 800; text-transform: uppercase; }
    strong { color: var(--brand-dark); font-size: 2.6rem; line-height: 1; }
    small { color: var(--muted); }
  }

  .hero-connector {
    position: absolute;
    left: 124px;
    bottom: 140px;
    width: 220px;
    color: var(--brand);
  }
}
```

## 8. Rediseño del nav profesional

### 8.1 Arquitectura

Desktop:

- Logo.
- Servicios con mega menú.
- Casos.
- Precios.
- Sobre Nosotros.
- Contacto.
- CTA: `Diagnóstico gratis`.

Mobile:

- Botón menú.
- Servicios como acordeón con links.
- CTA fijo al final.

### 8.2 Data structure

```ts
const navGroups = [
  {
    label: 'Servicios',
    columns: [
      {
        title: 'Ventas',
        links: [
          { to: '/servicios#whatsapp-sales-agent', label: 'Agente WhatsApp', desc: 'Califica y avisa al vendedor' },
          { to: '/servicios#instagram-dm-agent', label: 'Instagram DMs', desc: 'Responde DMs y stories' },
          { to: '/servicios#facebook-lead-ad-funnel', label: 'Funnel Meta', desc: 'Lead Ads a WhatsApp' },
          { to: '/servicios#cold-lead-recovery', label: 'Recuperación', desc: 'Seguimiento sin saturar' }
        ]
      },
      {
        title: 'Operación',
        links: [
          { to: '/servicios#customer-support-agent', label: 'Atención al cliente', desc: 'Soporte 24/7' },
          { to: '/servicios#n8n-crm-automation', label: 'n8n + CRM', desc: 'Flujos con trazabilidad' },
          { to: '/servicios#auto-scheduling', label: 'Agendamiento', desc: 'Reservas y recordatorios' },
          { to: '/servicios#commercial-dashboard', label: 'Dashboard', desc: 'KPIs de ventas y social' }
        ]
      },
      {
        title: 'Crecimiento',
        links: [
          { to: '/servicios#conversational-ecommerce', label: 'E-commerce conversacional', desc: 'Catálogo y pedidos por chat' },
          { to: '/servicios#social-comments-agent', label: 'Comentarios FB/IG', desc: 'Comentarios a DM' },
          { to: '/servicios#social-media-agent', label: 'Social Media Agent', desc: 'Publica y mide' },
          { to: '/servicios#ia-consulting-roadmap', label: 'Roadmap IA', desc: 'Plan 30/60/90 días' }
        ]
      }
    ]
  }
]
```

### 8.3 Vue

```vue
<header class="nav">
  <RouterLink class="nav__brand" to="/" aria-label="Agenc-IA inicio">
    <AgencLogo />
  </RouterLink>

  <nav class="nav__links" aria-label="Navegación principal">
    <div class="nav__item">
      <button class="nav__trigger" type="button">
        Servicios
        <Icon name="ChevronDown" />
      </button>
      <div class="nav__dropdown nav-mega">
        <div v-for="col in navGroups[0].columns" :key="col.title" class="nav-mega__col">
          <strong>{{ col.title }}</strong>
          <RouterLink v-for="link in col.links" :key="link.to" :to="link.to" class="nav-mega__link">
            <span>{{ link.label }}</span>
            <small>{{ link.desc }}</small>
          </RouterLink>
        </div>
      </div>
    </div>

    <RouterLink to="/casos">Casos</RouterLink>
    <RouterLink to="/precios">Precios</RouterLink>
    <RouterLink to="/sobre-nosotros">Sobre Nosotros</RouterLink>
    <RouterLink to="/contacto" class="nav__cta">Diagnóstico gratis</RouterLink>
  </nav>

  <button class="nav__hamburger" aria-label="Menú" @click="mobileOpen = !mobileOpen">
    <Icon name="Menu" />
  </button>
</header>
```

### 8.4 SCSS

```scss
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(var(--max), calc(100% - 32px));
  margin: 14px auto 0;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: rgba(255, 253, 248, .88);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(18px);

  &--scrolled {
    background: rgba(255, 253, 248, .94);
    box-shadow: var(--shadow-md);
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__links > a,
  &__trigger {
    min-height: 38px;
    padding: 0 12px;
    border: 0;
    background: transparent;
    color: var(--muted);
    border-radius: var(--radius);
    font-size: .86rem;
    font-weight: 720;
    text-decoration: none;
    cursor: pointer;

    &:hover,
    &.router-link-active {
      color: var(--text);
      background: var(--surface-warm);
    }
  }

  &__cta {
    background: var(--brand) !important;
    color: #fff !important;
    margin-left: 4px;
  }
}

.nav__item {
  position: relative;
}

.nav-mega {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  width: min(860px, calc(100vw - 40px));
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-lg);
}

.nav-mega__col {
  display: grid;
  gap: 8px;

  > strong {
    color: var(--brand-dark);
    font-size: .78rem;
    text-transform: uppercase;
  }
}

.nav-mega__link {
  display: grid;
  gap: 2px;
  padding: 10px;
  border-radius: var(--radius);
  text-decoration: none;

  span {
    color: var(--text);
    font-size: .9rem;
    font-weight: 760;
  }

  small {
    color: var(--dim);
    line-height: 1.4;
  }

  &:hover {
    background: var(--surface-warm);
  }
}
```

## 9. Decisión sobre Three.js

Decisión: eliminar Three.js del hero. Reemplazar `AgentNetwork.vue` por escena DOM/SVG/imagen animada.

### 9.1 Razones

1. No muestra producto ni resultado de negocio.
2. Se ve técnico y genérico.
3. Choca con la nueva paleta crema.
4. Aumenta peso y complejidad sin mejorar conversión.
5. GSAP + SVG resuelven conectores, pulsos, parallax y counters con menos código.

### 9.2 Pasos

1. Quitar `import AgentNetwork from '../AgentNetwork.vue'` en `HeroSection.vue`.
2. Reemplazar `<AgentNetwork />` por `.hero__bg`, `.hero-photo`, `.hero-product`.
3. Verificar que `AgentNetwork.vue` no tenga referencias.
4. Eliminar `src/components/AgentNetwork.vue`.
5. Remover `three` y `@types/three` de `package.json`.
6. Actualizar solo un lockfile. El repo tiene `package-lock.json` y `pnpm-lock.yaml`; elegir npm o pnpm antes de tocar locks.

### 9.3 Cuándo mantenerlo

Solo si se crea una demo 3D real con valor comercial. Para V3, no mantenerlo como decoración.

## 10. Prioridad de implementación

### Fase 1 - Fundaciones visuales

Archivos:

- `src/styles/main.scss`
- `src/components/brand/AgencLogo.vue`
- `src/components/ui/Icon.vue`
- `src/data/iconMaps.ts`

Tareas:

1. Cambiar tokens de color.
2. Actualizar body, botones, cards, forms y footer.
3. Insertar logo SVG.
4. Agregar componente de icono mínimo.

Check:

- El sitio ya no se ve dark.
- Botones tienen contraste claro.
- Nav y cards se ven profesionales sobre fondo crema.

### Fase 2 - Hero y nav

Archivos:

- `src/components/sections/HeroSection.vue`
- `src/components/layout/AppLayout.vue`
- `src/styles/main.scss`

Tareas:

1. Reemplazar `AgentNetwork` por `hero-product`.
2. Agregar imagen hero en `public/images/hero/`.
3. Implementar mega menú de servicios.
4. Ajustar mobile menu con acordeón.

Check:

- Above the fold muestra producto, canales y promesa clara.
- CTA principal visible en desktop y mobile.
- No hay texto encima de imagen de forma ilegible.

### Fase 3 - Iconos e imágenes

Archivos:

- `src/components/sections/ServicesSection.vue`
- `src/components/sections/PricingSection.vue`
- `src/components/sections/CaseStudiesSection.vue`
- `src/components/sections/UseCasesSection.vue`
- `src/data/iconMaps.ts`

Tareas:

1. Agregar icono por servicio.
2. Reemplazar emojis de industrias por Lucide.
3. Agregar imagen por caso de estudio.
4. Reemplazar checks textuales de pricing por iconos.

Check:

- Los 15 servicios son escaneables.
- Pricing no parece una lista plana de texto.

### Fase 4 - Sobre Nosotros

Archivos:

- `src/pages/AboutPage.vue`
- `src/router.ts`
- `src/components/layout/AppLayout.vue`
- `src/styles/main.scss`

Tareas:

1. Crear ruta `/sobre-nosotros`.
2. Agregar link en nav y footer.
3. Crear hero, principios, método, stack y caso Auto Sales.
4. Agregar imagen founder/equipo.

Check:

- La página responde quién está detrás y por qué confiar.
- El stack conecta tecnología con operación, no solo logos.

### Fase 5 - Motion

Archivos:

- `src/composables/useBrandMotion.ts`
- `src/pages/HomePage.vue`
- `src/components/sections/InteractiveDemoSection.vue`
- `src/components/sections/RoiCalculatorSection.vue`
- `src/components/layout/AppLayout.vue`

Tareas:

1. Centralizar reveal/parallax/líneas.
2. Agregar animación hero.
3. Mejorar chat demo con hooks GSAP.
4. Agregar page transitions.
5. Respetar `prefers-reduced-motion`.

Check:

- Movimiento premium, no distracción.
- En mobile no hay saltos ni overlap.
- Con reduced motion el sitio sigue usable.

### Fase 6 - Limpieza Three.js

Archivos:

- `src/components/AgentNetwork.vue`
- `package.json`
- Lockfile elegido

Tareas:

1. Confirmar que `AgentNetwork` no se usa.
2. Eliminar archivo.
3. Remover dependencia Three.
4. Correr build.

Check:

```powershell
npm run build
```

o, si se estandariza pnpm:

```powershell
pnpm build
```

### Fase 7 - QA final

1. Desktop 1440x900.
2. Mobile 390x844.
3. Contraste de botones y texto sobre imágenes.
4. Dropdown con teclado.
5. Focus visible en formularios.
6. Rutas hash: `/`, `/servicios`, `/casos`, `/precios`, `/sobre-nosotros`, `/contacto`.

Orden final:

1. Tokens y CSS global.
2. Logo.
3. Hero.
4. Nav.
5. Iconos.
6. Imágenes.
7. Sobre Nosotros.
8. GSAP avanzado.
9. Eliminar Three.js.
10. QA responsive y build.
