import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingDown, PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const expenseData = [
  { month: 'Jan', revenue: 120000, expenses: 85000 },
  { month: 'Feb', revenue: 135000, expenses: 90000 },
  { month: 'Mar', revenue: 150000, expenses: 95000 },
  { month: 'Apr', revenue: 140000, expenses: 88000 },
  { month: 'May', revenue: 165000, expenses: 105000 },
];

const costBreakdownData = [
  { category: 'Raw Materials', cost: 45000 },
  { category: 'Labor', cost: 25000 },
  { category: 'Logistics', cost: 15000 },
  { category: 'Utilities', cost: 10000 },
  { category: 'Packaging', cost: 10000 },
];

export default function Finance() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch(`${API_URL}/clients`);
      const result = await response.json();
      if (result.status === 'success') setClients(result.data);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finance & Expense Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor revenue, analyze costs, and track profit margins.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <select 
            value={selectedClient} 
            onChange={(e) => setSelectedClient(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:ring-agility-green focus:border-agility-green shadow-sm"
          >
            <option value="">All Clients</option>
            {clients.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Gross Revenue (MTD)</h3>
            <div className="p-2 bg-agility-green/10 text-agility-green rounded-lg"><DollarSign className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">₹1,65,000</div>
          <p className="text-sm text-agility-green mt-1 flex items-center"><ArrowUpRight className="w-4 h-4 mr-1"/> +17.8% vs last month</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Total Expenses (MTD)</h3>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><TrendingDown className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">₹1,05,000</div>
          <p className="text-sm text-red-500 mt-1 flex items-center"><ArrowUpRight className="w-4 h-4 mr-1"/> +19.3% vs last month</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Net Profit Margin</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><PieChartIcon className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">36.3%</div>
          <p className="text-sm text-gray-500 mt-1">-1.2% due to material costs</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Wastage Cost Impact</h3>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><AlertTriangle className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-orange-600">₹4,250</div>
          <p className="text-sm text-gray-500 mt-1">2.5% of total expenses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900">Revenue vs Expenses</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip cursor={{fill: '#F3F4F6'}} />
                <Legend />
                <Bar dataKey="revenue" fill="#57C84D" radius={[4, 4, 0, 0]} name="Revenue (₹)" />
                <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} name="Expenses (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900">Cost Breakdown Analysis</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costBreakdownData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#3B82F6" strokeWidth={3} dot={{r: 4}} name="Cost (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
