import React from 'react';
import { SensitivityAnalysis } from '../types/dcf';

interface Props {
  analysis: SensitivityAnalysis;
}

export const SensitivityTable: React.FC<Props> = ({ analysis }) => {
  const { waccRange, growthRange, values } = analysis;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">WACC / Growth</th>
            {growthRange.map((growth) => (
              <th key={growth} className="border p-2">{growth.toFixed(1)}%</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((row, i) => (
            <tr key={waccRange[i]}>
              <td className="border p-2 font-semibold">{waccRange[i].toFixed(1)}%</td>
              {row.map((value, j) => (
                <td key={j} className="border p-2">
                  {(value / 1000000).toFixed(1)}M
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};