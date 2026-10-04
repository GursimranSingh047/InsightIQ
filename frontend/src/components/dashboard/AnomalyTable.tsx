import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AnomalyTableProps {
  data: any[];
}

const AnomalyTable: React.FC<AnomalyTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="text-red-500" size={20} />
          <h3 className="text-lg font-bold text-gray-900">Anomalies Detected</h3>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-1 bg-red-50 text-red-600 rounded text-xs font-bold border border-red-100">
            {data.length} anomalies
          </span>
          <button className="px-3 py-1 bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded hover:bg-gray-50 transition-colors shadow-sm">
            View All
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-500 bg-gray-50/50 uppercase border-b border-gray-100">
            <tr>
              <th className="px-4 py-3 font-semibold rounded-tl-lg">Date</th>
              <th className="px-4 py-3 font-semibold">Metric</th>
              <th className="px-4 py-3 font-semibold">Value</th>
              <th className="px-4 py-3 font-semibold">Expected</th>
              <th className="px-4 py-3 font-semibold rounded-tr-lg text-right">Deviation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-gray-900 font-medium">{row.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">{row.metric}</td>
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{row.value}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{row.expected}</td>
                <td className="px-4 py-3 whitespace-nowrap text-right font-bold text-red-600">{row.deviation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnomalyTable;
