import { useState } from 'react';
import axios from 'axios';
import { Database, FileSpreadsheet, LayoutDashboard, Settings, Sparkles, Activity, TrendingUp, AlertOctagon, Share2 } from 'lucide-react';
import FileUpload from './components/FileUpload';
import KPIBox from './components/KPIBox';
import DataTable from './components/DataTable';
import ForecastChart from './components/ForecastChart';
import AnomalyList from './components/AnomalyList';
import CorrelationMatrix from './components/CorrelationMatrix';
import AISummary from './components/AISummary';
import SqlTutor from './components/SqlTutor';

const API_BASE_URL = 'http://localhost:8888/api/v1';

function App() {
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tutor'>('dashboard');

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setProfileData(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/data/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfileData(response.data);
      setActiveTab('dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to upload dataset');
    } finally {
      setIsLoading(false);
    }
  };

  const navItemClass = (isActive: boolean) => 
    `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
      isActive 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-gray-100 flex items-center space-x-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Activity className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            InsightIQ
          </span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <div className={navItemClass(activeTab === 'dashboard')} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          <div className={navItemClass(false)}>
            <FileSpreadsheet size={20} />
            <span>Datasets</span>
          </div>
          <div 
            className={navItemClass(activeTab === 'tutor')} 
            onClick={() => {
              if (profileData) setActiveTab('tutor');
              else alert('Please upload a dataset first to use the SQL Tutor.');
            }}
          >
            <Sparkles size={20} />
            <span>AI SQL Tutor</span>
          </div>
          <div className={navItemClass(false)}>
            <Database size={20} />
            <span>Connections</span>
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-100">
          <div className={navItemClass(false)}>
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-semibold text-gray-800">
            {activeTab === 'dashboard' ? 'Analytics Dashboard' : 'AI SQL Tutor Mode'}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm shadow-sm">
              Connect Database
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {!profileData && (
            <div className="max-w-4xl mx-auto mt-10">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to InsightIQ</h2>
                <p className="text-gray-500 text-lg">Upload a dataset or connect a database to begin automated profiling and AI analytics.</p>
              </div>
              <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} error={error} />
            </div>
          )}

          {profileData && activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
              {/* Top Meta Info */}
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{profileData.filename}</h2>
                  <p className="text-gray-500">
                    {profileData.summary.rows.toLocaleString()} rows • {profileData.summary.columns} columns
                  </p>
                </div>
                <button 
                  onClick={() => setProfileData(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium bg-white shadow-sm"
                >
                  Upload Another Dataset
                </button>
              </div>

              {/* AI Executive Summary */}
              <AISummary profileData={profileData} />

              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPIBox title="Total Rows" value={profileData.summary.rows} />
                <KPIBox title="Columns" value={profileData.summary.columns} />
                <KPIBox title="Duplicate Rows" value={profileData.summary.duplicate_rows} />
                {profileData.kpis.map((kpi: any, idx: number) => (
                  <KPIBox key={idx} title={kpi.name} value={kpi.value} format={kpi.format} />
                ))}
              </div>
              
              {/* Advanced Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Forecasting */}
                {profileData.forecast && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2">
                    <div className="p-6 border-b border-gray-100 flex items-center space-x-2">
                      <TrendingUp className="text-blue-600" size={20} />
                      <h3 className="text-lg font-bold text-gray-900">AI Forecasting ({profileData.forecast.metric})</h3>
                    </div>
                    <div className="p-6">
                      <ForecastChart data={profileData.forecast} />
                    </div>
                  </div>
                )}
                
                {/* Correlation Matrix */}
                {profileData.correlations && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2">
                    <div className="p-6 border-b border-gray-100 flex items-center space-x-2">
                      <Share2 className="text-indigo-600" size={20} />
                      <h3 className="text-lg font-bold text-gray-900">Correlation Analysis</h3>
                    </div>
                    <div className="p-6">
                      <CorrelationMatrix data={profileData.correlations} />
                    </div>
                  </div>
                )}
                
                {/* Anomalies */}
                {profileData.anomalies && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden lg:col-span-2">
                    <div className="p-6 border-b border-gray-100 flex items-center space-x-2">
                      <AlertOctagon className="text-red-600" size={20} />
                      <h3 className="text-lg font-bold text-gray-900">Anomaly Detection</h3>
                    </div>
                    <div className="p-0">
                      <AnomalyList anomalies={profileData.anomalies} />
                    </div>
                  </div>
                )}
              </div>

              {/* Data Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Data Preview</h3>
                  <p className="text-sm text-gray-500 mt-1">Showing first 10 rows</p>
                </div>
                <div className="p-0">
                  <DataTable 
                    data={profileData.preview} 
                    columns={profileData.columns.map((c: any) => c.name)} 
                  />
                </div>
              </div>
            </div>
          )}

          {profileData && activeTab === 'tutor' && (
            <SqlTutor 
              schemaInfo={{ columns: profileData.columns }} 
              datasetName={profileData.filename} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
