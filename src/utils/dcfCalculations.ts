import { 
  OperationalVariables, 
  FinancingVariables, 
  WorkingCapitalVariables,
  TerminalValueVariables,
  YearlyCalculation,
  SensitivityAnalysis 
} from '../types/dcf';

const calculateRevenueForYear = (
  year: number,
  lastYearRevenue: number,
  yearlyGrowthRates: OperationalVariables['yearlyGrowthRates']
): number => {
  const growthRate = yearlyGrowthRates.find(g => g.year === year)?.rate || 0;
  return lastYearRevenue * (1 + growthRate / 100);
};

export const calculateYearlyCashFlows = (
  operational: OperationalVariables,
  workingCapital: WorkingCapitalVariables,
  financing: FinancingVariables,
  terminal: TerminalValueVariables
): YearlyCalculation[] => {
  const years = Array.from({ length: terminal.projectionYears }, (_, i) => i + 1);
  const wacc = calculateWACC(financing);
  let lastYearRevenue = operational.year0Revenue;
  let lastYearFixedCost = operational.initialFixedCost;
  
  return years.map(year => {
    // Revenue calculations
    const revenue = calculateRevenueForYear(year, lastYearRevenue, operational.yearlyGrowthRates);
    const grossProfit = revenue * (operational.grossMargin / 100);
    const fixedCosts = lastYearFixedCost * (1 + operational.fixedOpCostGrowth / 100);
    const variableCosts = revenue * (operational.variableOpCostPctRevenue / 100);
    
    // EBITDA and EBIT calculations
    const ebitda = grossProfit - fixedCosts - variableCosts;
    const capex = revenue * (workingCapital.capexPctRevenue / 100);
    const depreciation = capex * (workingCapital.depreciationPctCapex / 100);
    const ebit = ebitda - depreciation;
    
    // Tax and NOPAT calculations
    const tax = Math.max(0, ebit * (workingCapital.taxRate / 100));
    const nopat = ebit - tax;
    
    // Working capital change
    const workingCapitalChange = (revenue - lastYearRevenue) * 
      (workingCapital.workingCapitalPctRevenue / 100);
    
    // Free cash flow calculation
    const freeCashFlow = nopat + depreciation - capex - workingCapitalChange;
    
    // Discount the cash flow
    const discountedCashFlow = freeCashFlow / Math.pow(1 + wacc / 100, year);
    
    // Update last year values for next iteration
    lastYearRevenue = revenue;
    lastYearFixedCost = fixedCosts;
    
    return {
      year,
      revenue,
      grossProfit,
      fixedCosts,
      variableCosts,
      ebitda,
      depreciation,
      ebit,
      tax,
      nopat,
      capex,
      workingCapital: workingCapitalChange,
      freeCashFlow,
      discountedCashFlow
    };
  });
};

export const calculateWACC = (financing: FinancingVariables): number => {
  const { costOfDebt, costOfEquity, debtWeight, equityWeight } = financing;
  return (costOfDebt * debtWeight + costOfEquity * equityWeight) / 100;
};

export const calculateTerminalValue = (
  finalYearFCF: number,
  wacc: number,
  terminalVars: TerminalValueVariables,
  finalYearEBITDA: number
): number => {
  if (terminalVars.method === 'perpetuity') {
    return (finalYearFCF * (1 + terminalVars.perpetualGrowthRate / 100)) / 
           (wacc / 100 - terminalVars.perpetualGrowthRate / 100);
  } else {
    return finalYearEBITDA * terminalVars.ebitdaMultiple;
  }
};

export const calculateSensitivityAnalysis = (
  operational: OperationalVariables,
  workingCapital: WorkingCapitalVariables,
  financing: FinancingVariables,
  terminal: TerminalValueVariables,
  waccRange: number[],
  growthRange: number[]
): SensitivityAnalysis => {
  const values = waccRange.map(wacc => {
    return growthRange.map(growth => {
      const modifiedFinancing = { ...financing };
      const modifiedTerminal = { ...terminal, perpetualGrowthRate: growth };
      const cashFlows = calculateYearlyCashFlows(
        operational,
        workingCapital,
        modifiedFinancing,
        modifiedTerminal
      );
      const terminalValue = calculateTerminalValue(
        cashFlows[cashFlows.length - 1].freeCashFlow,
        wacc,
        modifiedTerminal,
        cashFlows[cashFlows.length - 1].ebitda
      );
      const presentValue = cashFlows.reduce(
        (sum, cf) => sum + cf.discountedCashFlow,
        0
      );
      return presentValue + terminalValue / Math.pow(1 + wacc / 100, terminal.projectionYears);
    });
  });

  return {
    waccRange,
    growthRange,
    values
  };
};