import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip 
} from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

interface CategoryProfitChartProps {
  data: any[];
}

const CategoryProfitChart: React.FC<CategoryProfitChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <PieChartIcon className="text-purple-500" size={20} />
        <h3 className="text-lg font-bold text-gray-900">Top 5 Categories by Profit</h3>
      </div>
      
      <div className="flex flex-col md:flex-row items-center h-64">
        <div className="h-full w-full md:w-1/2 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [`${value}%`, 'Profit Share']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-gray-900">₹1.8 Cr</span>
            <span className="text-xs text-gray-500">Total Profit</span>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 mt-4 md:mt-0 px-4">
          <ul className="space-y-3">
            {data.map((item, index) => (
              <li key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryProfitChart;
