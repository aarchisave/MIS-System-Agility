import React from 'react';
import { FlaskConical, AlertTriangle, Clock, Activity, Search, Filter, Plus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const premixUtilizationData = [
  { day: 'Mon', utilized: 400, wasted: 12 },
  { day: 'Tue', utilized: 450, wasted: 10 },
  { day: 'Wed', utilized: 380, wasted: 25 },
  { day: 'Thu', utilized: 500, wasted: 5 },
  { day: 'Fri', utilized: 490, wasted: 8 },
  { day: 'Sat', utilized: 300, wasted: 2 },
  { day: 'Sun', utilized: 0, wasted: 0 },
];

const premixBatches = [
  { id: 'PX-101', name: 'Spicy Seasoning Mix', date: '2026-05-10', prepared: '150 kg', used: '120 kg', remaining: '30 kg', shelf: '5 Days', expiry: '2026-05-15', status: 'Healthy' },
  { id: 'PX-102', name: 'Cheese Flavoring', date: '2026-05-11', prepared: '80 kg', used: '20 kg', remaining: '60 kg', shelf: '3 Days', expiry: '2026-05-14', status: 'Expiring Soon' },
  { id: 'PX-103', name: 'Salt & Pepper Base', date: '2026-05-09', prepared: '200 kg', used: '200 kg', remaining: '0 kg', shelf: '7 Days', expiry: '2026-05-16', status: 'Consumed' },
  { id: 'PX-104', name: 'BBQ Rub', date: '2026-05-12', prepared: '100 kg', used: '0 kg', remaining: '100 kg', shelf: '4 Days', expiry: '2026-05-16', status: 'Unused' },
  { id: 'PX-105', name: 'Tomato Tangy Mix', date: '2026-05-08', prepared: '50 kg', used: '10 kg', remaining: '40 kg', shelf: '4 Days', expiry: '2026-05-12', status: 'Expired' },
];

export default function Premix() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Premix Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track premix batches, shelf life, and utilization.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button className="btn-primary shadow-sm shadow-agility-green/30 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Premix Batch
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Active Premix Batches</h3>
            <div className="p-2 bg-agility-green/10 text-agility-green rounded-lg"><FlaskConical className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">14</div>
          <p className="text-sm text-gray-500 mt-1">Ready for production</p>
        </div>
        <div className="glass-card border-orange-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Expiring &lt; 24 Hrs</h3>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Clock className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-orange-600">3</div>
          <p className="text-sm text-orange-500 mt-1">Requires immediate use</p>
        </div>
        <div className="glass-card border-red-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Wastage Risk Volume</h3>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-red-600">85 kg</div>
          <p className="text-sm text-red-500 mt-1">Value: ~$420</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Utilization Rate</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Activity className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">92.4%</div>
          <p className="text-sm text-gray-500 mt-1">Average this week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Utilization Chart */}
        <div className="glass-card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900">Premix Utilization vs Wastage (Weekly)</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={premixUtilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="utilized" stackId="1" stroke="#57C84D" fill="#57C84D" fillOpacity={0.6} name="Utilized (kg)" />
                <Area type="monotone" dataKey="wasted" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Wasted (kg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shelf Life Alerts */}
        <div className="glass-card flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-4">Shelf Life Countdown</h3>
          <div className="space-y-4 flex-1">
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm text-red-800">PX-105: Tomato Tangy Mix</span>
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">EXPIRED</span>
              </div>
              <p className="text-xs text-red-600">40 kg remaining • Wasted</p>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm text-orange-800">PX-102: Cheese Flavoring</span>
                <span className="text-xs font-bold text-orange-600">12 hrs left</span>
              </div>
              <p className="text-xs text-orange-600">60 kg remaining • Action Required</p>
              <div className="w-full bg-orange-200 rounded-full h-1.5 mt-2">
                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm text-blue-800">PX-101: Spicy Seasoning</span>
                <span className="text-xs font-bold text-blue-600">3 days left</span>
              </div>
              <p className="text-xs text-blue-600">30 kg remaining</p>
            </div>
          </div>
        </div>
      </div>

      {/* Premix Batch Table */}
      <div className="glass-card !p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-semibold text-gray-900 text-lg">Premix Inventory Ledger</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search batch ID..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-agility-green focus:border-transparent" />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"><Filter className="w-4 h-4 text-gray-600" /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="table-header">Premix ID</th>
                <th className="table-header">Name</th>
                <th className="table-header">Batch Date</th>
                <th className="table-header">Prepared</th>
                <th className="table-header">Used</th>
                <th className="table-header">Remaining</th>
                <th className="table-header">Expiry Date</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {premixBatches.map((batch, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell font-medium text-gray-900">{batch.id}</td>
                  <td className="table-cell">{batch.name}</td>
                  <td className="table-cell text-gray-500">{batch.date}</td>
                  <td className="table-cell">{batch.prepared}</td>
                  <td className="table-cell">{batch.used}</td>
                  <td className="table-cell font-medium">{batch.remaining}</td>
                  <td className="table-cell text-gray-500">{batch.expiry}</td>
                  <td className="table-cell">
                    <span className={`status-badge ${
                      batch.status === 'Healthy' ? 'bg-green-100 text-green-700' :
                      batch.status === 'Expiring Soon' ? 'bg-orange-100 text-orange-700' :
                      batch.status === 'Expired' ? 'bg-red-100 text-red-700' :
                      batch.status === 'Consumed' ? 'bg-gray-200 text-gray-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {batch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
