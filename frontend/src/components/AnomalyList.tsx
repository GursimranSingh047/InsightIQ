import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AnomalyListProps {
  anomalies: any[];
}

const AnomalyList: React.FC<AnomalyListProps> = ({ anomalies }) => {
  if (!anomalies || anomalies.length === 0) {
    return <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl">No anomalies detected in the numerical data.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Row</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Explanation</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {anomalies.map((anomaly, idx) => (
            <tr key={idx} className="hover:bg-red-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  anomaly.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  <AlertTriangle size={12} className="mr-1" />
                  {anomaly.severity}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {anomaly.column}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                #{anomaly.row_index}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                {anomaly.value}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {anomaly.explanation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnomalyList;
