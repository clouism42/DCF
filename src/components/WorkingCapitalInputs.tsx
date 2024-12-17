import React from 'react';
import { WorkingCapitalVariables } from '../types/dcf';

interface Props {
  variables: WorkingCapitalVariables;
  onChange: (variables: WorkingCapitalVariables) => void;
}

export const WorkingCapitalInputs: React.FC<Props> = ({ variables, onChange }) => {
  const handleChange = (field: keyof WorkingCapitalVariables) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...variables,
      [field]: parseFloat(e.target.value) || 0,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Working Capital & Other Variables</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Working Capital (% of Revenue Change)
          </label>
          <input
            type="number"
            value={variables.workingCapitalPctRevenue}
            onChange={handleChange('workingCapitalPctRevenue')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CAPEX (% of Revenue)
          </label>
          <input
            type="number"
            value={variables.capexPctRevenue}
            onChange={handleChange('capexPctRevenue')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Depreciation (% of CAPEX)
          </label>
          <input
            type="number"
            value={variables.depreciationPctCapex}
            onChange={handleChange('depreciationPctCapex')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tax Rate (%)
          </label>
          <input
            type="number"
            value={variables.taxRate}
            onChange={handleChange('taxRate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};