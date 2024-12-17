export const calculateWACC = (financing: FinancingVariables): number => {
  const { costOfDebt, costOfEquity, debtWeight, equityWeight } = financing;
  return (costOfDebt * debtWeight + costOfEquity * equityWeight) / 100;
};

export const calculateFCF = (
  revenue: number,
  operationalVars: OperationalVariables
): number => {
  const grossProfit = revenue * (operationalVars.grossMargin / 100);
  const variableOpCost = revenue * (operationalVars.variableOpCostPctRevenue / 100);
  return grossProfit - variableOpCost;
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