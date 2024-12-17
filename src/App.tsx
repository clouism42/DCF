import React, { useState } from 'react';
import { Calculator, Download } from 'lucide-react';
import { YearlyGrowthInputs } from './components/YearlyGrowthInputs';
import { OperationalInputs } from './components/OperationalInputs';
import { FinancingInputs } from './components/FinancingInputs';
import { TerminalValueInputs } from './components/TerminalValueInputs';
import { WorkingCapitalInputs } from './components/WorkingCapitalInputs';
import { DCFResults } from './components/DCFResults';
import { calculateYearlyCashFlows, calculateTerminalValue, calculateWACC } from './utils/dcfCalculations';
import { exportToExcel } from './utils/excelExport';
import { 
  OperationalVariables, 
  FinancingVariables, 
  TerminalValueVariables,
  WorkingCapitalVariables,
  YearlyGrowth,
  DCFResult
} from './types/dcf';

function App() {
  const [operationalVars, setOperationalVars] = useState<OperationalVariables>({
    year0Revenue: 1000000,
    yearlyGrowthRates: Array.from({ length: 5 }, (_, i) => ({
      year: i + 1,
      rate: 5
    })),
    grossMargin: 60,
    fixedOpCostGrowth: 3,
    variableOpCostPctRevenue: 20,
    initialFixedCost: 300000
  });

  const [financingVars, setFinancingVars] = useState<FinancingVariables>({
    costOfDebt: 5,
    costOfEquity: 10,
    debtWeight: 30,
    equityWeight: 70
  });

  const [terminalVars, setTerminalVars] = useState<TerminalValueVariables>({
    method: 'perpetuity',
    perpetualGrowthRate: 2,
    ebitdaMultiple: 10,
    projectionYears: 5
  });

  const [workingCapitalVars, setWorkingCapitalVars] = useState<WorkingCapitalVariables>({
    workingCapitalPctRevenue: 10,
    capexPctRevenue: 5,
    depreciationPctCapex: 20,
    taxRate: 25
  });

  const [dcfResult, setDcfResult] = useState<DCFResult | null>(null);

  const handleYearlyGrowthChange = (yearlyGrowthRates: YearlyGrowth[], year0Revenue: number) => {
    setOperationalVars(prev => ({
      ...prev,
      yearlyGrowthRates,
      year0Revenue
    }));
  };

  const handleCalculate = () => {
    const wacc = calculateWACC(financingVars);
    const cashFlows = calculateYearlyCashFlows(
      operationalVars,
      workingCapitalVars,
      financingVars,
      terminalVars
    );
    
    const terminalValue = calculateTerminalValue(
      cashFlows[cashFlows.length - 1].freeCashFlow,
      wacc,
      terminalVars,
      cashFlows[cashFlows.length - 1].ebitda
    );

    const presentValue = cashFlows.reduce(
      (sum, cf) => sum + cf.discountedCashFlow,
      0
    );

    const terminalValueDiscounted = terminalValue / 
      Math.pow(1 + wacc / 100, terminalVars.projectionYears);

    setDcfResult({
      cashFlows,
      terminalValue,
      terminalValueDiscounted,
      enterpriseValue: presentValue + terminalValueDiscounted
    });
  };

  const handleExport = () => {
    if (!dcfResult) return;
    exportToExcel(dcfResult.cashFlows, dcfResult.terminalValue);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Calculator className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">
            DCF Analysis Calculator
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <YearlyGrowthInputs
            yearlyGrowthRates={operationalVars.yearlyGrowthRates}
            year0Revenue={operationalVars.year0Revenue}
            onChange={handleYearlyGrowthChange}
          />
          <OperationalInputs
            variables={operationalVars}
            onChange={setOperationalVars}
          />
          <FinancingInputs
            variables={financingVars}
            onChange={setFinancingVars}
          />
          <TerminalValueInputs
            variables={terminalVars}
            onChange={setTerminalVars}
          />
          <WorkingCapitalInputs
            variables={workingCapitalVars}
            onChange={setWorkingCapitalVars}
          />
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={handleCalculate}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate DCF
          </button>
          <button
            onClick={handleExport}
            disabled={!dcfResult}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 mr-2" />
            Export to Excel
          </button>
        </div>

        {dcfResult && <DCFResults result={dcfResult} />}
      </div>
    </div>
  );
}

export default App;