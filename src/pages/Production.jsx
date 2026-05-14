import React from 'react';
import { 
  Factory, 
  Activity, 
  Settings as SettingsIcon, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  ThermometerSun,
  Wind
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

const productionTrendData = [
  { time: '08:00', yield: 95, target: 98 },
  { time: '10:00', yield: 96, target: 98 },
  { time: '12:00', yield: 92, target: 98 },
  { time: '14:00', yield: 97, target: 98 },
  { time: '16:00', yield: 98, target: 98 },
  { time: '18:00', yield: 99, target: 98 },
];

const batchData = [
  { id: 'B-2091', product: 'Spicy Potato Wafers', input: '500 kg', output: '485 kg', yield: '97.0%', machine: 'M-01', temp: '180°C', ppm: '45', status: 'Completed' },
  { id: 'B-2092', product: 'Cheese Balls', input: '300 kg', output: '290 kg', yield: '96.6%', machine: 'E-04', temp: '160°C', ppm: '30', status: 'Completed' },
  { id: 'B-2093', product: 'Salted Peanuts', input: '400 kg', output: '-', yield: '-', machine: 'R-02', temp: '150°C', ppm: '20', status: 'In Progress' },
  { id: 'B-2094', product: 'Corn Rings', input: '250 kg', output: '-', yield: '-', machine: 'E-03', temp: '175°C', ppm: '40', status: 'Mixing' },
  { id: 'B-2095', product: 'Diet Mixture', input: '600 kg', output: '-', yield: '-', machine: 'M-02', temp: '-', ppm: '-', status: 'Pending' },
];

export default function Production() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Production Management</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor real-time manufacturing, batches, and efficiency.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button className="btn-primary shadow-sm shadow-agility-green/30">
            Start New Batch
          </button>
        </div>
      </div>

      {/* Real-time Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Active Machines</h3>
            <div className="p-2 bg-agility-green/10 text-agility-green rounded-lg"><Factory className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">12 / 15</div>
          <p className="text-sm text-gray-500 mt-1">3 under maintenance</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Avg. Yield</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Activity className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">96.8%</div>
          <p className="text-sm text-gray-500 mt-1">+1.2% vs target</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Active Temp/PPM Alerts</h3>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><ThermometerSun className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-red-600">2</div>
          <p className="text-sm text-red-500 mt-1">Requires adjustment</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Daily Target</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><CheckCircle className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">65%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-agility-green h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Yield Chart */}
        <div className="glass-card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900">Yield Percentage Analytics (Today)</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productionTrendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="yield" stroke="#57C84D" strokeWidth={3} dot={{r: 4}} name="Actual Yield %" />
                <Line type="monotone" dataKey="target" stroke="#9CA3AF" strokeDasharray="5 5" strokeWidth={2} dot={false} name="Target Yield %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Machine Status */}
        <div className="glass-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900">Machine Status</h3>
            <SettingsIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { id: 'M-01', name: 'Continuous Fryer 1', status: 'Running', temp: '180°C' },
              { id: 'M-02', name: 'Continuous Fryer 2', status: 'Maintenance', temp: 'Off' },
              { id: 'E-03', name: 'Extruder Alpha', status: 'Running', temp: '175°C' },
              { id: 'E-04', name: 'Extruder Beta', status: 'Idle', temp: 'Off' },
              { id: 'R-02', name: 'Roaster Unit B', status: 'Running', temp: '150°C' },
            ].map((machine, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${machine.status === 'Running' ? 'bg-agility-green' : machine.status === 'Idle' ? 'bg-yellow-400' : 'bg-red-500'}`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{machine.name}</div>
                    <div className="text-xs text-gray-500">{machine.id}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-700">{machine.temp}</div>
                  <div className="text-xs text-gray-500">{machine.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Batch Tracking Table */}
      <div className="glass-card !p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-semibold text-gray-900 text-lg">Batch Tracking Lifecycle</h3>
          <div className="flex gap-2 text-sm">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 bg-white focus:ring-agility-green focus:border-agility-green">
              <option>All Stages</option>
              <option>Mixing</option>
              <option>Frying</option>
              <option>Packaging</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="table-header">Batch ID</th>
                <th className="table-header">Product Name</th>
                <th className="table-header">Input Qty</th>
                <th className="table-header">Output Qty</th>
                <th className="table-header">Yield %</th>
                <th className="table-header">Machine</th>
                <th className="table-header">Temp / PPM</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {batchData.map((batch, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell font-medium text-gray-900">{batch.id}</td>
                  <td className="table-cell">{batch.product}</td>
                  <td className="table-cell">{batch.input}</td>
                  <td className="table-cell font-medium">{batch.output}</td>
                  <td className={`table-cell font-medium ${batch.yield === '-' ? 'text-gray-400' : parseFloat(batch.yield) >= 97 ? 'text-agility-green' : 'text-orange-500'}`}>
                    {batch.yield}
                  </td>
                  <td className="table-cell">{batch.machine}</td>
                  <td className="table-cell text-gray-500">
                    {batch.temp !== '-' ? (
                      <span className="flex items-center gap-1">
                        <ThermometerSun className="w-3 h-3" /> {batch.temp} / <Wind className="w-3 h-3 ml-1" /> {batch.ppm}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${
                      batch.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      batch.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      batch.status === 'Mixing' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
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
