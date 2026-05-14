import React from 'react';
import { Box, Timer, AlertOctagon, CheckSquare, Search, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const packagingEfficiencyData = [
  { time: '08:00', target: 500, actual: 480 },
  { time: '10:00', target: 500, actual: 510 },
  { time: '12:00', target: 500, actual: 450 },
  { time: '14:00', target: 500, actual: 500 },
  { time: '16:00', target: 500, actual: 520 },
  { time: '18:00', target: 500, actual: 490 },
];

const packagingQueue = [
  { id: 'B-2092', product: 'Cheese Balls (50g)', prodTime: '10:15 AM', status: 'In Progress', pending: '15 mins', operator: 'Rajesh K.', targetWt: '50.0g', actualWt: '50.2g', overfill: '+0.4%' },
  { id: 'B-2093', product: 'Salted Peanuts (100g)', prodTime: '11:00 AM', status: 'Pending', pending: '45 mins', operator: '-', targetWt: '100.0g', actualWt: '-', overfill: '-' },
  { id: 'B-2090', product: 'Spicy Wafers (200g)', prodTime: '09:00 AM', status: 'Completed', pending: '0 mins', operator: 'Amit S.', targetWt: '200.0g', actualWt: '201.5g', overfill: '+0.75%' },
  { id: 'B-2094', product: 'Diet Mixture (250g)', prodTime: '12:30 PM', status: 'Delayed', pending: '2 hrs', operator: '-', targetWt: '250.0g', actualWt: '-', overfill: '-' },
  { id: 'B-2091', product: 'Tomato Tangy (50g)', prodTime: '09:45 AM', status: 'Completed', pending: '0 mins', operator: 'Priya M.', targetWt: '50.0g', actualWt: '51.0g', overfill: '+2.0%' },
];

export default function Packaging() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Packaging & Batch Tracking</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor packaging queues, overfill margins, and bottlenecks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Pending Batches</h3>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Timer className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">4</div>
          <p className="text-sm text-gray-500 mt-1">Waiting for packaging</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Avg Overfill Margin</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Box className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">1.2%</div>
          <p className="text-sm text-agility-green mt-1">Within acceptable limits</p>
        </div>
        <div className="glass-card border-red-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Contamination Risk</h3>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertOctagon className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-red-600">0</div>
          <p className="text-sm text-red-500 mt-1">Flavor changeover clear</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Packets Today</h3>
            <div className="p-2 bg-agility-green/10 text-agility-green rounded-lg"><CheckSquare className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">18,450</div>
          <p className="text-sm text-gray-500 mt-1">Total finished goods</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900">Packaging Efficiency (Units/Hr)</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={packagingEfficiencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip cursor={{fill: '#F3F4F6'}} />
                <Bar dataKey="actual" fill="#57C84D" radius={[4, 4, 0, 0]} name="Actual Output" />
                <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} name="Target Output" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-4">Packaging Delay Alerts</h3>
          <div className="space-y-4">
             <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm text-red-800">Diet Mixture</span>
                <span className="text-xs font-bold text-red-600">2 Hrs Delayed</span>
              </div>
              <p className="text-xs text-red-600">Batch B-2094 sitting unpacked. Quality risk.</p>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm text-orange-800">Salted Peanuts</span>
                <span className="text-xs font-bold text-orange-600">45 Mins Pending</span>
              </div>
              <p className="text-xs text-orange-600">Batch B-2093 queued at Packaging Line 2.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card !p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 text-lg">Packaging Queue & Status</h3>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"><Filter className="w-4 h-4 text-gray-600" /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="table-header">Batch ID</th>
                <th className="table-header">Product</th>
                <th className="table-header">Prod Time</th>
                <th className="table-header">Status</th>
                <th className="table-header">Pending Dur.</th>
                <th className="table-header">Operator</th>
                <th className="table-header">Weight (T/A)</th>
                <th className="table-header">Overfill %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {packagingQueue.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell font-medium text-gray-900">{item.id}</td>
                  <td className="table-cell">{item.product}</td>
                  <td className="table-cell text-gray-500">{item.prodTime}</td>
                  <td className="table-cell">
                    <span className={`status-badge ${
                      item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      item.status === 'Delayed' ? 'bg-red-100 text-red-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="table-cell">{item.pending}</td>
                  <td className="table-cell">{item.operator}</td>
                  <td className="table-cell text-gray-500">{item.targetWt} / <span className="text-gray-900 font-medium">{item.actualWt}</span></td>
                  <td className={`table-cell font-medium ${parseFloat(item.overfill) > 1.0 ? 'text-red-500' : 'text-agility-green'}`}>
                    {item.overfill}
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
