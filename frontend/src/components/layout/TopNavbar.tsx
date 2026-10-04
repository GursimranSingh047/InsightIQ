import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

const TopNavbar: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-10">
      {/* Search Bar */}
      <div className="flex-1 max-w-2xl relative flex items-center">
        <Search className="absolute left-3 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Ask a question about your data..." 
          className="w-full pl-10 pr-12 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
        />
        <div className="absolute right-3 border border-gray-200 rounded text-gray-400 px-1.5 py-0.5 text-[10px] font-medium bg-white">
          ⌘ K
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4 pl-4">
        {/* Dataset Selector */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
          <span className="text-sm font-medium text-gray-700">Amazon Sales.csv</span>
          <ChevronDown size={14} className="text-gray-500" />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-px bg-gray-200 mx-1"></div>

        {/* Profile */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm overflow-hidden shrink-0">
            {/* If we had an image it would go here, else initials */}
            GS
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Gursimran Singh</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
