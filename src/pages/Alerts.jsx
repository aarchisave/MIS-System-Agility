import React from 'react';
import { Bell, AlertTriangle, AlertOctagon, Info, CheckCircle } from 'lucide-react';

const alerts = [
  { id: 1, type: 'critical', category: 'Inventory', title: 'Citric Acid Stock Critical', desc: 'Current stock is 45kg. Minimum threshold is 50kg.', time: '10 mins ago', status: 'Unresolved' },
  { id: 2, type: 'warning', category: 'Premix', title: 'Batch PX-102 Expiring', desc: 'Cheese Flavoring batch will expire in 12 hours.', time: '1 hr ago', status: 'Unresolved' },
  { id: 3, type: 'critical', category: 'Production', title: 'Temperature Anomaly M-02', desc: 'Fryer M-02 exceeded safe temperature limits (190°C).', time: '2 hrs ago', status: 'Resolved' },
  { id: 4, type: 'info', category: 'Maintenance', title: 'Fumigation Due', desc: 'Warehouse A scheduled for fumigation tomorrow 08:00 AM.', time: '3 hrs ago', status: 'Unresolved' },
  { id: 5, type: 'warning', category: 'Logistics', title: 'Dispatch Delayed', desc: 'Shipment DSP-8822 delayed at loading bay by 45 mins.', time: '4 hrs ago', status: 'Unresolved' },
];

export default function Alerts() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alerts & Notifications Center</h1>
          <p className="text-sm text-gray-500 mt-1">Centralized operational issue monitoring and resolution workflow.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card border-red-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Critical Alerts</h3>
            <AlertOctagon className="text-red-500 w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-red-600 mt-2">2</p>
        </div>
        <div className="glass-card border-orange-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Warnings</h3>
            <AlertTriangle className="text-orange-500 w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-orange-600 mt-2">5</p>
        </div>
        <div className="glass-card">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Resolved Today</h3>
            <CheckCircle className="text-agility-green w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">14</p>
        </div>
      </div>

      <div className="glass-card !p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <h3 className="font-semibold text-gray-900 text-lg">Active Notification Feed</h3>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 bg-white focus:ring-agility-green focus:border-agility-green">
              <option>All Severities</option>
              <option>Critical</option>
              <option>Warning</option>
              <option>Info</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 flex gap-4 ${alert.status === 'Resolved' ? 'opacity-50' : 'hover:bg-gray-50'}`}>
              <div className="mt-1">
                {alert.type === 'critical' ? <AlertOctagon className="w-6 h-6 text-red-500" /> :
                 alert.type === 'warning' ? <AlertTriangle className="w-6 h-6 text-orange-500" /> :
                 <Info className="w-6 h-6 text-blue-500" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{alert.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block mb-1">{alert.time}</span>
                    {alert.status === 'Unresolved' ? (
                      <button className="text-xs text-blue-600 hover:text-blue-800 font-medium border border-blue-200 bg-blue-50 px-2 py-1 rounded">Mark Resolved</button>
                    ) : (
                      <span className="text-xs text-green-600 font-medium">Resolved</span>
                    )}
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">{alert.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
