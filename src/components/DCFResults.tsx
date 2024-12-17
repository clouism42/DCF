import React from 'react';
import { DCFResult } from '../types/dcf';

interface Props {
  result: DCFResult;
}

export const DCFResults: React.FC<Props> = ({ result }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">DCF Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Present Value of Cash Flows</h3>
          <p className="text-2xl text-blue-600">
            {formatCurrency(result.cashFlows.reduce((sum, cf) => sum + cf.discountedCashFlow, 0))}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Terminal Value</h3>
          <p className="text-2xl text-blue-600">
            {formatCurrency(result.terminalValueDiscounted)}
          </p>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Enterprise Value</h3>
          <p className="text-3xl text-green-600 font-bold">
            {formatCurrency(result.enterpriseValue)}
          </p>
        </div>
      </div>
    </div>
  );
};