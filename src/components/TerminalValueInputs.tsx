import React from 'react';
import { TerminalValueVariables } from '../types/dcf';

interface Props {
  variables: TerminalValueVariables;
  onChange: (variables: TerminalValueVariables) => void;
}

export const TerminalValueInputs: React.FC<Props> = ({ variables, onChange }) => {
  const handleChange = (field: keyof TerminalValueVariables) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = field === 'method' 
      ? e.target.value as 'perpetuity' | 'ebitdaMultiple'
      : parseFloat(e.target.value) || 0;
    
    onChange({
      ...variables,
      [field]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Terminal Value Variables</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Calculation Method
          </label>
          <select
            value={variables.method}
            onChange={handleChange('method')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="perpetuity">Perpetuity Growth</option>
            <option value="ebitdaMultiple">EBITDA Multiple</option>
          </select>
        </div>
        
        {variables.method === 'perpetuity' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Perpetual Growth Rate (%)
            </label>
            <input
              type="number"
              value={variables.perpetualGrowthRate}
              onChange={handleChange('perpetualGrowthRate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}

        {variables.method === 'ebitdaMultiple' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              EBITDA Multiple
            </label>
            <input
              type="number"
              value={variables.ebitdaMultiple}
              onChange={handleChange('ebitdaMultiple')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Projection Years
          </label>
          <input
            type="number"
            value={variables.projectionYears}
            onChange={handleChange('projectionYears')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};