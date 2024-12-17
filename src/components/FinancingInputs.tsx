import React from 'react';
import { FinancingVariables } from '../types/dcf';
import { calculateWACC } from '../utils/calculations';

interface Props {
  variables: FinancingVariables;
  onChange: (variables: FinancingVariables) => void;
}

export const FinancingInputs: React.FC<Props> = ({ variables, onChange }) => {
  const handleChange = (field: keyof FinancingVariables) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...variables,
      [field]: parseFloat(e.target.value) || 0,
    });
  };

  const wacc = calculateWACC(variables);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Financing Variables</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cost of Debt (%)
          </label>
          <input
            type="number"
            value={variables.costOfDebt}
            onChange={handleChange('costOfDebt')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cost of Equity (%)
          </label>
          <input
            type="number"
            value={variables.costOfEquity}
            onChange={handleChange('costOfEquity')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Debt Weight (%)
          </label>
          <input
            type="number"
            value={variables.debtWeight}
            onChange={handleChange('debtWeight')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Equity Weight (%)
          </label>
          <input
            type="number"
            value={variables.equityWeight}
            onChange={handleChange('equityWeight')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="pt-4 border-t">
          <p className="text-lg font-semibold">
            WACC: {wacc.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};