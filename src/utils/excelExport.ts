import * as XLSX from 'xlsx';
import { YearlyCalculation } from '../types/dcf';

export const exportToExcel = (calculations: YearlyCalculation[], terminalValue: number) => {
  // Create data structure with years as columns
  const data = {
    'Metric': [
      'Revenue',
      'Gross Profit',
      'Fixed Costs',
      'Variable Costs',
      'EBITDA',
      'D&A',
      'EBIT',
      'Tax',
      'NOPAT',
      'D&A (Add Back)',
      'CAPEX',
      'Working Capital Change',
      'Free Cash Flow',
      'Terminal Value',
      'Discounted Cash Flow'
    ]
  };

  // Add year columns
  calculations.forEach(calc => {
    data[`Year ${calc.year}`] = [
      calc.revenue,
      calc.grossProfit,
      calc.fixedCosts,
      calc.variableCosts,
      calc.ebitda,
      calc.depreciation,
      calc.ebit,
      calc.tax,
      calc.nopat,
      calc.depreciation,
      calc.capex,
      calc.workingCapital,
      calc.freeCashFlow,
      calc.year === calculations.length ? terminalValue : 0, // Add terminal value in final year
      calc.discountedCashFlow
    ];
  });

  // Convert to worksheet
  const worksheet = XLSX.utils.json_to_sheet(
    Object.keys(data).map((key, idx) => {
      const row: { [key: string]: string | number } = { 'Metric': data['Metric'][idx] };
      Object.keys(data).forEach(yearKey => {
        if (yearKey !== 'Metric') {
          row[yearKey] = data[yearKey][idx];
        }
      });
      return row;
    })
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'DCF Analysis');
  
  XLSX.writeFile(workbook, 'dcf_analysis.xlsx');
};