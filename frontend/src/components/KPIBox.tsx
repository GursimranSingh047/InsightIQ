import React from 'react';

interface KPIBoxProps {
  title: string;
  value: string | number;
  format?: string;
  trend?: string;
  isPositive?: boolean;
}

const KPIBox: React.FC<KPIBoxProps> = ({ title, value, format, trend, isPositive }) => {
  let displayValue = value;
  
  if (format === 'currency' && typeof value === 'number') {
    displayValue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  } else if (typeof value === 'number') {
    displayValue = new Intl.NumberFormat('en-US').format(value);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="text-2xl font-bold text-gray-900 mb-2">{displayValue}</div>
      {trend && (
        <div className={`text-sm font-medium flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {trend}
        </div>
      )}
    </div>
  );
};

export default KPIBox;
