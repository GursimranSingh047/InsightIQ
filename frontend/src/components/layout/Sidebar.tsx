import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  BarChart2, 
  PieChart, 
  AlertTriangle, 
  TrendingUp, 
  Lightbulb, 
  MessageSquare, 
  Code, 
  Database, 
  FileText, 
  Settings,
  Upload,
  FileSpreadsheet
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { id: 'overview', path: '/', label: 'Overview', icon: LayoutDashboard },
    { id: 'explorer', path: '/explorer', label: 'Data Explorer', icon: Search },
    { id: 'kpis', path: '/kpis', label: 'KPIs & Metrics', icon: BarChart2 },
    { id: 'visualizations', path: '/visualizations', label: 'Visualizations', icon: PieChart },
    { id: 'anomalies', path: '/anomalies', label: 'Anomalies', icon: AlertTriangle },
    { id: 'forecasting', path: '/forecasting', label: 'Forecasting', icon: TrendingUp },
    { id: 'insights', path: '/insights', label: 'AI Insights', icon: Lightbulb },
    { id: 'ask', path: '/ask', label: 'Ask Your Data', icon: MessageSquare },
    { id: 'tutor', path: '/sql-tutor', label: 'SQL Tutor', icon: Code, badge: 'NEW' },
  ];

  const bottomItems = [
    { id: 'sources', path: '/data-sources', label: 'Data Sources', icon: Database },
    { id: 'reports', path: '/reports', label: 'Reports', icon: FileText },
    { id: 'settings', path: '/settings', label: 'Settings', icon: Settings },
  ];

  const renderNavItems = (items: any[]) => {
    return items.map((item) => {
      const isActive = currentPath === item.path;
      return (
        <Link
          key={item.id}
          to={item.path}
          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors ${
            isActive 
              ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-500/20' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-500'} />
            <span>{item.label}</span>
          </div>
          {item.badge && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
              {item.badge}
            </span>
          )}
        </Link>
      );
    });
  };

  return (
    <aside className="w-[240px] min-w-[240px] bg-[#0B1428] flex flex-col h-screen shrink-0 font-sans border-r border-slate-800">
      {/* Logo Area */}
      <div className="p-6 pb-2">
        <div className="flex items-center space-x-2.5 mb-1">
          <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center">
            <BarChart2 className="text-white" size={20} />
          </div>
          <span className="text-2xl font-semibold text-white tracking-tight">
            Insight<span className="text-blue-400">IQ</span>
          </span>
        </div>
        <p className="text-slate-500 text-xs pl-1 mt-1 font-medium">Turn Data Into Decisions</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        <nav className="space-y-1">
          {renderNavItems(navItems)}
        </nav>
        
        <div className="pt-4 border-t border-slate-800/60 space-y-1">
          {renderNavItems(bottomItems)}
        </div>
      </div>

      {/* Dataset Card */}
      <div className="p-4">
        <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
          <p className="text-xs text-slate-400 font-medium mb-3">Current Dataset</p>
          <div className="flex items-start space-x-3 mb-4">
            <div className="bg-blue-600/20 p-2 rounded flex items-center justify-center">
              <FileSpreadsheet className="text-blue-400" size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Amazon Sales.csv</p>
              <p className="text-[11px] text-slate-400 mt-0.5">48,349 rows • 16 columns</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center space-x-2 bg-slate-700/50 hover:bg-slate-700 text-slate-200 text-sm font-medium py-2.5 rounded-lg transition-colors border border-slate-600/50">
            <Upload size={16} />
            <span>Upload New Data</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
