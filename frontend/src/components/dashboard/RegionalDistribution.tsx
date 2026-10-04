import React from 'react';
import { MapPin } from 'lucide-react';

interface RegionalDistributionProps {
  data: any[];
}

const RegionalDistribution: React.FC<RegionalDistributionProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="text-blue-600" size={20} />
        <h3 className="text-lg font-bold text-gray-900">Sales Distribution by Region</h3>
      </div>
      
      <div className="flex flex-col md:flex-row h-64">
        {/* Placeholder for map - using a stylized abstract representation instead of heavy map library */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative p-4">
          <div className="w-full h-full bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-center relative overflow-hidden">
             {/* Abstract Map Nodes */}
             <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
             <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-blue-600 rounded-full shadow-lg shadow-blue-500/40"></div>
             <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-blue-300 rounded-full"></div>
             <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-200 rounded-full"></div>
             
             {/* Connecting lines */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
               <line x1="25%" y1="50%" x2="50%" y2="25%" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
               <line x1="25%" y1="50%" x2="50%" y2="66%" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
               <line x1="50%" y1="25%" x2="75%" y2="50%" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 4" />
             </svg>
             <span className="text-xs font-semibold text-blue-800 opacity-60 uppercase tracking-widest mt-24">Regional Mapping</span>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 mt-4 md:mt-0 px-4 flex flex-col justify-center">
          <ul className="space-y-4">
            {data.map((item, index) => (
              <li key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700 font-medium">{item.region}</span>
                </div>
                <span className="font-bold text-gray-900">{item.percentage}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegionalDistribution;
