import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const read = (path) => readFileSync(path, 'utf8')

const pricing = read('src/data/pricing.ts')
const expectedPlans = [
  ['starter', 'setup: 999000', 'setupUsd: 249', 'monthly: 399000', 'monthlyUsd: 99'],
  ['growth', 'setup: 1999000', 'setupUsd: 499', 'monthly: 799000', 'monthlyUsd: 199'],
  ['pro', 'setup: 3999000', 'setupUsd: 999', 'monthly: 1399000', 'monthlyUsd: 349'],
  ['web', 'setup: 2499000', 'setupUsd: 620', 'monthly: 0', 'monthlyUsd: 0']
]

for (const [id, ...needles] of expectedPlans) {
  assert.match(pricing, new RegExp(`id: '${id}'[\\s\\S]+?${needles.join('[\\s\\S]+?')}`))
}

const pricingSection = read('src/components/sections/PricingSection.vue')
const homeFaq = read('src/components/sections/HomeFaqSection.vue')
const fullFaq = read('src/data/faq.ts')
const policyViolations = []

if (pricing.includes('~$0.05/msg')) policyViolations.push('fixed Meta message-cost estimate')
if (/(?:15|30) días/.test(homeFaq)) policyViolations.push('Home FAQ cancellation-day promise')
if (/(?:15|30) días/.test(fullFaq)) policyViolations.push('FAQ cancellation-day promise')
if (!pricingSection.includes("p.id === 'web' ? 'Incluye entrega, 2 rondas de revisión y hosting por 1 año' : 'Incluye setup, soporte y ajustes mensuales'")) {
  policyViolations.push('Web Profesional uses recurring-plan value copy')
}

assert.deepEqual(policyViolations, [], `pricing/policy claims need correction: ${policyViolations.join(', ')}`)

const activeText = [
  'api/chat.js',
  'api/lead.js',
  'src/components/chat/ChatWidget.vue',
  'src/components/sections/HeroSection.vue',
  'src/components/sections/HomeFaqSection.vue',
  'src/components/sections/InteractiveDemoSection.vue',
  'src/components/sections/PricingSection.vue',
  'src/components/sections/RoiCalculatorSection.vue',
  'src/components/sections/StatsSection.vue',
  'src/data/faq.ts',
  'src/data/services.ts',
  'src/pages/AboutPage.vue',
  'src/pages/CasesPage.vue',
  'src/pages/HomePage.vue'
].map((path) => `${path}\n${read(path)}`).join('\n')

for (const claim of [
  'menos de 30 segundos',
  'Resultados reales',
  'Conversaciones reales',
  'El 60%',
  '<strong>85%</strong>',
  '&lt;30s',
  '3×',
  '$1.2M COP',
  'Hasta 40% menos ausentismo',
  'Ahorra ~$2M/mes'
]) {
  assert.ok(!activeText.includes(claim), `unverified proof still present: ${claim}`)
}

for (const oldPrice of ['$390.000', '$690.000', '$1.200.000', '$900.000', '$1.800.000', '$3.500.000']) {
  assert.ok(!activeText.includes(oldPrice), `old price still present: ${oldPrice}`)
}

const cases = read('src/data/cases.ts')
assert.equal((cases.match(/^\s{4}id:/gm) || []).length, 3, 'exactly three honest examples required')
assert.equal((cases.match(/^\s{4}label: '(?:Demo sectorial|Caso proyectado)'/gm) || []).length, 3, 'every example needs an approved visible label')
assert.ok(!/testimonial|value:\s*'[^']*\d|[%+~<>]/i.test(cases), 'case examples still contain testimonials or numeric performance proof')

for (const fakeAuthor of [
  'Chef propietario',
  'Gerente de óptica',
  'Dueña del salón',
  'Coordinadora de admisiones',
  'Gerente general',
  'Dueña de tienda',
  'Cliente automotriz',
  'Cliente servicios',
  'Cliente retail'
]) {
  assert.ok(!activeText.includes(fakeAuthor) && !cases.includes(fakeAuthor), `known fake author still present: ${fakeAuthor}`)
}

assert.ok(!existsSync('src/components/sections/TestimonialsSection.vue'), 'TestimonialsSection must be deleted')
assert.ok(!read('src/pages/HomePage.vue').includes('TestimonialsSection'), 'HomePage still renders TestimonialsSection')
assert.match(read('src/components/sections/RoiCalculatorSection.vue'), /monthlyPlanCost: 399000,[\s\S]+setupCost: 999000/)

const gitignore = read('.gitignore')
assert.match(gitignore, /^\/WHATSAPP-TOKEN\.md$/m)
assert.match(gitignore, /^\/workflows\/\*\.json$/m)
assert.ok(!existsSync('pnpm-workspace.yaml'), 'obsolete pnpm workspace config must be removed')

assert.ok(activeText.includes('https://agenciadia.tech'), 'apex production domain missing')
assert.ok(activeText.includes('https://www.agenciadia.tech'), 'www production domain missing')
assert.ok(activeText.includes('$399.000 COP / $99 USD'), 'Starter display price missing')
assert.ok(activeText.includes('$799.000 COP / $199 USD'), 'Growth display price missing')
assert.ok(activeText.includes('$1.399.000 COP / $349 USD'), 'Pro display price missing')
assert.ok(activeText.includes('$2.499.000 COP / $620 USD'), 'Web Profesional price missing')
assert.ok(activeText.includes('Diagnóstico gratuito'), 'primary CTA copy missing')

console.log('production content ok')
