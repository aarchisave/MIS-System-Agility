import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, AlertOctagon, Info, CheckCircle, Clock } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Alerts() {
  const [data, setData] = useState({ system_alerts: [], contamination_risks: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(`${API_URL}/production/alerts`);
        const result = await response.json();
        if (result.status === 'success') {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const allAlerts = [
    ...data.system_alerts.map(a => ({
      id: a.id,
      type: a.type === 'LOW_STOCK' ? 'critical' : 'warning',
      category: 'System',
      title: a.type.replace('_', ' '),
      desc: a.message,
      time: new Date(a.created_at).toLocaleTimeString(),
      status: a.is_resolved ? 'Resolved' : 'Unresolved'
    })),
    ...data.contamination_risks.map(r => ({
      id: r.id,
      type: 'critical',
      category: 'Quality',
      title: 'Contamination Risk',
      desc: `Batch ${r.batch_number} has been unpacked for ${r.hours_unpacked} hours.`,
      time: new Date(r.produced_at).toLocaleTimeString(),
      status: 'Unresolved'
    }))
  ];

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
            <h3 className="font-semibold text-gray-700">Active Critical</h3>
            <AlertOctagon className="text-red-500 w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-red-600 mt-2">{loading ? '...' : allAlerts.filter(a => a.type === 'critical').length}</p>
        </div>
        <div className="glass-card border-orange-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Warnings</h3>
            <AlertTriangle className="text-orange-500 w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-orange-600 mt-2">{loading ? '...' : allAlerts.filter(a => a.type === 'warning').length}</p>
        </div>
        <div className="glass-card">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Total Risks</h3>
            <Clock className="text-blue-500 w-5 h-5" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">{loading ? '...' : allAlerts.length}</p>
        </div>
      </div>

      <div className="glass-card !p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <h3 className="font-semibold text-gray-900 text-lg">Active Notification Feed</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading live alerts...</div>
          ) : allAlerts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No active alerts. System healthy.</div>
          ) : (
            allAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 flex gap-4 ${alert.status === 'Resolved' ? 'opacity-50' : 'hover:bg-gray-50'}`}>
                <div className="mt-1">
                  {alert.type === 'critical' ? <AlertOctagon className="w-6 h-6 text-red-500" /> :
                   alert.type === 'warning' ? <AlertTriangle className="w-6 h-6 text-orange-500" /> :
                   <Info className="w-6 h-6 text-blue-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 capitalize">{alert.title}</h4>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
