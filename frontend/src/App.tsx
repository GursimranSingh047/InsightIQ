import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopNavbar from './components/layout/TopNavbar';
import Dashboard from './pages/Dashboard';
import SqlTutor from './components/SqlTutor';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-[#F5F7FB] text-[#111827] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#F5F7FB]">
          {children}
        </main>
      </div>
    </div>
  );
};

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500">This module is under construction.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/overview" element={<Navigate to="/" replace />} />
          <Route path="/explorer" element={<Placeholder title="Data Explorer" />} />
          <Route path="/kpis" element={<Placeholder title="KPIs & Metrics" />} />
          <Route path="/visualizations" element={<Placeholder title="Visualizations" />} />
          <Route path="/anomalies" element={<Placeholder title="Anomalies" />} />
          <Route path="/forecasting" element={<Placeholder title="Forecasting" />} />
          <Route path="/insights" element={<Placeholder title="AI Insights" />} />
          <Route path="/ask" element={<Placeholder title="Ask Your Data" />} />
          <Route path="/sql-tutor" element={
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-4xl mx-auto">
               <h2 className="text-2xl font-bold mb-4">AI SQL Tutor</h2>
               <p className="text-gray-500 mb-6">Learn SQL by asking questions about your data in plain English.</p>
               <SqlTutor 
                 schemaInfo={{ columns: [] }} 
                 datasetName="Amazon Sales.csv" 
               />
            </div>
          } />
          <Route path="/data-sources" element={<Placeholder title="Data Sources" />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
          <Route path="/settings" element={<Placeholder title="Settings" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
