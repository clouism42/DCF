import React from 'react';
import { OperationalVariables } from '../types/dcf';

interface Props {
  variables: OperationalVariables;
  onChange: (variables: OperationalVariables) => void;
}

export const OperationalInputs: React.FC<Props> = ({ variables, onChange }) => {
  const handleChange = (field: keyof OperationalVariables) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...variables,
      [field]: parseFloat(e.target.value) || 0,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Operational Variables</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Revenue Growth (%)
          </label>
          <input
            type="number"
            value={variables.revenueGrowth}
            onChange={handleChange('revenueGrowth')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gross Margin (%)
          </label>
          <input
            type="number"
            value={variables.grossMargin}
            onChange={handleChange('grossMargin')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fixed Operating Cost Growth (%)
          </label>
          <input
            type="number"
            value={variables.fixedOpCostGrowth}
            onChange={handleChange('fixedOpCostGrowth')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Variable Operating Costs (% of Revenue)
          </label>
          <input
            type="number"
            value={variables.variableOpCostPctRevenue}
            onChange={handleChange('variableOpCostPctRevenue')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};