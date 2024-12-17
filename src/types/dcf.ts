export interface YearlyGrowth {
  year: number;
  rate: number;
}

export interface OperationalVariables {
  year0Revenue: number;
  yearlyGrowthRates: YearlyGrowth[];
  grossMargin: number;
  fixedOpCostGrowth: number;
  variableOpCostPctRevenue: number;
  initialFixedCost: number;
}

export interface FinancingVariables {
  costOfDebt: number;
  costOfEquity: number;
  debtWeight: number;
  equityWeight: number;
}

export interface TerminalValueVariables {
  method: 'perpetuity' | 'ebitdaMultiple';
  perpetualGrowthRate: number;
  ebitdaMultiple: number;
  projectionYears: number;
}

export interface WorkingCapitalVariables {
  workingCapitalPctRevenue: number;
  capexPctRevenue: number;
  depreciationPctCapex: number;
  taxRate: number;
}

export interface YearlyCalculation {
  year: number;
  revenue: number;
  grossProfit: number;
  fixedCosts: number;
  variableCosts: number;
  ebitda: number;
  depreciation: number;
  ebit: number;
  tax: number;
  nopat: number;
  capex: number;
  workingCapital: number;
  freeCashFlow: number;
  discountedCashFlow: number;
}

export interface DCFResult {
  cashFlows: YearlyCalculation[];
  terminalValue: number;
  terminalValueDiscounted: number;
  enterpriseValue: number;
}

export interface SensitivityAnalysis {
  waccRange: number[];
  growthRange: number[];
  values: number[][];
}