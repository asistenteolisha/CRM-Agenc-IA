// Tipos compartidos para Agenc-IA V2

export type Channel = 'whatsapp' | 'instagram' | 'facebook' | 'messenger' | 'web' | 'crm' | 'n8n'

export type ServiceCategory =
  | 'ventas'
  | 'soporte'
  | 'ecommerce'
  | 'social'
  | 'automatizacion'
  | 'consultoria'

export interface Service {
  id: string
  category: ServiceCategory
  title: string
  short: string
  outcome: string
  channels: Channel[]
  metaCapabilities: string[]
  deliverables: string[]
  startingAt?: string
}

export interface PricingPlan {
  id: string
  name: string
  setup: number
  monthly: number
  recommended?: boolean
  description: string
  includes: string[]
  limits: string[]
}

export interface CaseStudy {
  id: string
  client: string
  industry: string
  problem: string
  solution: string
  results: { metric: string; value: string }[]
  testimonial?: { author: string; role: string; quote: string }
  channels: Channel[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Integration {
  name: string
  description: string
}

export interface IntegrationGroup {
  group: string
  items: Integration[]
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  details: string[]
}

export interface RoiInput {
  monthlyLeads: number
  missedLeadRate: number
  averageTicket: number
  grossMarginRate: number
  currentConversionRate: number
  expectedLiftRate: number
  weeklyManualHours: number
  hourlyCost: number
  monthlyPlanCost: number
  setupCost: number
}

export interface RoiOutput {
  missedLeads: number
  recoveredSales: number
  additionalGrossRevenue: number
  additionalMargin: number
  operationalSavings: number
  monthlyBenefit: number
  monthlyNet: number
  roi: number
  paybackMonths: number
}
