# Contexto completo para Codex GPT-5.5 — Rediseño Agenc-IA

## Situación actual

Web multi-página desplegada en https://agenc-ia-topaz.vercel.app con Vue 3 + GSAP + Three.js + SCSS.

**Lo que está bien:**
- 15 servicios detallados con filtros
- Pricing en COP con 3 tiers
- 15 FAQs, 4 casos de estudio, calculadora ROI
- Integraciones organizadas por grupo
- Multi-página (Home, Servicios, Casos, Precios, Contacto)
- Nav + Footer comunes con Vue Router (hash mode)
- Three.js con nodos de canales Meta y pulsos de mensajes

**Lo que está MAL — y es lo que hay que arreglar:**
1. **Diseño demasiado genérico.** Todo es dark, verde/cyan, cards iguales. No tiene personalidad.
2. **Cero imágenes.** No hay una sola foto, ilustración, screenshot del producto. Solo texto y cards.
3. **Sin iconos.** No hay iconos en servicios, features, pricing. Todo es texto.
4. **Animaciones básicas.** Solo fade-up y stagger. Faltan animaciones ricas: parallax, morphing, video backgrounds, scroll-triggered reveals sofisticados.
5. **Colores planos.** Verde #4fffb0 y cyan #38d8ff sobre fondo #07110f. Muy "terminal". Necesita paleta más cálida y profesional.
6. **Sin logo.** Solo texto "Agenc-IA".
7. **Sin página "Sobre nosotros".** Falta equipo, misión, stack tecnológico.

## Lo que Daniel quiere

1. **Paleta de colores crema/cálida** — no dark mode puro. Más profesional, menos "hacker". Inspiración: crema + beige + detalles dorados/ámbar.
2. **Logo profesional** — Codex debe diseñar el logo (SVG).
3. **Imágenes** — screenshots reales del bot en acción (WhatsApp chat real), fotos de stock temáticas de negocios colombianos, ilustraciones.
4. **Iconos** — usar Lucide o Phosphor icons para servicios, features, planes.
5. **Animaciones avanzadas** — scroll-triggered reveals variados, parallax en imágenes, morphing en el hero, counter animations, smooth page transitions.
6. **Mejor organización** — menos texto por página, más respiración visual.
7. **Sección "Sobre Nosotros"** — con foto/perfil, stack, caso Auto Sales destacado.

## Referencias de diseño estudiadas

### 1. Automaxia (agenciaia.com.co) — LA REFERENCIA PRINCIPAL
- **Paleta**: Blanco/crema con acentos azul corporativo y naranja/dorado en CTAs
- **Layout**: Profesional, corporate pero cálido. Mega-menú con dropdowns por categoría
- **Imágenes**: Fotos de stock profesionales de negocios, ilustraciones de procesos IA
- **Secciones**: Hero con H1 claro + subtítulo + CTA · 6 ventajas con iconos · Metodología 4 fases · Tabs de tecnologías · Ciudades con footer masivo
- **Tipografía**: Sans-serif limpia, buena jerarquía
- **Lo que hace bien**: Inspira confianza corporativa, parece una consultora seria no un proyecto de fin de semana

### 2. TwelveLabs (twelvelabs.io) — ANIMACIONES Y PRODUCTO
- **Paleta**: Dark premium con gradientes morados y cyan
- **Hero**: Video background + H1 enorme + subtítulo
- **Animaciones**: Scroll-triggered reveals, video backgrounds, counters animados
- **Trust**: Logos de clientes (NVIDIA, etc.), testimonios con foto y cargo

### 3. Clay (clay.com) — BRANDING Y COLOR
- **Paleta**: Vibrante, colorida, ilustraciones estilo "clay art"
- **Iconografía**: Mega menú con iconos, nomenclatura fuerte
- **Trust signals**: Logos, testimonios, G2 rating, badges de seguridad

### 4. Jasper / Synthesia — LIMPIEZA Y CLARIDAD
- **Paleta**: Gradientes bold (púrpura), layouts limpios
- **CTAs**: Grandes, claros, orientados a acción
- **Producto primero**: Screenshots del producto en acción

### 5. Tendencias 2026 (según Webstacks)
- Dark mode + colorful backgrounds (NO negro puro)
- Product illustrations animadas
- Trust signals prominentes (logos + testimonios con foto)
- "AI" visible above the fold
- Motion design y microinteracciones
- Para sitios más simples: Framer/Webflow → nosotros: Vue

## Archivos actuales del proyecto

```
src/
  App.vue                # Shell con RouterView
  router.ts              # 5 rutas con hash history
  main.ts                # Entry point
  components/
    AgentNetwork.vue     # Three.js con nodos Meta y pulsos
    layout/
      AppLayout.vue      # Nav + Footer + mobile menu
    sections/
      HeroSection.vue     # Hero con AgentNetwork + panel de agentes
      TrustBar.vue        # Chips de canales
      ServicesSection.vue # 15 servicios con filtros
      UseCasesSection.vue # 6 industrias con emojis
      InteractiveDemoSection.vue # Chat simulado con typing
      CaseStudiesSection.vue # 4 casos de estudio
      StatsSection.vue    # Contadores animados (GSAP)
      RoiCalculatorSection.vue # Calculadora con sliders
      PricingSection.vue  # 3 planes COP
      ComparisonSection.vue # Tabla comparativa
      FaqSection.vue      # 15 FAQs con <details>
      ContactSection.vue  # Form con UTM + honeypot
  pages/
    HomePage.vue          # Hero + Problem + Meta + Industrias + Stats
    ServicesPage.vue      # Header + ServicesSection
    CasesPage.vue         # UseCases + Demo + CaseStudies
    PricingPage.vue       # Pricing + ROI + Comparison
    ContactPage.vue       # Contact + FAQ
  data/
    content.ts (types)
    services.ts (15)
    pricing.ts (3 tiers)
    cases.ts (4 cases)
    faq.ts (15)
    integrations.ts (7 groups)
  utils/
    roi.ts
  styles/
    main.scss
```

## Stack técnico
- Vue 3.5 + TypeScript
- Vite 6
- GSAP 3.12 + ScrollTrigger
- Three.js 0.170
- Lenis (smooth scroll)
- SCSS
- Vue Router 4 (hash mode)
- Vercel deploy

## Tarea para Codex

Crear un plan de mejora completo (`PLAN-BRAND-V3.md`) que incluya:

1. **Nueva paleta de colores** — específicamente crema/cálida. Dar hex codes exactos, variables CSS, y cómo aplicarlos por componente. La paleta debe incluir: fondo principal, superficie, texto, acentos (2-3), CTAs.
2. **Logo SVG** — diseñar un logo para Agenc-IA. Debe ser: moderno, profesional, que combine "IA" con algo visual (cerebro, nodo, chip, chispa). Entregar el código SVG inline.
3. **Sistema de iconos** — recomendar Lucide o Phosphor (ya que son SVG, zero-dependency). Listar exactamente qué iconos usar para cada servicio, feature del pricing, sección.
4. **Estrategia de imágenes** — qué tipo de imágenes usar y dónde (hero, casos de estudio, servicios, sobre nosotros). Recomendar fuentes (Unsplash, generadas con IA, screenshots reales). Dar URLs de ejemplo.
5. **Plan de animaciones** — animaciones GSAP específicas para cada sección (no solo fade-up). Incluir: parallax, morphing, scroll-triggered reveals avanzados, counter, page transitions.
6. **Nueva página "Sobre Nosotros"** — contenido, diseño, secciones.
7. **Mejora del Hero** — cómo hacerlo menos "genérico" y más memorable. Inspirarse en Automaxia/TwelveLabs.
8. **Rediseño del Nav** — más profesional, con dropdowns o mega-menú.
9. **Eliminar la red 3D del hero** (Three.js) si no aporta — reemplazar con algo más visual: video background, gradientes animados, o ilustración.
10. **Prioridad de implementación** — orden claro de qué hacer primero.

El plan debe ser MUY detallado con código CSS/SCSS específico, configuraciones GSAP exactas, y referencias visuales descritas.

Escribir el resultado en PLAN-BRAND-V3.md en la raíz del repo.
