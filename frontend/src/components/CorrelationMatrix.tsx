import React from 'react';

interface CorrelationMatrixProps {
  data: {
    matrix: any[];
    top_positive: any[];
    top_negative: any[];
  };
}

const CorrelationMatrix: React.FC<CorrelationMatrixProps> = ({ data }) => {
  if (!data || !data.matrix || data.matrix.length === 0) {
    return <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl">Correlation data not available. Ensure dataset has multiple numeric columns.</div>;
  }

  const columns = data.matrix.map(row => row.name);

  const getHeatmapColor = (val: number) => {
    // Basic red (negative) to blue (positive) heatmap
    if (val > 0) {
      const alpha = Math.min(val, 1);
      return `rgba(59, 130, 246, ${alpha})`; // Blue
    } else {
      const alpha = Math.min(Math.abs(val), 1);
      return `rgba(239, 68, 68, ${alpha})`; // Red
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Matrix Table */}
      <div className="flex-1 overflow-x-auto">
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Correlation Matrix</h4>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border border-gray-200 bg-gray-50 text-xs text-gray-500 font-medium"></th>
              {columns.map(col => (
                <th key={col} className="p-2 border border-gray-200 bg-gray-50 text-xs text-gray-500 font-medium truncate max-w-[80px]" title={col}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.matrix.map(row => (
              <tr key={row.name}>
                <th className="p-2 border border-gray-200 bg-gray-50 text-xs text-gray-700 font-medium text-left truncate max-w-[80px]" title={row.name}>
                  {row.name}
                </th>
                {columns.map(col => {
                  const val = row[col];
                  return (
                    <td 
                      key={col} 
                      className="p-2 border border-gray-200 text-center text-xs font-medium"
                      style={{ 
                        backgroundColor: getHeatmapColor(val), 
                        color: Math.abs(val) > 0.5 ? 'white' : 'inherit' 
                      }}
                    >
                      {val.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Insights */}
      <div className="w-full lg:w-72 space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Strongest Positive</h4>
          {data.top_positive.length > 0 ? (
            <ul className="space-y-2">
              {data.top_positive.map((corr, idx) => (
                <li key={idx} className="flex justify-between items-center text-sm p-2 bg-blue-50 rounded text-blue-900">
                  <span className="truncate pr-2" title={`${corr.feature1} & ${corr.feature2}`}>
                    {corr.feature1} ↔ {corr.feature2}
                  </span>
                  <span className="font-bold">{corr.score.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">None found.</p>
          )}
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Strongest Negative</h4>
          {data.top_negative.length > 0 ? (
            <ul className="space-y-2">
              {data.top_negative.map((corr, idx) => (
                <li key={idx} className="flex justify-between items-center text-sm p-2 bg-red-50 rounded text-red-900">
                  <span className="truncate pr-2" title={`${corr.feature1} & ${corr.feature2}`}>
                    {corr.feature1} ↔ {corr.feature2}
                  </span>
                  <span className="font-bold">{corr.score.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">None found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorrelationMatrix;
