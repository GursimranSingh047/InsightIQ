export const demoData = {
  kpis: [
    {
      title: "Total Revenue",
      value: "₹8.7 Cr",
      change: "+13.2%",
      trend: "up",
      subtitle: "vs. previous period",
      icon: "indian-rupee"
    },
    {
      title: "Total Profit",
      value: "₹1.8 Cr",
      change: "+9.4%",
      trend: "up",
      subtitle: "vs. previous period",
      icon: "bar-chart-2"
    },
    {
      title: "Total Orders",
      value: "24,891",
      change: "+11.7%",
      trend: "up",
      subtitle: "vs. previous period",
      icon: "shopping-cart"
    },
    {
      title: "Top Region",
      value: "West",
      change: null,
      trend: "neutral",
      subtitle: "46% of total profit",
      icon: "globe"
    },
    {
      title: "Highest Profit Category",
      value: "Electronics",
      change: null,
      trend: "neutral",
      subtitle: "₹6.2 Cr profit",
      icon: "trophy"
    },
    {
      title: "Lowest Margin Category",
      value: "Furniture",
      change: null,
      trend: "down",
      subtitle: "7.2% margin",
      icon: "alert-triangle",
      isWarning: true
    }
  ],
  revenueTrend: [
    { month: 'Jan', revenue: 0.2 },
    { month: 'Feb', revenue: 0.3 },
    { month: 'Mar', revenue: 0.4 },
    { month: 'Apr', revenue: 0.45 },
    { month: 'May', revenue: 0.5 },
    { month: 'Jun', revenue: 0.6 },
    { month: 'Jul', revenue: 0.8 },
    { month: 'Aug', revenue: 0.9 },
    { month: 'Sep', revenue: 1.0 },
    { month: 'Oct', revenue: 1.05 },
    { month: 'Nov', revenue: 1.15 },
    { month: 'Dec', revenue: 1.3 }
  ],
  profitByRegion: [
    { region: 'West', profit: 1.8 },
    { region: 'North', profit: 1.2 },
    { region: 'South', profit: 0.9 },
    { region: 'East', profit: 0.7 }
  ],
  topCategories: [
    { name: 'Electronics', value: 42, fill: '#3b82f6' },
    { name: 'Clothing', value: 23, fill: '#8b5cf6' },
    { name: 'Home & Kitchen', value: 15, fill: '#10b981' },
    { name: 'Books', value: 11, fill: '#6366f1' },
    { name: 'Furniture', value: 9, fill: '#f59e0b' }
  ],
  salesByCategory: [
    { category: 'Electronics', sales: 2.8 },
    { category: 'Clothing', sales: 1.9 },
    { category: 'Home & Kitchen', sales: 1.4 },
    { category: 'Books', sales: 0.9 },
    { category: 'Furniture', sales: 0.7 }
  ],
  salesDistribution: [
    { region: 'West', percentage: 46, color: '#1d4ed8' },
    { region: 'North', percentage: 28, color: '#3b82f6' },
    { region: 'South', percentage: 16, color: '#60a5fa' },
    { region: 'East', percentage: 10, color: '#93c5fd' }
  ],
  anomalies: [
    { date: '2026-07-15', metric: 'Daily Sales', value: '₹12.4 L', expected: '₹4.1 L', deviation: '+202%' },
    { date: '2026-08-03', metric: 'Order Count', value: '1,240', expected: '620', deviation: '+100%' },
    { date: '2026-08-18', metric: 'Return Rate', value: '8.7%', expected: '3.1%', deviation: '+181%' }
  ],
  forecast: [
    { month: 'Jan', historical: 0.2, forecast: null },
    { month: 'Feb', historical: 0.3, forecast: null },
    { month: 'Mar', historical: 0.4, forecast: null },
    { month: 'Apr', historical: 0.45, forecast: null },
    { month: 'May', historical: 0.5, forecast: null },
    { month: 'Jun', historical: 0.6, forecast: null },
    { month: 'Jul', historical: 0.8, forecast: null },
    { month: 'Aug', historical: 0.9, forecast: 0.9 },
    { month: 'Sep', historical: null, forecast: 1.0 },
    { month: 'Oct', historical: null, forecast: 1.1 },
    { month: 'Nov', historical: null, forecast: 1.25 },
    { month: 'Dec', historical: null, forecast: 1.4 }
  ]
};
