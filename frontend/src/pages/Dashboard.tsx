import React from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import KPICard from '../components/dashboard/KPICard';
import RevenueChart from '../components/dashboard/RevenueChart';
import ProfitByRegion from '../components/dashboard/ProfitByRegion';
import CategoryProfitChart from '../components/dashboard/CategoryProfitChart';
import SalesByCategory from '../components/dashboard/SalesByCategory';
import RegionalDistribution from '../components/dashboard/RegionalDistribution';
import AISummary from '../components/dashboard/AISummary';
import AnomalyTable from '../components/dashboard/AnomalyTable';
import ForecastChart from '../components/dashboard/ForecastChart';
import { demoData } from '../data/demoData';

const Dashboard: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 pb-12">
      <DashboardHeader />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-6">
        {demoData.kpis.map((kpi, index) => (
          <KPICard 
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend as any}
            subtitle={kpi.subtitle}
            icon={kpi.icon}
            isWarning={kpi.isWarning}
          />
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-6 mb-6">
        <div className="w-full xl:w-3/4 flex flex-col gap-6">
          {/* Top Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart data={demoData.revenueTrend} />
            </div>
            <div className="lg:col-span-1">
              <ProfitByRegion data={demoData.profitByRegion} />
            </div>
          </div>
          
          {/* Middle Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SalesByCategory data={demoData.salesByCategory} />
            </div>
            <div className="lg:col-span-1">
              <RegionalDistribution data={demoData.salesDistribution} />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnomalyTable data={demoData.anomalies} />
            <ForecastChart data={demoData.forecast} />
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="w-full xl:w-1/4 flex flex-col gap-6">
          <CategoryProfitChart data={demoData.topCategories} />
          <div className="flex-1 min-h-[400px]">
            <AISummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
