import React from 'react';
import { IndianRupee, BarChart2, ShoppingCart, Globe, Trophy, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string | null;
  trend: 'up' | 'down' | 'neutral';
  subtitle: string;
  icon: string;
  isWarning?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, trend, subtitle, icon, isWarning }) => {
  const getIcon = () => {
    switch (icon) {
      case 'indian-rupee': return <IndianRupee size={20} className="text-blue-500" />;
      case 'bar-chart-2': return <BarChart2 size={20} className="text-purple-500" />;
      case 'shopping-cart': return <ShoppingCart size={20} className="text-orange-500" />;
      case 'globe': return <Globe size={20} className="text-blue-500" />;
      case 'trophy': return <Trophy size={20} className="text-yellow-600" />;
      case 'alert-triangle': return <AlertTriangle size={20} className="text-red-500" />;
      default: return <BarChart2 size={20} className="text-gray-500" />;
    }
  };

  const getIconBg = () => {
    switch (icon) {
      case 'indian-rupee': return 'bg-blue-50';
      case 'bar-chart-2': return 'bg-purple-50';
      case 'shopping-cart': return 'bg-orange-50';
      case 'globe': return 'bg-blue-50';
      case 'trophy': return 'bg-yellow-50';
      case 'alert-triangle': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className={`bg-white rounded-xl p-5 border shadow-sm transition-shadow hover:shadow-md ${isWarning ? 'border-red-100' : 'border-gray-100'}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconBg()}`}>
          {getIcon()}
        </div>
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>
      
      <div className="flex flex-col space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        
        <div className="flex items-center text-xs">
          {change && (
            <div className={`flex items-center space-x-1 font-medium mr-2 px-1.5 py-0.5 rounded ${
              trend === 'up' ? 'text-green-700 bg-green-50' : 
              trend === 'down' ? 'text-red-700 bg-red-50' : 
              'text-gray-700 bg-gray-100'
            }`}>
              {trend === 'up' ? <TrendingUp size={12} /> : 
               trend === 'down' ? <TrendingDown size={12} /> : 
               <Minus size={12} />}
              <span>{change}</span>
            </div>
          )}
          <span className="text-gray-500">{subtitle}</span>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
