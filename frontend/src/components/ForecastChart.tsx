import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ForecastChartProps {
  data: {
    status: string;
    historical: any[];
    forecast: any[];
    metric: string;
  };
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  if (data.status === 'error' || !data.historical) {
    return <div className="p-4 text-gray-500 bg-gray-50 rounded text-center">Forecasting not available for this dataset. {""}</div>;
  }

  // Merge historical and forecast data for the chart
  const combinedData = [...data.historical, ...data.forecast].map(d => ({
    date: d.date,
    Actual: d.actual,
    Forecast: d.forecast
  }));

  const splitDate = data.historical.length > 0 ? data.historical[data.historical.length - 1].date : null;

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: '#888' }} 
            tickFormatter={(val) => {
              const d = new Date(val);
              return `${d.getMonth()+1}/${d.getDate()}`;
            }} 
          />
          <YAxis tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Line type="monotone" dataKey="Actual" stroke="#3b82f6" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="Forecast" stroke="#f59e0b" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 3 }} />
          {splitDate && (
            <ReferenceLine x={splitDate} stroke="#9ca3af" strokeDasharray="3 3" label={{ position: 'top', value: 'Forecast Start', fill: '#9ca3af', fontSize: 12 }} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
