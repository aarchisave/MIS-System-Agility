import React, { useState, useEffect } from 'react';
import { 
  Factory, 
  Activity, 
  Settings as SettingsIcon, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  ThermometerSun,
  Wind,
  Plus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Production() {
  const [analytics, setAnalytics] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchClients();
    fetchAnalytics();
  }, [selectedClient]);

  const fetchClients = async () => {
    try {
      const response = await fetch(`${API_URL}/clients`);
      const result = await response.json();
      if (result.status === 'success') setClients(result.data);
    } catch (e) { console.error(e); }
  };

  const fetchAnalytics = async () => {
    try {
      const url = selectedClient 
        ? `${API_URL}/production/analytics?client=${selectedClient}`
        : `${API_URL}/production/analytics`;
      const response = await fetch(url);
      const result = await response.json();
      if (result.status === 'success') {
        setAnalytics(result.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    batch_number: '',
    premix_batch_id: '',
    fryer_type: 'CONTINUOUS_FRYER',
    temperature_c: '',
    oil_ppm: '',
    client_name: 'Haldiram'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/batches/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert('Batch started successfully!');
        setShowForm(false);
        fetchAnalytics(); 
        setFormData({
          batch_number: '',
          premix_batch_id: '',
          fryer_type: 'CONTINUOUS_FRYER',
          temperature_c: '',
          oil_ppm: '',
          client_name: 'Haldiram'
        });
      }
    } catch (error) {
      console.error('Error creating batch:', error);
      alert('Failed to start batch');
    }
  };

  const totalBatches = analytics.reduce((acc, curr) => acc + parseInt(curr.total_batches), 0);
  const avgYield = (analytics.reduce((acc, curr) => acc + parseFloat(curr.avg_package_weight || 0), 0) / (analytics.length || 1)).toFixed(2);
  const totalOverfilled = analytics.reduce((acc, curr) => acc + parseInt(curr.overfilled_count || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Production Management</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor real-time manufacturing, batches, and efficiency.</p>
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
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary shadow-sm shadow-agility-green/30 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Start New Batch
          </button>
        </div>
      </div>

      {/* New Batch Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Log New Production Batch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Batch Number</label>
                <input 
                  type="text" name="batch_number" value={formData.batch_number} onChange={handleInputChange} required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-agility-green focus:ring-agility-green text-sm"
                  placeholder="e.g. B-2024-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Machine Type</label>
                <select 
                  name="fryer_type" value={formData.fryer_type} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-agility-green focus:ring-agility-green text-sm"
                >
                  <option value="CONTINUOUS_FRYER">Continuous Fryer</option>
                  <option value="BATCH_FRYER">Batch Fryer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client</label>
                <select 
                  name="client_name" value={formData.client_name} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-agility-green focus:ring-agility-green text-sm"
                >
                  {clients.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Temp (°C)</label>
                  <input 
                    type="number" step="0.1" name="temperature_c" value={formData.temperature_c} onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-agility-green focus:ring-agility-green text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Oil PPM</label>
                  <input 
                    type="number" step="0.1" name="oil_ppm" value={formData.oil_ppm} onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-agility-green focus:ring-agility-green text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200">Cancel</button>
                <button type="submit" className="btn-primary">Initialize Batch</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Real-time Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Total Batches</h3>
            <div className="p-2 bg-agility-green/10 text-agility-green rounded-lg"><Factory className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{loading ? '...' : totalBatches}</div>
          <p className="text-sm text-gray-500 mt-1">Active in current cycle</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Avg. Pack Weight</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Activity className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{loading ? '...' : `${avgYield}g`}</div>
          <p className="text-sm text-gray-500 mt-1">Target: 100.5g</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Overfill Alerts</h3>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-red-600">{loading ? '...' : totalOverfilled}</div>
          <p className="text-sm text-red-500 mt-1">{totalOverfilled > 0 ? 'Requires calibration' : 'Optimal precision'}</p>
        </div>
        <div className="glass-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Yield Progress</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><CheckCircle className="w-5 h-5" /></div>
          </div>
          <div className="text-3xl font-bold text-gray-900">88%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-agility-green h-2 rounded-full" style={{ width: '88%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Machine Status Table */}
        <div className="glass-card lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 text-lg">Operational Batch Logs (Live)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="table-header">Machine Type</th>
                  <th className="table-header">Total Batches</th>
                  <th className="table-header">Avg. Temperature</th>
                  <th className="table-header">Avg. Weight</th>
                  <th className="table-header">Overfilled Items</th>
                  <th className="table-header">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {analytics.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors text-sm">
                    <td className="table-cell font-medium text-gray-900">{row.fryer_type.replace('_', ' ')}</td>
                    <td className="table-cell">{row.total_batches}</td>
                    <td className="table-cell text-orange-600 font-medium">{parseFloat(row.avg_temp).toFixed(1)}°C</td>
                    <td className="table-cell font-medium">{parseFloat(row.avg_package_weight || 0).toFixed(2)}g</td>
                    <td className={`table-cell ${parseInt(row.overfilled_count) > 0 ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                      {row.overfilled_count}
                    </td>
                    <td className="table-cell">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">OPTIMAL</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
