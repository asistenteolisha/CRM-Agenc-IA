import type { RoiInput, RoiOutput } from '../data/content'

export function calculateRoi(input: RoiInput): RoiOutput {
  const missedLeads = input.monthlyLeads * input.missedLeadRate
  const recoveredSales = missedLeads * input.currentConversionRate * input.expectedLiftRate
  const additionalGrossRevenue = recoveredSales * input.averageTicket
  const additionalMargin = additionalGrossRevenue * input.grossMarginRate
  const operationalSavings = input.weeklyManualHours * 4.33 * input.hourlyCost
  const monthlyBenefit = additionalMargin + operationalSavings
  const monthlyNet = monthlyBenefit - input.monthlyPlanCost
  const roi = input.monthlyPlanCost > 0 ? monthlyNet / input.monthlyPlanCost : 0
  const paybackMonths = monthlyNet > 0 ? input.setupCost / monthlyNet : Infinity

  return { missedLeads, recoveredSales, additionalGrossRevenue, additionalMargin, operationalSavings, monthlyBenefit, monthlyNet, roi, paybackMonths }
}
