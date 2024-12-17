import React from 'react';
import { YearlyGrowth } from '../types/dcf';

interface Props {
  yearlyGrowthRates: YearlyGrowth[];
  year0Revenue: number;
  onChange: (yearlyGrowthRates: YearlyGrowth[], year0Revenue: number) => void;
}

export const YearlyGrowthInputs: React.FC<Props> = ({ 
  yearlyGrowthRates, 
  year0Revenue, 
  onChange 
}) => {
  const handleGrowthChange = (year: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRates = yearlyGrowthRates.map(growth => 
      growth.year === year 
        ? { ...growth, rate: parseFloat(e.target.value) || 0 }
        : growth
    );
    onChange(newRates, year0Revenue);
  };

  const handleYear0RevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(yearlyGrowthRates, parseFloat(e.target.value) || 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Revenue Growth Projections</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year 0 Revenue ($)
          </label>
          <input
            type="number"
            value={year0Revenue}
            onChange={handleYear0RevenueChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {yearlyGrowthRates.map(growth => (
            <div key={growth.year}>
              <label className="block text-sm font-medium text-gray-700">
                Year {growth.year} Growth (%)
              </label>
              <input
                type="number"
                value={growth.rate}
                onChange={handleGrowthChange(growth.year)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};