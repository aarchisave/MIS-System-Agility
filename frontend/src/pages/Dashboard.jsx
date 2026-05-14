import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  Truck, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const productionData = [
  { name: 'Mon', completed: 400, target: 500 },
  { name: 'Tue', completed: 450, target: 500 },
  { name: 'Wed', completed: 520, target: 500 },
  { name: 'Thu', completed: 480, target: 500 },
  { name: 'Fri', completed: 550, target: 500 },
  { name: 'Sat', completed: 300, target: 300 },
  { name: 'Sun', completed: 0, target: 0 },
];

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_URL}/production/alerts`);
        const result = await response.json();
        if (result.status === 'success') {
          const merged = [
            ...result.data.system_alerts.map(a => ({ ...a, type: 'critical', category: 'System' })),
            ...result.data.contamination_risks.map(r => ({ ...r, type: 'warning', message: `Batch ${r.batch_number} at risk`, category: 'Quality' }))
          ];
          setAlerts(merged.slice(0, 3));
        }
      } catch (error) {
        console.error('Dashboard Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time operational overview for Agility Food Products.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 flex items-center shadow-sm">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard 
          title="Total Revenue" 
          value="₹12.5L" 
          trend="+12.5%" 
          isPositive={true}
          icon={TrendingUp}
          color="bg-blue-50 text-blue-600"
        />
        <KPICard 
          title="Total Production" 
          value="45,200 kg" 
          trend="+8.2%" 
          isPositive={true}
          icon={Activity}
          color="bg-agility-green/10 text-agility-green"
        />
        <KPICard 
          title="Active Orders" 
          value="124" 
          trend="-2.4%" 
          isPositive={false}
          icon={ShoppingCart}
          color="bg-orange-50 text-orange-600"
        />
        <KPICard 
          title="Pending Dispatch" 
          value="18" 
          trend="Critical" 
          isPositive={false}
          icon={Truck}
          color="bg-red-50 text-red-600"
        />
      </div>

      {/* Alerts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
              Critical Operational Alerts
            </h3>
            {!loading && alerts.length > 0 && (
              <span className="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{alerts.length} New</span>
            )}
          </div>
          <div className="space-y-4 flex-1">
            {loading ? (
              <div className="p-4 text-center text-gray-400">Loading alerts...</div>
            ) : alerts.length === 0 ? (
              <div className="p-4 text-center text-gray-400">No active alerts.</div>
            ) : (
              alerts.map((alert, i) => (
                <AlertItem 
                  key={i}
                  type={alert.type || 'info'} 
                  title={alert.type === 'critical' ? 'System Alert' : 'Contamination Risk'} 
                  desc={alert.message}
                  time={new Date(alert.created_at || alert.produced_at).toLocaleTimeString()}
                />
              ))
            )}
          </div>
          <button className="mt-4 w-full py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            View All Alerts
          </button>
        </div>

        <div className="glass-card flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900">Recent Production Activity</h3>
          </div>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent flex-1">
            <ActivityItem 
              status="completed"
              title="Batch B-2092 Packaged"
              desc="Operator: John D. • Yield: 98.2%"
              time="10:45 AM"
            />
            <ActivityItem 
              status="in-progress"
              title="Mixing Phase: Batch B-2093"
              desc="Machine: Mixer M-02 • Temp: 45°C"
              time="10:15 AM"
            />
          </div>
          <button className="mt-4 w-full py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            View Full Feed
          </button>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, trend, isPositive, icon: Icon, color }) {
  return (
    <div className="glass-card flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`flex items-center font-medium ${isPositive ? 'text-agility-green' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {trend}
        </span>
        <span className="text-gray-400 ml-2">vs last month</span>
      </div>
    </div>
  );
}

function AlertItem({ type, title, desc, time }) {
  const colors = {
    critical: 'border-red-500 bg-red-50 text-red-700',
    warning: 'border-orange-500 bg-orange-50 text-orange-700',
    info: 'border-blue-500 bg-blue-50 text-blue-700',
  };

  return (
    <div className={`p-3 rounded-lg border-l-4 ${colors[type]} bg-opacity-50`}>
      <div className="flex justify-between items-start">
        <h5 className="font-semibold text-sm">{title}</h5>
        <span className="text-xs font-medium opacity-70">{time}</span>
      </div>
      <p className="text-sm mt-1 opacity-90">{desc}</p>
    </div>
  );
}

function ActivityItem({ status, title, desc, time }) {
  const statusColors = {
    completed: 'bg-agility-green',
    'in-progress': 'bg-blue-500',
    pending: 'bg-gray-300',
  };

  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
      <div className={`flex items-center justify-center w-3 h-3 rounded-full border-4 box-content border-white ${statusColors[status]} shadow-sm md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2`}></div>
      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-1">
          <h5 className="font-semibold text-sm text-gray-900">{title}</h5>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-xs text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
