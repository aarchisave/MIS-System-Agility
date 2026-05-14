import React from 'react';
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
            Last updated: Just now
          </div>
          <button className="btn-primary flex items-center shadow-sm shadow-agility-green/30">
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard 
          title="Total Revenue" 
          value="$1.2M" 
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

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900">Revenue & Growth Trend</h3>
            <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-agility-green focus:ring focus:ring-agility-green/20">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#57C84D" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#57C84D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#111827', fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="value" stroke="#57C84D" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900">Weekly Production</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip cursor={{fill: '#F3F4F6'}} />
                <Bar dataKey="completed" fill="#57C84D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
              Critical Operational Alerts
            </h3>
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">3 New</span>
          </div>
          <div className="space-y-4 flex-1">
            <AlertItem 
              type="critical" 
              title="Low Inventory: Citric Acid" 
              desc="Current stock (45kg) is below minimum threshold (50kg)."
              time="10 mins ago"
            />
            <AlertItem 
              type="warning" 
              title="Premix Expiring Soon" 
              desc="Batch PX-104 (120kg) expires in 48 hours."
              time="1 hr ago"
            />
            <AlertItem 
              type="info" 
              title="Fumigation Scheduled" 
              desc="Warehouse A fumigation due tomorrow at 08:00 AM."
              time="3 hrs ago"
            />
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
            <ActivityItem 
              status="pending"
              title="Dispatch Loading: Order #882"
              desc="Vehicle: MH-12-AB-1234 • Client: FoodCo"
              time="09:30 AM"
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
