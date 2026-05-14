import React, { useState, useEffect } from 'react';
import { Truck, MapPin, CheckCircle, Clock, Navigation } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const dispatchHistory = [
  { id: 'DSP-8821', client: 'Haldiram', product: 'Onion Kodubale (1000 cartons)', vehicle: 'MH-12-AB-1234', date: '2026-05-12', dStatus: 'Dispatched', delStatus: 'In Transit' },
  { id: 'DSP-8822', client: 'Swiggy', product: 'Butter Murukku (500 cartons)', vehicle: 'MH-14-XY-9087', date: '2026-05-12', dStatus: 'Loading', delStatus: 'Pending' },
  { id: 'DSP-8820', client: 'Haldiram', product: 'Khara Boondi (250 cartons)', vehicle: 'GJ-01-LM-4455', date: '2026-05-11', dStatus: 'Dispatched', delStatus: 'Delivered' },
];

const dispatchTrends = [
  { day: 'Mon', shipments: 12 },
  { day: 'Tue', shipments: 15 },
  { day: 'Wed', shipments: 10 },
  { day: 'Thu', shipments: 18 },
  { day: 'Fri', shipments: 22 },
  { day: 'Sat', shipments: 8 },
  { day: 'Sun', shipments: 4 },
];

export default function Dispatch() {
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

  const filteredHistory = selectedClient 
    ? dispatchHistory.filter(h => h.client === selectedClient)
    : dispatchHistory;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dispatch & Logistics</h1>
          <p className="text-sm text-gray-500 mt-1">Manage shipments, track delivery vehicles, and logistics history.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <select 
            value={selectedClient} 
            onChange={(e) => setSelectedClient(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:ring-agility-green focus:border-agility-green shadow-sm"
          >
            <option value="">All Clients</option>
            {clients.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button className="btn-primary shadow-sm shadow-agility-green/30">
            Schedule Dispatch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Vehicles in Transit</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">8</div>
          <p className="text-sm text-gray-500 mt-1">Active shipments</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Pending Loading</h3>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Clock className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">3</div>
          <p className="text-sm text-orange-500 mt-1">Requires bay allocation</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Delivered Today</h3>
            <div className="p-2 bg-agility-green/10 text-agility-green rounded-lg"><CheckCircle className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">12</div>
          <p className="text-sm text-gray-500 mt-1">100% on-time delivery</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Fleet Efficiency</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Navigation className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">94%</div>
          <p className="text-sm text-gray-500 mt-1">Route optimization score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900">Shipment Volume Trend (Weekly)</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dispatchTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDispatch" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="shipments" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorDispatch)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card flex flex-col">
          <h3 className="font-semibold text-gray-900 mb-4">Live Tracking Alerts</h3>
          <div className="space-y-4">
             <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm text-red-800">MH-14-XY-9087</span>
                <span className="text-xs font-bold text-red-600">Delayed Loading</span>
              </div>
              <p className="text-xs text-red-600">Dispatch DSP-8822 waiting for 45 mins at Bay 3.</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm text-blue-800">MH-12-AB-1234</span>
                <span className="text-xs font-bold text-blue-600">In Transit</span>
              </div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <MapPin className="w-3 h-3 mr-1" /> 20km from Reliance Fresh HQ
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card !p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 text-lg">Dispatch History & Active Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="table-header">Dispatch ID</th>
                <th className="table-header">Client Name</th>
                <th className="table-header">Product & Qty</th>
                <th className="table-header">Vehicle</th>
                <th className="table-header">Date</th>
                <th className="table-header">Dispatch Status</th>
                <th className="table-header">Delivery Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHistory.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell font-medium text-gray-900">{item.id}</td>
                  <td className="table-cell font-semibold text-gray-700">{item.client}</td>
                  <td className="table-cell text-gray-600">{item.product}</td>
                  <td className="table-cell text-gray-500">{item.vehicle}</td>
                  <td className="table-cell text-gray-500">{item.date}</td>
                  <td className="table-cell">
                    <span className={`status-badge ${
                      item.dStatus === 'Dispatched' ? 'bg-green-100 text-green-700' :
                      item.dStatus === 'Loading' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.dStatus}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${
                      item.delStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                      item.delStatus === 'In Transit' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {item.delStatus}
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
