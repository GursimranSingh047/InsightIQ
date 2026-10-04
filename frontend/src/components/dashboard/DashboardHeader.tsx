import React from 'react';
import { Download, Share2, MessageSquare } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Amazon Sales Analysis</h1>
        <div className="flex items-center text-sm text-gray-500 mt-1.5 space-x-2">
          <span>48,349 rows</span>
          <span className="text-gray-300">|</span>
          <span>16 columns</span>
          <span className="text-gray-300">|</span>
          <span>Last updated: Oct 1, 2026</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
          <Download size={16} />
          <span>Export Report</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
          <Share2 size={16} />
          <span>Share</span>
        </button>
        <button className="flex items-center space-x-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm shadow-blue-500/20">
          <MessageSquare size={16} />
          <span>Ask Your Data</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
